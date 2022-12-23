
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
            let posizionePrimoAtterraggioX;
            let posizionePrimoAtterraggioY;

            posizionePrimoAtterraggioY = nextBlock.position.y - nextBlock.height;
            posizionePrimoAtterraggioX = nextBlock.position.x + nextBlock.width / 2 - this.width/2;
            //console.log("collisione")
            //cade al centro del blocco
            this.position.y = posizionePrimoAtterraggioY;
            this.position.x = posizionePrimoAtterraggioX;
            this.checkedCollision(nextBlock);
            //console.log("QUAAAA!!!!!!!!!!")
            
        }
    }

    checkedCollision(nextBlock){
        nextBlock.markedToCollision = true;
        nextBlock.disappearChord();
    }

    //mi restituisce la metà della base inferiore del player
    calculateBasePlayer(){
        const x = this.position.x + player.width/2;
        const y = this.position.y + + player.height;
    return [x, y];
    }

    calculatePositionDuringJump(){
        const x0 = this.calculateBasePlayer.x;
        const y0 = this.calculateBasePlayer.y;

        xDuringJump = x0 + v0*t;
        yDuringJump = y0 + v0*t
    }


    automaticJump(){
        //trova il primo che ha markedtocollision = false (ovvero il prossimo su cui saltare)
        let nextBlockToJump = chordBlockArray.find(block => block.markedToCollision == false);
        xDestinationNextBlock = nextBlockToJump.position.x + nextBlockToJump.width / 2 - this.width/2;
        yDestinationNextBlock = nextBlockToJump.position.y - nextBlockToJump.height;


    }    
    
}
