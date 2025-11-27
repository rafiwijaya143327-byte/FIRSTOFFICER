console.log("app.js loaded");

// DOM
const iasEl = document.getElementById("ias");
const raEl  = document.getElementById("ra");
const vsEl  = document.getElementById("vs");
const towEl = document.getElementById("tow");
const flapEl= document.getElementById("flap");

let MANUAL_MODE = true;
let prevRA = null;

// ------------------------------------------------------
// MANUAL MODE LOOP
// ------------------------------------------------------
function manualTick(){
  if(!MANUAL_MODE) return;

  const ias = Number(iasEl.value);
  const ra  = Number(raEl.value);
  const vs  = Number(vsEl.value);
  const tow = Number(towEl.value);
  const flap= Number(flapEl.value);

  const vspeeds = perf_takeoff.calcVspeedsAdvanced(tow, flap);

  audio_core.updateTakeoff(
    ias,
    ra,
    true,
    vspeeds.VR,
    vspeeds.V1,
    vspeeds.V2,
    flap
  );

  audio_core.updateLanding(ra, ias, false);

  gpws_modes.gpws_check({
    ias: ias,
    alt_agl: ra,
    vs: vs,
    bank_deg: 0,
    gearDown: true,
    radioAlt: ra,
    deltaRA: 0
  });
}

setInterval(manualTick, 100);

// ------------------------------------------------------
// IF API INTEGRATION
// ------------------------------------------------------

const ifConnectBtn = document.getElementById("if_connect_btn");
const ifDisconnectBtn = document.getElementById("if_disconnect_btn");
const ifStatus = document.getElementById("if_status");
const ifInfo   = document.getElementById("if_info");

function onIFState(s){
  MANUAL_MODE = false;

  ifInfo.innerText =
    `AC: ${s.aircraft} | ALT: ${Math.round(s.altitude)} ft | RA: ${Math.round(s.radioAlt)} ft | IAS: ${Math.round(s.airspeed)} kt`;

  const radioAlt = (s.radioAlt ?? 9999);
  const deltaRA = prevRA == null ? 0 : radioAlt - prevRA;
  prevRA = radioAlt;

  const tow = Number(towEl.value || s.weightKg || 60000);
  const flap = Number(flapEl.value || s.flaps || 1);

  const vspeeds = perf_takeoff.calcVspeedsAdvanced(tow, flap);

  audio_core.updateTakeoff(
    s.airspeed,
    radioAlt,
    s.gearDown,
    vspeeds.VR,
    vspeeds.V1,
    vspeeds.V2,
    flap
  );

  audio_core.updateLanding(radioAlt, s.airspeed, false);

  gpws_modes.gpws_check({
    ias: s.airspeed,
    alt_agl: radioAlt,
    vs: s.vs,
    bank_deg: s.bank,
    gearDown: s.gearDown,
    radioAlt: radioAlt,
    deltaRA: deltaRA
  });

  ifStatus.innerText = "Status: CONNECTED";
}

function onIFConnected(){
  MANUAL_MODE = false;
  ifConnectBtn.style.display = "none";
  ifDisconnectBtn.style.display = "inline-block";
}

ifConnectBtn.onclick = ()=>{
  IFClient.connect({
    onStateChange: onIFState,
    onConnected: onIFConnected,
    onDisconnected: ()=>{
      MANUAL_MODE = true;
      ifStatus.innerText = "Status: DISCONNECTED";
      ifConnectBtn.style.display = "inline-block";
      ifDisconnectBtn.style.display = "none";
    }
  });
};

ifDisconnectBtn.onclick = ()=>{
  IFClient.disconnect();
  MANUAL_MODE = true;
  ifStatus.innerText = "Status: DISCONNECTED";
  ifConnectBtn.style.display = "inline-block";
  ifDisconnectBtn.style.display = "none";
};