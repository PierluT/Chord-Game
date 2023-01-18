const canvas = document.getElementById('gameSet');
const c = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 700;

let preventDuplicate = true;

let gameStarted = false;

const gravity = 0.5

let startBlock;

let checkGravity = true;

// helps to draw the text 'LEVEL UP' on the canvas
let levelUp_bool = false;

// initialize the background
init();

// START THE MUSIC
intro_music.play();



const scrImagesLev1 = ['./img/assets/Ghiaccio1.png','./img/assets/Ghiaccio2.png'];
const scrImagesLev2 = ['./img/assets/Caldo1.png','./img/assets/Caldo2.png'];
const scrImagesLev3 = ['./img/assets/Terra1.png','./img/assets/Terra2.png'];


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

const V0X_MAX = 1.05;
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

var lastBlockPositionX;
var lastBlockPositionY;

//il timestamp mi serve per controllare il refresh automatico della animate.
function animate (timestamp) {
    c.clearRect(0,0,canvas.width,canvas.height)
    deltaTime = timestamp - lastBlockTime;
    lastBlockTime = timestamp; 
    starControl();

    if (levelUp_bool) {
        levelUp();
    }

    //backGroundloop();
    player.update();
    switch (choosenMode) {
        case 'listen':
            // distance btw 2 consecutive blocks is 262 pixels in the y axis
            // blockInterval = 7000;
            blockInterval = 262 * 16 / (v);
            break;
        case 'read':
            // distance btw 2 consecutive blocks is 187 pixels in the y axis
            // blockInterval = 5000;
            blockInterval = 187 * 16 / (v);
            break;
    }

    if (gameStarted == true) {

        timeToNextBlock += deltaTime;
        //if (indexChords < arChord.length) {
            if(timeToNextBlock > blockInterval) {
                chordBlockArray.push(new collisionBlock(indexChords));
                indexChords++;
                timeToNextBlock = 0;     
            }
       /* } else if (indiceAr == arChord.length){
            if (lev==3){
                console.log("VITTORIA")
            }
        }*/


        if (player.position.y + player.height >= canvas.height && gameOver == false) {
            gameOver = true;
            setTimeout(() => {
                lost.play();
                ConteggioVite = 0;
                controlloPerdita(lastNoteReceived, arChord, arMIDI, indiceAr);}, 1000);
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
            if(preventDuplicate){
                controlloGiusto()
                preventDuplicate = false;
            }
            break; 
        case 'g': //RISPOSTA SBAGLIATA
            ConteggioVite--;
            controlloPerdita(lastNoteReceived, arChord, arMIDI, indiceAr);
            break;
        case 'q': //su
        if(lev<=3){
            lev++;
            console.log("Level: ", lev)
        }
        break;
        case 'w': //giu
        if(lev>=1){
            lev--;
            console.log("Level: ", lev)
        }
        break;
    }
})
///////////////////////////////////////////

var levInizialeScelto = 0;

