/*
import {Player} from './Player.js'
import { collisionBlock} from './collisionBlock.js'

*/

const canvas = document.getElementById('gameSet');
const c = canvas.getContext('2d');
canvas.width = 1024
canvas.height = 750

const gravity = 0.5

//const colorGreen = 'rgba(75,192,192,1)';
c.font = "italic bolder 50px Arial";
//array provvisorio con elenco sigle accordi
 
var chordSignature = "C";
//larghezza testo

 const textWidth = c.measureText(chordSignature).width;
 const scrImages = ['./img/assets/block1_cut.png','./img/assets/block2_cut.png'];
 const srcPlayerImages = ['./img/Mozart/mozart_spritesheet_completo.png','./img/Beethoven/beethoven_spritesheet_completo.png'];

//blocchi che verranno disegnati dopo 
 var chordBlockArray = [];

let timeToNextBlock = 0;
//variabile che andremo a modificare con il knob della MIDI, ora è impostato a 4 sceondi
let blockInterval= 4000;
let lastBlockTime = 0;
 let primaNota = false
let gameOver = false
 let rispostaGiusta = false

const V0X_MAX = 1.1; // initial velocity (m/s)
const V0Y_MAX = 1;

let vox_MODIFIER;
let deltaTime;

const player = new Player({
    x: 450,
    y :0,
})

const gol = new GOL();

//blocchi di partenza
const block1 = new collisionBlock();
block1.position.x = 100;
block1.position.y = 100;

const block2 = new collisionBlock();
block2.position.x = 700;
block2.position.y = 300

const block3 = new collisionBlock();
block3.position.x = 100;
block3.position.y = 500;

chordBlockArray.push(block3)
chordBlockArray.push(block2)
chordBlockArray.push(block1)


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
    player.update()



    if((primaNota == true) && (timeToNextBlock > blockInterval )){
       chordBlockArray.push(new collisionBlock());
       timeToNextBlock = 0;
    };
    [...chordBlockArray].forEach(block => block.draw());
    [...chordBlockArray].forEach(block => block.update());
    player.chechForVerticalCollision(chordBlockArray);
    //stampa dell'array aggiornato nel quale ho solamente i blocchi visibili nel canvas.
    //console.log(chordBlockArray)
    if(rispostaGiusta){
        player.automaticJump(vox_MODIFIER, V0Y_MAX)
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
//in base a ciò che premo nella tastiera
window.addEventListener('keydown', (event) =>{
    primaNota = true;
    
    //Al posto delle lettere ci andranno le risposte esatte o sbagliate
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            break
        case 's':
            keys.a.pressed = true
                break
        case 'w':
                player.velocity.y = -20
                break
        case 'l':
                let nextBlockPosition = player.computeNextBlockDistance();

                let nextBlockX = nextBlockPosition.xDestinationNextBlock;

                let xDistance = nextBlockX - player.position.x;

                vox_MODIFIER = V0X_MAX*(xDistance/canvas.width);

                rispostaGiusta = true;
                console.log(rispostaGiusta)

                // initialize the game of life
                //gol.init()
                break            
    }
})

//per aggiornare lo status delle keys
window.addEventListener('keyup', (event) =>{
    
    //Al posto delle lettere ci andranno le risposte esatte o sbagliate
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 's':
            keys.a.pressed = false
                break
        case 'w':
                player.velocity.y = -10
                break
    }
})

console.log(srcPlayerImages[1])