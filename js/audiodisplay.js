function drawBuffer( width, height, context, data ) {
    var step = Math.ceil( data.length / width );
    var amp = height / 2;
    context.fillStyle = "silver";
    context.clearRect(0,0,width,height);
    for(var i=0; i < width; i++){
        var min = 1.0;
        var max = -1.0;
        for (j=0; j<step; j++) {
            var datum = data[(i*step)+j]; 
            if (datum < min)
                min = datum;
            if (datum > max)
                max = datum;
        }
        context.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
    }
}


function plotBuffer( width, height, context, data ) {
    var step = Math.ceil( data.length / width );
    var amp = height / 2;
    var s_data =new Array(data.length);
    s_data[0]=Math.abs(data[0]);
    for(var i=1; i<data.length; i++){
        s_data[i]=0.9*s_data[i-1]+0.1*Math.abs(data[i])
    }
    context.fillStyle = "green";
    context.clearRect(0,0,width,height);
    for(var i=0; i < width; i++){
        var min = 1.0;
        var max = -1.0;
        for (j=0; j<step; j++) {
            // var datum = Math.abs(  data[(i*step)+j]); 
            var datum = Math.abs(s_data[(i*step)+j]); 
            if (datum < min)
                min = datum;
            if (datum > max)
                max = datum;
        }
        context.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
    }
}
