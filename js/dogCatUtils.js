function convolve(ts,wv){
  nt = ts.length;
  nw = wv.length;
  cs = new Array(nt);
  R  = Math.floor(nw/2);
  for(var i=0; i < nt; i++){
    x=0
    for(var j=0; j < nw; j++){
      var ii=i+j-R
      var inc=0
      if (ii<0) { inc = 0} else if (ii>=nt) {inc = 0 } else {inc = ts[ii]*wv[j]}
      x+=inc;
      }
      cs[i]=x;
    }
    return cs;
}

function add_ar(a,b){
  n = a.length;
  c = new Array(n);
  for(var i=0; i < n; i++){
    c[i]=a[i]+b[i];
  }
  return c;
}

function wavelet(ts){
nt=ts.length
RATE=50000 //approx samples per second?
dt=1./RATE
lo_f= 500  // low freq common in speech
hi_f=2000  // hi freq common in speach
n_f =10    // how many freq to consider
}

// for 
