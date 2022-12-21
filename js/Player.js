//import { chordBlockArray } from "./script";
class Player {
    //proprietà del giocatore
    constructor(position){
        this.image = new Image();
        //this.image.src = ...mozart o beethoven
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
        this.applyGravity()
        //this.chechForVerticalCollision() 
    }
    
    applyGravity(){
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y < canvas.height){
            this.velocity.y += gravity
        }
        else {
            this.velocity.y = 0
        } 
    }

    chechForVerticalCollision(arrayBlocchi){
        for (let i = 0; i < arrayBlocchi.length; i++) {
            const nextBlock = arrayBlocchi[i];

            if (this.position.y + this.height >= nextBlock.position.y ||
                this.position.y <= nextBlock.position.y + nextBlock.height ||
                this.position.x <= nextBlock.position.x + nextBlock.width ||
                this.position.x + this.width >= nextBlock.position.x){
                console.log("stanno collidendo")

            } else console.log("NO collisione")
        }
    }
}
