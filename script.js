
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 750

const gravity = 0.5
//blocchi che verranno disegnati dopo 
const chordBlockArray = [];

let timeToNextBlock = 0;
//variabile che andremo a modificare con il knob della MIDI, ora è impostato a 4 sceondi
let blockInterval= 4000;
let lastBlockTime = 0;

let primaNota = false
let gameOver = false

class collisionBlock {
    //poi la dovrò settare random
    constructor() {
        this.width = 200
        this.height = 60
        this.position = {
            x: parseInt(( Math.random() * (canvas.width - this.width))),
            y: 0,
        }

        this.velocity= {
            x:0,
            y:1,
        }
        //booleano per eliminare dall'array i blocchi non più visibili
        var markedToDelete = false;
        
    }

    draw(){
        c.beginPath()
        c.fillStyle = 'black' 
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }


    update() {
        this.draw()
        //se io premo sulla tastiera i blocchi cominciano a scendere
        if(primaNota == true){
            //comincia a scendere
            this.position.y += this.velocity.y
        }

        if(this.position.y > canvas.height ){
            this.markedToDelete = true;
        }
    }
         
}



class Player {
    //proprietà del giocatore
    constructor(position){

        this.position = position
        //velocità di caduta per simulazione gravità
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.height = 100
    }
    
    draw() {
        c.fillStyle= 'red'
        c.fillRect(this.position.x,this.position.y,100,this.height)
    }

    //metodo per modificare le coordinate
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y < canvas.height){
            this.velocity.y += gravity
        }
        else {
            this.velocity.y = 0
        } 
    }
}

//non funziona
function collisionControl(Player, collisionBlock) {
    if( Player.position.x > collisionBlock.position.x + collisionBlock.width ||
        Player.position.x + Player.width < collisionBlock.x ||
        Player.y > collisionBlock.y + collisionBlock.height ||
        Player.y + Player.height < collisionBlock.y) {
            console.log('non si stanno toccando')
    } else {
        //no collisione
        console.log(' si stanno toccando')
    }
}

const player = new Player({
    x: 450,
    y :0,
})

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
    //blocchi iniziali
    block1.update()
    block2.update()
    block3.update()

    if((primaNota == true) && (timeToNextBlock > blockInterval )){
       chordBlockArray.push(new collisionBlock());
       timeToNextBlock = 0;
       
    };
    [...chordBlockArray].forEach(block => block.update());
    //filtro l'array rimpiazzandolo solamente con gli elementi il cui marked
    //è true
    //chordBlockArray = chordBlockArray.filter(block => !block.markedToDelete);

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