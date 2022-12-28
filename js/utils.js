//variabili per gestione salto automatico
let posizioneAtterraggioX;
let posizioneAtterraggioY;
const V0X_MAX = 1; // initial velocity (m/s)
const V0Y_MAX = 1;
const g = 9.81;
//time steps
const deltaPixel = 1;
let t;
let deltaTime;

let deltaDistance;
let move_threshold = 10;



