const canvas = document.getElementById('gameSet');
const c = canvas.getContext('2d');
// percentage of the window width that will be occupied by the canvas
let width_perc = 0.65;
canvas.width = width_perc*window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5

let checkGravity = true;

//const colorGreen = 'rgba(75,192,192,1)';
//c.font = "italic bolder 50px Arial";


const scrImages = ['./img/assets/block1_cut.png','./img/assets/block2_cut.png'];
//const srcLooserPlayers = ['./img/Mozart/MozartPerso.gif', './img/Beethoven/BeethovenPerso.gif'];
//blocchi che verranno disegnati dopo 
var chordBlockArray;

let timeToNextBlock;
//variabile che andremo a modificare con il knob della MIDI, ora è impostato a 4 secondi
let blockInterval= 1000;
let lastBlockTime;
let primaNota;
let gameOver = false
let rispostaGiusta
let playerState;
let playerNamePlusState;
playerNamePlusState = choosenAvatar + playerState;


const V0X_MAX = 1; // initial velocity (m/s)
const V0Y_MAX = 1.2;

let vox_MODIFIER;
let voy_MODIEFIER;
let deltaTime;

const player = new Player({
    x: 450,
    y: 0,
})

//const gol = new GOL();

//index array di accordi
var indexChords;

start()

//saranno le nostre giusto e sbagliato
const keys = {
    d:{
        pressed : false
    },
    a:{
        pressed : false
    }
}
//il timestamp mi serve per controllare il refresh automatico della animate.
function animate (timestamp) {
    c.clearRect(0,0,canvas.width,canvas.height)
    deltaTime = timestamp - lastBlockTime;
    lastBlockTime = timestamp;
    timeToNextBlock += deltaTime; 
    // update the Game of Life matrix for this frame
    //gol.generate();
    //gol.display();
    //giocatore
    loop();
    player.update();

    if((primaNota == true) && (timeToNextBlock > blockInterval )){
        chordBlockArray.push(new collisionBlock(indexChords));
        indexChords++;
        timeToNextBlock = 0;
    };
    [...chordBlockArray].forEach(block => block.draw());
    
    [...chordBlockArray].forEach(block => block.update());
    
    player.chechForVerticalCollision(chordBlockArray);
    //stampa dell'array aggiornato nel quale ho solamente i blocchi visibili nel canvas.
    //console.log(chordBlockArray)
    if(rispostaGiusta){
        player.automaticJump(vox_MODIFIER, voy_MODIEFIER)
    }

    //se tengo premuto continua ad andarea destra,altrimenti si stoppa 
    //perchè la velocità viene risettata a 0
    player.velocity.x = 0
    if(keys.d.pressed) {
        player.velocity.x = 1
    }else if (keys.a.pressed) {
        player.velocity.x = -1
    }
    
    //richiama ogni volta la funzione
   window.requestAnimationFrame(animate)
}

animate(0)


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
            controlloPerdita(lastNoteReceived);
            break;
        case 'q': //su
        if(lev<3){
            lev++;
            console.log("Level: ", lev)
            document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
            start();
        }
        break;
        case 'w': //giu
        if(lev>1){
            lev--;
            console.log("Level: ", lev)
            document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
            start();
        }
        break;
    }
})
///////////////////////////////////////////

function start(){

    


    chordBlockArray = [];
    timeToNextBlock = 0;
    lastBlockTime = 0;
    primaNota = false;
    rispostaGiusta = false;
    indexChords=0;
    playerState = "-frontale-sx";
    
    // initialize the background
    init();

    player.position.y = canvas.height-player.height;
    player.position.x = 450;

    
    if(lev != 0){
        ArrayTotale = CreateChords(lev);
        ArrayAccordiScelti = ArrayTotale[0];
        ArrayAccordiMidiScelti = ArrayTotale[1];
        ArrayAccordiScelti_listen = ArrayTotale[2];
        ArrayAccordiSceltiMidi_listen = ArrayTotale[3];
    }
    

    //blocchi di partenza
    const block1 = new collisionBlock(indexChords);
    indexChords++;
    block1.position.x = 100;
    block1.position.y = 500;

    const block2 = new collisionBlock(indexChords);
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
            //devo passare dentro array MIDI del primo accordo
            listenSound(ArrayAccordiSceltiMidi_listen);
            console.log(ArrayAccordiSceltiMidi_listen)
        break;
    }
    
}










