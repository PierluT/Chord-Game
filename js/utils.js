
let choosenAvatar = "";
let choosenMode= "";
let composerToAnimate = "";
//variabili per gestione salto automatico
let posizioneAtterraggioX;
let posizioneAtterraggioY;
const V0X_MAX = 1.1; // initial velocity (m/s)
const V0Y_MAX = 1;
const g = 9.81;

// threshold per la distanza tra il player e il nextblock
const deltaPixel = 38;

let deltaTime;

// threshold per i movimenti su asse x in automatic jump
const move_threshold = 5;



