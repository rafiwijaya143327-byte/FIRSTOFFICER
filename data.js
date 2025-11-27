// data.js -- hybrid model data (synthetic BADA-like + placeholders)
// You can replace values or import JSON via UI to load official tables.
const AircraftData = {
  "A320neo": {
    name:"A320-NEO family",
    MTOW:79000, MLW:67000, MZFW:64000,
    S:122.6, AR:9.8, e:0.80,
    CD0:{clean:0.017,to:0.035,ld:0.068},
    K:1/(Math.PI*9.8*0.8),
    thrust:{a0:1.0e5}, cf1:1.6e-5, cf2:0.02,
    CLmax:{clean:1.5,'1':2.2,'2':2.4,'3':2.8,full:3.0},
    vrefFactor:1.23, VFE:{'1':215,'2':196,'3':185,'full':177}, VLE:280
  },
  "A330-900Neo": {
    name:"A330-900neo", MTOW:251000, MLW:187000, MZFW:170000,
    S:361.6, AR:9.0, e:0.80,
    CD0:{clean:0.016,to:0.038,ld:0.072}, K:1/(Math.PI*9.0*0.8),
    thrust:{a0:3.0e5}, cf1:1.4e-5, cf2:0.05,
    CLmax:{clean:1.4,'1':2.0,'2':2.25,'3':2.6,full:3.0},
    vrefFactor:1.30, VFE:{'1':215,'2':196,'3':186,'full':180}, VLE:265
  },
  "A350-900": {
    name:"A350-900", MTOW:283000, MLW:207000, MZFW:195000,
    S:443.0, AR:9.5, e:0.84,
    CD0:{clean:0.015,to:0.035,ld:0.065}, K:1/(Math.PI*9.5*0.84),
    thrust:{a0:3.2e5}, cf1:1.35e-5, cf2:0.045,
    CLmax:{clean:1.45,'1':2.05,'2':2.3,'3':2.7,full:3.05},
    vrefFactor:1.30, VFE:{'1':215,'2':196,'3':186,'full':180}, VLE:270
  },
  "A380-800": {
    name:"A380-800", MTOW:575000, MLW:386000, MZFW:361000,
    S:845.0, AR:7.0, e:0.78,
    CD0:{clean:0.018,to:0.045,ld:0.095}, K:1/(Math.PI*7.0*0.78),
    thrust:{a0:6.5e5}, cf1:1.8e-5, cf2:0.09,
    CLmax:{clean:1.3,'1':1.9,'2':2.1,'3':2.5,full:2.9},
    vrefFactor:1.30, VFE:{'1':200,'2':185,'3':180,'full':170}, VLE:280
  }
};

// PerformanceTables can be populated by import (from OPF/FCOM JSON) or OCR-calibration.
// Structure example:
// PerformanceTables["A320neo"] = { cruise: [{FL:350, TAS:447, fuel_kg_hr:3200}, ...], takeoff:{...}, landing:{...} }
const PerformanceTables = {};
