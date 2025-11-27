console.log("audio_core loaded");

let synth = window.speechSynthesis;
function speak(t){
  if(!synth) return;
  const u = new SpeechSynthesisUtterance(t);
  u.rate = 0.95;
  u.pitch = 1.0;
  synth.speak(u);
}

// TAKEOFF
let TO_armed = false;
let TO_state = {};

function armTakeoff(){
  TO_armed = true;
  TO_state = {
    thrust:false,
    eighty:false,
    V1:false,
    VR:false,
    pos:false
  };
  speak("takeoff callouts armed");
}

function updateTakeoff(ias, ra, gearDown, VR, V1, V2, flap){
  if(!TO_armed) return;

  if(!TO_state.thrust && ias > 40){
    TO_state.thrust = true;
    speak("thrust set");
  }

  if(!TO_state.eighty && ias >= 80){
    TO_state.eighty = true;
    speak("eighty knots");
  }

  if(!TO_state.V1 && ias >= V1){
    TO_state.V1 = true;
    speak("V one");
  }

  if(!TO_state.VR && ias >= VR){
    TO_state.VR = true;
    speak("rotate");
  }

  if(!TO_state.pos && !gearDown && ra < 10){
    TO_state.pos = true;
    speak("positive climb");
    setTimeout(()=>speak("gear up"), 600);
    TO_armed = false;
  }
}

// LANDING
let LD_armed = false;
let LD = {};

function armLanding(){
  LD_armed = true;
  LD = {100:0,50:0,40:0,30:0,20:0,10:0};
  speak("landing callouts armed");
}

function updateLanding(ra, ias){
  if(!LD_armed) return;
  if(ra > 150) return;

  if(ra<=100 && !LD[100]){LD[100]=1; speak("one hundred");return;}
  if(ra<=50 && !LD[50]){LD[50]=1; speak("fifty");return;}
  if(ra<=40 && !LD[40]){LD[40]=1; speak("forty");return;}
  if(ra<=30 && !LD[30]){LD[30]=1; speak("thirty");return;}
  if(ra<=20 && !LD[20]){LD[20]=1; speak("twenty");return;}
  if(ra<=10 && !LD[10]){LD[10]=1; speak("retard"); LD_armed=false;return;}
}

window.audio_core = { armTakeoff, updateTakeoff, armLanding, updateLanding };