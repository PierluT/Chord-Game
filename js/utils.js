//variabili per gestione salto automatico
let xDestinationNextBlock;
let yDestinationNextBlock;
let posizioneAtterraggioX;
let posizioneAtterraggioY;
let v0 = 0.5; // initial velocity (m/s)
const g = 9.81;
//time steps
const deltaPixel = 1;
let t;
let deltaTime;
let xDistance;
let yDistance;
let deltaDistance;
let move_threshold = 10;


