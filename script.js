const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width= 1024
canvas.height = 576

const gravity = 0.5

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
    update(){
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

const player = new Player({
x: 0,
y :0,
})
const player2 = new Player({
    x: 300,
    y :100,
})

//saranno le nostre giusto e sbagliato
const keys ={
    d:{
        pressed : false
    },
    a:{
        pressed : false
    },
}

function animate () {
    //richiama ogni volta la funzione
    window.requestAnimationFrame(animate)
    c.fillStyle= 'white'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.draw()
    player.update()
    player2.update()
    player2.draw()
    
    //se tengo premuto continua ad andarea destra,altrimenti si stoppa 
    //perchè la velocità viene risettata a 0
    player.velocity.x = 0
    if(keys.d.pressed) {
        player.velocity.x = 4
    }else if (keys.a.pressed) {
        player.velocity.x = -4
    }

}

animate()

//in base a ciò che premo nella tastiera
window.addEventListener('keydown', (event) =>{
    console.log(event)
    
    //Al posto delle lettere ci andranno le risposte esatte o sbagliate
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            break
        case 's':
            keys.a.pressed = true
                break
        case 'w':
                player.velocity.y = -15
                break
    }
})
//per aggiornare lo status delle keys
window.addEventListener('keyup', (event) =>{
    console.log(event)
    
    //Al posto delle lettere ci andranno le risposte esatte o sbagliate
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 's':
            keys.a.pressed = false
                break
        case 'w':
                player.velocity.y = -15
                break
    }
})