const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 750

const gravity = 0.5

//const colorGreen = 'rgba(75,192,192,1)';
c.font = "italic bolder 50px Arial";
//array provvisorio con elenco sigle accordi
const chordSignature = "Ab7";
//larghezza testo
const textWidth = c.measureText(chordSignature).width;
const scrImages = ['img/assets/block1.png','img/assets/block2.png'];
//blocchi che verranno disegnati dopo 
const chordBlockArray = [];

let timeToNextBlock = 0;
//variabile che andremo a modificare con il knob della MIDI, ora è impostato a 4 sceondi
let blockInterval= 4000;
let lastBlockTime = 0;
let primaNota = false
let gameOver = false

//funzione di collisione tra èlayer e blocco

const player = new Player({
    x: 450,
    y :0,
})
/*
//blocchi di partenza
const block1 = new collisionBlock();
block1.position.x = 100;
block1.position.y = 100;
chordBlockArray.push(block1)
const block2 = new collisionBlock();
block2.position.x = 700;
block2.position.y = 300
chordBlockArray.push(block2)
const block3 = new collisionBlock();
block3.position.x = 100;
block3.position.y = 500;
chordBlockArray.push(block3)
*/

//saranno le nostre giusto e sbagliato
const keys = {
    d:{
        pressed : false
    },
    a:{
        pressed : false
    },
}
//il timestamp mi serve per controllare il refresh automatico della animate.
function animate (timestamp) {
    c.clearRect(0,0,canvas.width,canvas.height)
    let deltaTime = timestamp - lastBlockTime;
    lastBlockTime = timestamp;
    timeToNextBlock += deltaTime; 
    //giocatore
    player.update()

    if((primaNota == true) && (timeToNextBlock > blockInterval )){
       chordBlockArray.push(new collisionBlock());
       timeToNextBlock = 0;
    };
    [...chordBlockArray].forEach(block => block.draw());
    [...chordBlockArray].forEach(block => block.update());
    //stampa dell'array aggiornato nel quale ho solamente i blocchi visibili nel canvas.
    //console.log(chordBlockArray)

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