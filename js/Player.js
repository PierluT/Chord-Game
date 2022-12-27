
class Player {
    //proprietà del giocatore
    constructor(position){
        this.image = new Image();
        //this.image.src = ...mozart o beethoven
        this.position = position
        //velocità di caduta per simulazione gravità
        this.velocity = {
            x: 0,
            y: 0.8,
        }
        this.height = 100;
        this.width = 100;
    }
    
    draw() {
        c.fillStyle= 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }

    //metodo per modificare le coordinate
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.applyGravity()

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
        var count;
        var nextBlock;
        for (let i = 0; i < arrayBlocchi.length; i++) {
            nextBlock = arrayBlocchi[i];

            if ( this.position.x >= nextBlock.position.x && this.position.x + this.width <= nextBlock.position.x +nextBlock.width &&
                this.position.y + this.height >= nextBlock.position.y &&
                this.position.y < nextBlock.position.y){
                count = i;
                break;
            }
        }

        if(count < arrayBlocchi.length) {
            posizioneAtterraggioY = nextBlock.position.y - nextBlock.height;
            posizioneAtterraggioX = nextBlock.position.x + nextBlock.width / 2 - this.width/2;
            //cade al centro del blocco
            this.position.y = posizioneAtterraggioY;
            this.position.x = posizioneAtterraggioX;
            this.checkedCollision(nextBlock);
            
        }
    }

    checkedCollision(nextBlock){
        nextBlock.markedToCollision = true;
        nextBlock.disappearChord();
    }

    automaticJump(){
        console.log("AUTOMATIC JUMP")
        // Convert angle to radians
        theta = theta * Math.PI / 180;
        //trova il primo che ha markedtocollision = false (ovvero il prossimo su cui saltare)
        let nextBlockToJump = chordBlockArray.find(block => block.markedToCollision == false);
        xDestinationNextBlock = nextBlockToJump.position.x + nextBlockToJump.width / 2 - this.width/2;
        yDestinationNextBlock = nextBlockToJump.position.y - nextBlockToJump.height;
       
        
        //equazioni del moto
        this.position.x = posizioneAtterraggioX + v0 * t * Math.cos(theta);
        this.position.y = posizioneAtterraggioY + v0 * t * Math.sin(theta) - 0.5 * g * t * t;
        
        //calcolo le distanze tra partenza e arrivo
        xDistance = xDestinationNextBlock - posizioneAtterraggioX;
        yDistance = yDestinationNextBlock - posizioneAtterraggioY;
        deltaDistance = Math.sqrt( xDistance * xDistance + yDistance * yDistance);
        
        //controllo se è arrivato o meno
        if (deltaDistance < deltaPixel) {
            return;
        }
        // Increment time
        t += dt;
        }  
         
    
}
