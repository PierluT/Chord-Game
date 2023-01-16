// threshold per la distanza tra il player e il nextblock
const deltaPixel = 38;
// threshold per i movimenti su asse x in automatic jump
const move_threshold = 5;
//const spriteWidth = 600;
//const spriteHeight = 640;
let frameX = 0;
let gameFrame = 0;
// speed of the frames
let staggerFrame = 7;
const srcLooserPlayers = ['./img/Mozart/MozartPerso.gif', './img/Beethoven/BeethovenPerso.gif'];
let looserImage = "";
let defaultSrc= "";


class Player {
    //proprietà del giocatore
    constructor(position){
        this.playerImage = new Image();
        this.playerImage.src ="";
        this.sx = 190;
        this.sy = 130;
        this.spriteWidth = 260;
        this.spriteHeight = 410;
        this.aspectRatio = this.spriteWidth/this.spriteHeight;
        this.position = position
        //velocità di caduta per simulazione gravità
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.height = 80;
        this.width = Math.floor(this.height*this.aspectRatio);
    }
    
    draw() {
        c.fillStyle= 'red';
        //c.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        c.drawImage(this.playerImage,this.sx,this.sy,this.spriteWidth,this.spriteHeight, this.position.x, this.position.y, this.width,this.height)
    }

    selectPlayerAnimation() {

        switch (choosenAvatar) {
            case 'beethoven':
                looserImage = srcLooserPlayers[1];
                playerNamePlusState = choosenAvatar + playerState;
                this.playerImage.src = spriteAnimations.find(animation => animation.name == playerNamePlusState).path;
                this.updateIndexes();

                break;

            case 'mozart':
                looserImage = srcLooserPlayers[0];
                playerNamePlusState = choosenAvatar + playerState;
                this.playerImage.src = spriteAnimations.find(animation => animation.name == playerNamePlusState).path;
                this.updateIndexes();
                break;
        }
       
    }

    updateIndexes() {
        if(!playerNamePlusState.includes("frontale")) {
            const spriteToUse = spriteAnimations.find(animation => animation.name == playerNamePlusState);
         if( gameFrame % staggerFrame == 0){
                if(frameX < spriteToUse.frames) {
                    this.sx = spriteToUse.loc[frameX].x;
                    this.sy = spriteToUse.loc[frameX].y;
                    this.spriteWidth = spriteToUse.loc[frameX].w;
                    this.spriteHeight = spriteToUse.loc[frameX].h;
                    frameX++
                } else frameX = 0;
         }    
          gameFrame++;  
        } 
        else {
            this.sx = 190;
            this.sy = 130;
            this.spriteWidth = 260;
            this.spriteHeight = 410;
        }
    }
    

    //metodo per modificare le coordinate
    update() {
        this.selectPlayerAnimation()
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.applyGravity()
    }
    
    applyGravity(){
        // TO DO: SISTEMARE LA GRAVITA' QUANDO RISPOSTA GIUSTA E' TRUE O FALSE
        if (this.position.y + this.height < canvas.height && checkGravity == true){
            this.velocity.y += gravity;
        }
        else {
            this.velocity.y = 0
        } 
    }

    chechForVerticalCollision(arrayBlocchi) {
        var count;
        var nextBlock;
        for (let i = 0; i < arrayBlocchi.length; i++) {
            nextBlock = arrayBlocchi[i];
            // HO ALZATO IL CONTROLLO DELLA COLLISIONE SULLE Y DI 30 PX
            if ( this.position.x >= nextBlock.position.x && this.position.x + this.width <= nextBlock.position.x +nextBlock.width &&
                this.position.y + this.height >= nextBlock.position.y - 30 &&
                this.position.y < nextBlock.position.y){
                count = i;
                break;
            }
        }

        if(count < arrayBlocchi.length && rispostaGiusta == false) {
            //variabili per gestione salto automatico
            checkGravity = false;
            let posizioneAtterraggioX;
            let posizioneAtterraggioY;
            posizioneAtterraggioY = nextBlock.position.y - nextBlock.height + 10;
            posizioneAtterraggioX = nextBlock.position.x + nextBlock.width / 2 - this.width/2;
            //cade al centro del blocco
            this.position.y = posizioneAtterraggioY;
            this.position.x = posizioneAtterraggioX;
            this.checkedCollision(nextBlock);         
        }
        else {
            checkGravity = true;
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
        if (deltaDistance < deltaPixel && yDistance > 0) {
            rispostaGiusta = false;
            //console.log(rispostaGiusta)
            playerState = "-frontale-sx";
            indiceAr++;
            fund++;
            if(choosenMode=='listen'){
                listenSound(ArrayAccordiMidiScelti_listen[fund]);
            }
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
 
