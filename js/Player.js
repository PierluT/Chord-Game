
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
        this.position.y += this.velocity.y
        this.applyGravity()

    }
    
    applyGravity(){
        // TO DO: SISTEMARE LA GRAVITA' QUANDO RISPOSTA GIUSTA E' TRUE O FALSE
        if (this.position.y + this.height + this.velocity.y < canvas.height && rispostaGiusta == true){
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

            // HO ALZATO IL CONTROLLO DELLA COLLISIONE SULLE Y DI 10 PX
            if ( this.position.x >= nextBlock.position.x && this.position.x + this.width <= nextBlock.position.x +nextBlock.width &&
                this.position.y + this.height >= nextBlock.position.y - 10 &&
                this.position.y < nextBlock.position.y){
                count = i;
                break;
            }
        }

        if(count < arrayBlocchi.length && rispostaGiusta == false) {
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

    automaticJump(vox, voy){ 

        let nextBlockPosition = this.computeNextBlockDistance();

        let nextBlockX = nextBlockPosition.xDestinationNextBlock;
        let nextBlockY = nextBlockPosition.yDestinationNextBlock;
        
        //calcolo le distanze tra partenza e arrivo
        let xDistance = nextBlockX - this.position.x;
        let yDistance = nextBlockY - this.position.y;

        // equazioni del moto
        // deltaTime = 16  
        // TO DO: v0x dovrebbe dipendere dalla distanza tra player e nextblock
        if(Math.abs(xDistance) > move_threshold){
            this.position.x += vox*deltaTime;
        } 
        else if(Math.abs(xDistance) <= move_threshold){
            this.position.x += 0;
        }

        this.position.y -= voy*deltaTime;  
        
        let deltaDistance = Math.sqrt(xDistance*xDistance + yDistance*yDistance);
        
        // CONTROLLA CHE LA DISTANZA DEL PLAYER DAL BLOCCO SIA INFERIORE A deltaPixel
        // e setta rispostaGiusta = false ---> 1 - permette la collisione 2 - ferma la gravità (da sistemare)
        if (deltaDistance < deltaPixel) {
            rispostaGiusta = false;
            console.log(rispostaGiusta)
        }
        
    }
    
    computeNextBlockDistance(){
        //trova il primo che ha markedtocollision = false (ovvero il prossimo su cui saltare)
        let nextBlockToJump = chordBlockArray.find(block => block.markedToCollision == false);
        let xDestinationNextBlock = nextBlockToJump.position.x + nextBlockToJump.width / 2 - this.width/2;
        let yDestinationNextBlock = nextBlockToJump.position.y - nextBlockToJump.height; 
    
        return {xDestinationNextBlock, yDestinationNextBlock};
    }


         
    
}
