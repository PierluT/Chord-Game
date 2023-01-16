const canvas = document.getElementById('gameSet');
const c = canvas.getContext('2d');
// percentage of the window width that will be occupied by the canvas
let width_perc = 0.65;
canvas.width = width_perc*window.innerWidth;
canvas.height = window.innerHeight;

let gameStarted = false;

const gravity = 0.5

let startBlock;

let checkGravity = true;

//const colorGreen = 'rgba(75,192,192,1)';
//c.font = "italic bolder 50px Arial";

// initialize the background
init();

const scrImages = ['./img/assets/block1_cut.png','./img/assets/block2_cut.png'];
//const srcLooserPlayers = ['./img/Mozart/MozartPerso.gif', './img/Beethoven/BeethovenPerso.gif'];
//blocchi che verranno disegnati dopo 
var chordBlockArray;

let timeToNextBlock;
//variabile che andremo a modificare con il knob della MIDI, ora è impostato a 4 secondi
let blockInterval;
let lastBlockTime;
let gameOver = false
let rispostaGiusta
let playerState;
let playerNamePlusState;
playerNamePlusState = choosenAvatar + playerState;

const V0X_MAX = 1.1;
const V0Y_MAX = 1.4;

let vox_MODIFIER;
let voy_MODIEFIER;
let deltaTime;

const player = new Player({
    x: canvas.width/2,
    y: 0,
})

//index array di accordi
var indexChords;

//il timestamp mi serve per controllare il refresh automatico della animate.
function animate (timestamp) {
    c.clearRect(0,0,canvas.width,canvas.height)
    deltaTime = timestamp - lastBlockTime;
    lastBlockTime = timestamp;
    timeToNextBlock += deltaTime; 

    //backGroundloop();
    player.update();

    if (gameStarted == true) {
        if(timeToNextBlock > blockInterval) {
            chordBlockArray.push(new collisionBlock(indexChords, v));
            indexChords++;
            timeToNextBlock = 0;
        }

        if (player.position.y + player.height >= canvas.height) {
            ConteggioVite = 0;
            controlloPerdita(lastNoteReceived, arChord, arMIDI, indiceAr);
        }
    
        [...chordBlockArray].forEach(block => block.update());
    }

    [...chordBlockArray].forEach(block => block.draw());
    
    player.chechForVerticalCollision(chordBlockArray);

    //stampa dell'array aggiornato nel quale ho solamente i blocchi visibili nel canvas.
    //console.log(chordBlockArray)
    if(rispostaGiusta){
        player.automaticJump(vox_MODIFIER, voy_MODIEFIER);
    }

    //richiama ogni volta la funzione
   window.requestAnimationFrame(animate)
}


///////////////////////////////////////////
//in base a ciò che premo nella tastiera (SENZA PIANO KEYBOARD)
let keysPressed = {};

window.addEventListener('keydown', function(event) {
  
    keysPressed[event.key] = true;
    
    //DA TENERE PER PROVE SENZA MIDI
    switch(event.key){
        case 'l': //RISPOSTA GIUSTA
            controlloGiusto()
            break; 
        case 'g': //RISPOSTA SBAGLIATA
            ConteggioVite--;
            controlloPerdita(lastNoteReceived, arChord, arMIDI, indiceAr);
            break;
        case 'q': //su
        if(lev<3){
            lev++;
            console.log("Level: ", lev)
            document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
        }
        break;
        case 'w': //giu
        if(lev>1){
            lev--;
            console.log("Level: ", lev)
            document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
        }
        break;
    }
})
///////////////////////////////////////////

function start(){
    ConteggioVite=3;
    indiceAr=0;
    chordBlockArray = [];
    timeToNextBlock = 0;
    lastBlockTime = 0;
    //gameStarted = true;
    rispostaGiusta = false;
    indexChords=0;
    playerState = "-frontale-sx";
    
    if(lev != 0){
        //READ
        ArrayTotale = CreateChords(lev);
        ArrayAccordiScelti = ArrayTotale[0];
        ArrayAccordiMidiScelti = ArrayTotale[1];
        //LISTEN
        ArrayAccordiScelti_listen = ArrayTotale[2];
        ArrayAccordiMidiScelti_listen = ArrayTotale[3];
    }
    
    // start block
    startBlock = new collisionBlock(0, v);
    startBlock.position.x = (canvas.width - startBlock.width)/2;
    startBlock.position.y = canvas.height - startBlock.height*2;
    startBlock.velocity.y = 10;
    chordBlockArray.push(startBlock)

    player.position.y = startBlock.position.y - 50;
    player.position.x = (canvas.width - player.width)/2;

    //blocchi di partenza
    const block1 = new collisionBlock(indexChords, v);
    indexChords++;
    block1.position.x = 100;
    block1.position.y = 500;

    const block2 = new collisionBlock(indexChords, v);
    indexChords++;
    block2.position.x = 700;
    block2.position.y = 300

    const block3 = new collisionBlock(indexChords);
    indexChords++;
    block3.position.x = 100;
    block3.position.y = 100;

    chordBlockArray.push(block1);
    chordBlockArray.push(block2);
    chordBlockArray.push(block3);

    switch (choosenMode) {

        case 'listen':
            blockInterval = 7000;
            arMIDI = ArrayAccordiMidiScelti_listen;
            arChord = ArrayAccordiScelti_listen;
            //devo passare dentro array MIDI del primo accordo
            fund=0
            listenSound(ArrayAccordiMidiScelti_listen[fund]);
            break;

        case 'read':
            blockInterval = 5000;
            arMIDI = ArrayAccordiMidiScelti;
            arChord = ArrayAccordiScelti;
            break;
    }

    
    document.getElementById("level").innerHTML = "LEVEL: " + lev;
    document.getElementById("mode").innerHTML = "MODE: " + choosenMode; 
    if(choosenMode=='read') {
        document.getElementById("score").innerHTML = "SCORE: " + indiceAr +"/" + ArrayAccordiScelti.length;
    }
    if(choosenMode=='listen'){
        document.getElementById("score").innerHTML = "SCORE: " + indiceAr +"/" + ArrayAccordiScelti_listen.length;
    } 
    
}










