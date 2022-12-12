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

    chechForVerticalCollision(){
        for(let i = 0; i < chordBlockArray.length; i++){
            const nextBlock =this.chordBlockArray[i]

            if(  collision({
                object1: this,
                object2: nextBlock
            })) {
                console.log("tey are colliding")
            }
          
        }
    }
}
