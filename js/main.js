/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var rafID = null;
var analyserContext = null;
var spectrogramContext = null;
var scrollplotContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;
var specIndex = 0;
var maxRecord = 0;
var storeSpec=[];
var storeTot=[];
var nWindow=200;

/* TODO:

- offer mono option
- "Monitor input" switch
*/

function saveAudio() {
    // audioRecorder.exportWAV( doneEncoding );
    // could get mono instead by saying
    audioRecorder.exportMonoWAV( doneEncoding );
}

function gotBuffers( buffers ) {
    var canvas = document.getElementById( "wavedisplay" );
    drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );

    var canvas = document.getElementById( "plotdisplay" );
    plotBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );
   
    // the ONLY time gotBuffers is called is right after a new recording is completed - 
    // so here's where we should set up the download.
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
    Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
    recIndex++;
}

function toggleRecording( e ) {
    if (e.classList.contains("recording")) {
        // stop recording
        audioRecorder.stop();
        e.classList.remove("recording");
        audioRecorder.getBuffers( gotBuffers );
    } else {
        // start recording
        if (!audioRecorder)
            return;
        e.classList.add("recording");
        audioRecorder.clear();
        audioRecorder.record();
    }
}

function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}

function updateAnalysers(time) {
    if (!analyserContext) {
        var canvas = document.getElementById("analyser");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        analyserContext = canvas.getContext('2d');
    }

    // analyzer draw code here
    {
        var SPACING = 3;
        var BAR_WIDTH = 1;
        var numBars = Math.round(canvasWidth / SPACING);
        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

        analyserNode.getByteFrequencyData(freqByteData); 

        analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
        analyserContext.fillStyle = '#F6D565';
        analyserContext.lineCap = 'round';
        var multiplier = analyserNode.frequencyBinCount / numBars;

        // Draw rectangle for each frequency bin.
        for (var i = 0; i < numBars; ++i) {
            var magnitude = 0;
            var offset = Math.floor( i * multiplier );
            // gotta sum/average the block, or we miss narrow-bandwidth spikes
            for (var j = 0; j< multiplier; j++)
                magnitude += freqByteData[offset + j];
            magnitude = magnitude / multiplier;
            var magnitude2 = freqByteData[i * multiplier];
            analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
            analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
        }
    }
    
    rafID = window.requestAnimationFrame( updateAnalysers );
}

// not sure why time defalut arg? appears?
function drawTotal(time){
  if (!scrollplotContext) { // init relevant context
      var scrollcanvas = document.getElementById("scrollplot");
      canvasWidth = scrollcanvas.width;
      canvasHeight = scrollcanvas.height;
      scrollplotContext = scrollcanvas.getContext('2d');
  }
  // is this the right way to clear a "lineTo" or a "stroke"?
  scrollplotContext.clearRect(0,0,canvasWidth,canvasHeight);

  scrollplotContext.beginPath();
  scrollplotContext.moveTo(0,0);
  for (var i=0; i<nWindow; i+=1) {
     var ii=(i+specIndex)%nWindow;
     var x=Math.floor(i*canvasWidth/nWindow)
     if (ii<=maxRecord){
        var y=Math.floor(storeTot[ii]/500);
        y=canvasHeight-y;
        scrollplotContext.lineTo(x,y); 
     } else {
        scrollplotContext.lineTo(x,canvasHeight); 
     }
  }
  scrollplotContext.strokeStyle = "white";
  scrollplotContext.lineWidth=2;
  scrollplotContext.stroke();
  rafID = window.requestAnimationFrame( drawTotal );
}

function updateSpectrogram(time) {
    if (!spectrogramContext) {
        var speccanvas = document.getElementById("spectrogram");
        canvasWidth = speccanvas.width;
        canvasHeight = speccanvas.height;
        spectrogramContext = speccanvas.getContext('2d');
    }

    // spectrogram code here
    {
        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

        analyserNode.getByteFrequencyData(freqByteData); 

        maxRecord=Math.max(specIndex,maxRecord)
        storeSpec[specIndex]=freqByteData;
        storeTot[ specIndex]=freqByteData.reduce((a,b)=>a+b);
        // why doesn't array have "sum" method ... it can stor all kinds of stuff?
        specIndex+=1;
        
        specIndex=specIndex%nWindow;

        { // this used to be conditional on length of record
            var nRow=freqByteData.length;
            var pen=0;
            var c1 = document.createElement("canvas");
            c1.width = nWindow;
            c1.height = nRow;
            var ctx1 = c1.getContext("2d");
            
            var imgData = spectrogramContext.createImageData(nWindow, nRow);
            for (var j=0; j<nRow; j+=1) {
               for (var i=0; i<nWindow; i+=1) {
                  var ii=(i+specIndex)%nWindow;
                  if (ii<=maxRecord){
                    imgData.data[pen  ]   = storeSpec[ii][j]; 
                    imgData.data[pen+1]   = storeSpec[ii][j]; 
                    imgData.data[pen+2]   = storeSpec[ii][j]; 
                    imgData.data[pen+3]   = 255; 
                    pen+=4;
                  } else {
                    imgData.data[pen  ]   = 200; 
                    imgData.data[pen+1]   = 0; 
                    imgData.data[pen+2]   = 100; 
                    imgData.data[pen+3]   = 255; 
                    pen+=4;
                  }
                }
            }
            ctx1.putImageData(imgData, 0, 0);
            spectrogramContext.drawImage(c1, 0, 0,canvasWidth-1,canvasHeight-1);
        }
    }
    rafID = window.requestAnimationFrame( updateSpectrogram );
}

function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

//    audioInput = convertToMono( input );

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );

    audioRecorder = new Recorder( inputPoint );

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );
    updateAnalysers();
    updateSpectrogram();
    drawTotal();
}

function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia =  navigator.mozGetUserMedia;
             // the following line is recomended by my browser but it does not work and I don't understand why
            //navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

   navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

window.addEventListener('load', initAudio );
