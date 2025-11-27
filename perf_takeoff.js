console.log("perf_takeoff loaded");

const A320 = {
  "1": {
    55000:{V1:128,VR:131,V2:139},
    65000:{V1:136,VR:139,V2:147},
    70000:{V1:140,VR:144,V2:151}
  },
  "2": {
    55000:{V1:122,VR:126,V2:134},
    65000:{V1:129,VR:133,V2:141},
    70000:{V1:133,VR:137,V2:145}
  },
  "3": {
    55000:{V1:117,VR:120,V2:129},
    65000:{V1:124,VR:128,V2:137},
    70000:{V1:128,VR:132,V2:141}
  }
};

function lerp(a,b,t){return a+(b-a)*t;}

function interp(tbl,w){
  let k=Object.keys(tbl).map(Number).sort((a,b)=>a-b);
  let low=k[0], high=k[k.length-1];
  for(let i=0;i<k.length;i++){
    if(w<=k[i]){high=k[i];break;}
    low=k[i];
  }
  if(low==high) return tbl[low];

  const t=(w-low)/(high-low);
  return {
    V1: lerp(tbl[low].V1,tbl[high].V1,t),
    VR: lerp(tbl[low].VR,tbl[high].VR,t),
    V2: lerp(tbl[low].V2,tbl[high].V2,t)
  };
}

function calcA320(w,f){
  if(!A320[f]) f="1";
  return interp(A320[f], w);
}

function calcVspeedsAdvanced(w,f){
  return calcA320(w,f);
}

window.perf_takeoff = { calcVspeedsAdvanced };