function start(){

    preventDuplicate = true;

    v=1;
    ConteggioVite=3;
    indiceAr=0;
    chordBlockArray = [];
    timeToNextBlock = 0;
    lastBlockTime = 0;
    rispostaGiusta = false;
    gameOver = false;
    indexChords=0;
    playerState = "-frontale-sx";

    // GAME STARTED SOUND
    game_started_sound.play();

    // initialize the score in start
    score = 0;
    moltiplicator = 1;
    streak = 0;
    lastCorrect = true;

    //inizializzo tutto
    ArrayAccordiScelti = [];
    ArrayAccordiScelti_listen = [];
    ArrayAccordiMIDIScelti = [];
    ArrayAccordiMIDIScelti_listen = [];
    arChord=[];
    arMIDI=[];
    
    if(lev==1){
        ArrayTot1 = CreateChords(lev);
        lev++;
        ArrayTot2 = CreateChords(lev);
        lev++;
        ArrayTot3 = CreateChords(lev);
        //LISTEN
        ArrayAccordiScelti_listen = ArrayTot1[2].concat(ArrayTot2[2], ArrayTot3[2]);
        ArrayAccordiMidiScelti_listen = ArrayTot1[3].concat(ArrayTot2[3], ArrayTot3[3]);
    } else if(lev==2){
        ArrayTot2 = CreateChords(lev);
        lev++;
        ArrayTot3 = CreateChords(lev);
        //LISTEN
        ArrayAccordiScelti_listen = ArrayTot2[2].concat(ArrayTot3[2]);
        ArrayAccordiMidiScelti_listen = ArrayTot2[3].concat(ArrayTot3[3]);
    } else if(lev==3){
        ArrayTot3 = CreateChords(lev);
        //LISTEN
        ArrayAccordiScelti_listen = ArrayTot3[2];
        ArrayAccordiMidiScelti_listen = ArrayTot3[3];
    }

    console.log("ARRAY ACCORDI: ", ArrayAccordiScelti)
    console.log("ARRAY ACCORDI MIDI", ArrayAccordiMidiScelti)
    console.log("ARRAY ACCORDI LISTEN: ", ArrayAccordiScelti_listen)
    console.log("ARRAY ACCORDI MIDI LISTEN", ArrayAccordiMidiScelti_listen)
    
    // start block
    startBlock = new collisionBlock(0);
    startBlock.position.x = (canvas.width - startBlock.width)/2;
    startBlock.position.y = canvas.height - startBlock.height*1.3;
    startBlock.velocity.y = 10;
    chordBlockArray.push(startBlock)

    player.position.y = startBlock.position.y - 50;
    player.position.x = (canvas.width - player.width)/2;

    //blocchi di partenza
    const block1 = new collisionBlock(indexChords);
    indexChords++;
    block1.position.x = 100;
    block1.position.y = 450;

    const block2 = new collisionBlock(indexChords);
    indexChords++;
    block2.position.x = 700;
    block2.position.y = 250;

    const block3 = new collisionBlock(indexChords);
    indexChords++;
    block3.position.x = 100;
    block3.position.y = 50;

    chordBlockArray.push(block1);
    chordBlockArray.push(block2);
    chordBlockArray.push(block3);

    switch (choosenMode) {

        case 'listen':

            // distance btw 2 consecutive blocks is 262 pixels in the y axis
            // blockInterval = 7000;
            blockInterval = 262 * 16 / (v + 0.0001);

            arMIDI = ArrayAccordiMidiScelti_listen;
            arChord = ArrayAccordiScelti_listen;

            fund=0
            setTimeout(() => {listenSound(arMIDI[fund])}, 2000);
            break;

        case 'read':

            // distance btw 2 consecutive blocks is 187 pixels in the y axis
            // blockInterval = 5000;
            blockInterval = 187 * 16 / (v + 0.0001);

            arMIDI = ArrayAccordiMidiScelti;
            arChord = ArrayAccordiScelti;
            break;
    }

    

    
    

     
    if(choosenMode=='read') {
        document.getElementById("mode").innerHTML = "READ MODE";
        document.getElementById("score").innerHTML = "SCORE: " + score +"/" + ArrayAccordiScelti.length;
    }
    if(choosenMode=='listen'){
        document.getElementById("mode").innerHTML = "LISTEN MODE";
        document.getElementById("score").innerHTML = "SCORE: " + score +"/" + ArrayAccordiScelti_listen.length;
    } 
    document.getElementById("level").innerHTML = "LEVEL: " + levInizialeScelto;
    
}
function starControl(){

    switch(ConteggioVite) {
        case 0:
            document.getElementById("star1").style.display = "none";
            document.getElementById("star3").style.display = "none";
            document.getElementById("star2").style.display = "none";
            break;

        case 1:
            document.getElementById("star3").style.display = "none";
            document.getElementById("star2").style.display = "none";
            break;

        case 2:
            document.getElementById("star3").style.display = "none"; 
            break;

        case 3:
            document.getElementById("star1").style.display = "inline";
            document.getElementById("star3").style.display = "inline";
            document.getElementById("star2").style.display = "inline";

        
    }
}

// -------- SCORE UTILS --------

// score is initialized to 0 in start()
let score;
let moltiplicator;
let amount = 50;
let streak;
let lastCorrect;
let text_levelUp = 'LEVEL UP';
let alpha_level = 1.0;

function plusScore(){
    score += amount * levInizialeScelto * moltiplicator;
}

function checkStreak(){
    if (lastCorrect){
        streak++;
    }
    else {
        streak = 0;
    }
}

function checkMoltiplicator(){
    // MAX moltiplicator is 5
    if(streak % 5 == 0 && streak > 0 && moltiplicator < 5) { 
        moltiplicator++;
    }
    else if(streak == 0 && moltiplicator <= 5){
        moltiplicator = 1;
    }
}

function scorePipeline() {
    checkStreak();
    checkMoltiplicator();
    plusScore();
    lastCorrect = true;
    alpha = 1.0;
}

function levelUp() {
    c.fillStyle = "rgba(255, 255, 0, " + alpha_level + ")";
    c.font = ""+ 60 - alpha_level*20 + "px 'Press Start 2P'";
    c.fillText(text_levelUp, -c.measureText(text_levelUp).width/2 + canvas.width/2, 200 + alpha_level*100);
    alpha_level = alpha_level - 0.008;
    if(alpha_level<0) {
        levelUp_bool = false;
        alpha_level = 1.0;
    }
}
