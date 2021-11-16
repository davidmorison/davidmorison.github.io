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


// RATE
// dt=1./RATE
// lo_f=
// hi_f=

// for 
