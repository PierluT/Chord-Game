class collisionBlock {
    //poi la dovrò settare random
    constructor(i,v) {
        this.width = 200
        this.height = 90
        this.position = {
            x: (generateRandom() * (canvas.width - this.width)),
            y: 0,
        }

        this.velocity= {
            x:0,
            //y:0.6,
            y:v,
        }
        
        //booleano per collisione
        this.markedToCollision = false;
        if(choosenMode=='read'){
            this.chord = ArrayAccordiScelti[i];
        }
        if(choosenMode=='listen'){
            this.chordFund = ArrayAccordiScelti_listen[i].slice(0, 1).trim();
        }
        this.image = new Image();
        this.image.src = scrImages[Math.floor(Math.random()*scrImages.length)];
    }

    draw(){
        c.beginPath()
        //serve?
        c.strokeRect(this.position.x,this.position.y,this.width,this.height)
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
        //inserico la sigla sopra al blocco
        c.font = "40px 'Press Start 2P'";
        c.fillStyle = 'rgba(255,235,205,255)';


        switch (choosenMode) {
            case 'read':
                c.fillText(this.chord,this.position.x-(c.measureText(this.chord).width)/2+(this.width)/2 ,this.position.y);
                break;
            case 'listen':
                c.fillText(this.chordFund,this.position.x-(c.measureText(this.chordFund).width)/2+(this.width)/2 ,this.position.y);
                break;
        }
    }

    update() {
        //se io premo sulla tastiera i blocchi cominciano a scendere
        if(gameStarted == true) {
            //comincia a scendere
            this.position.y += this.velocity.y 
              if(this.position.y > 750 ) {
                //this.markedToDelete = true; 
                chordBlockArray.shift()
            }  
        }
    }

    disappearChord(){
        this.chord = "";
        this.chordFund = "";
    }

   
}

function generateRandom(){
    if (chordBlockArray.length > 1){
        let lastBlock = chordBlockArray[chordBlockArray.length - 1];
        prevRandom = lastBlock.position.x/(canvas.width - lastBlock.width);
    
        newRandom = Math.random();
        while(Math.abs(newRandom - prevRandom) < 0.2){
            newRandom = Math.random();
        }
    }
    else {
        newRandom = Math.random();
    }
    return newRandom;
}