console.log("gpws_modes loaded");

let GPWS_armed = false;
let last = 0;

function armGPWS(){
  GPWS_armed = true;
  last = 0;
  speak("GPWS armed");
}

function sayOnce(msg){
  const now = performance.now();
  if(now - last < 3500) return;
  last = now;
  speak(msg);
}

function gpws_check(s){
  if(!GPWS_armed) return;

  const ias = s.ias||0;
  const ra  = s.radioAlt||9999;
  const vs  = s.vs||0;
  const bank= Math.abs(s.bank_deg||0);

  if(vs < -1500 && ra < 900) return sayOnce("sink rate");
  if(vs < -2500 && ra < 1000) return sayOnce("pull up");

  if(ra < 200 && vs < 0) return sayOnce("dont sink");

  if(ra < 100 && ias < 130) return sayOnce("too low terrain");

  if(bank > 35) return sayOnce("bank angle");
}

window.gpws_modes = { armGPWS, gpws_check };