class collisionBlock {
    //poi la dovrò settare random
    constructor(i) {
        this.width = 200
        this.height = 90
        this.position = {
            x: ( Math.random() * (canvas.width - this.width)),
            y: 0,
        }

        this.velocity= {
            x:0,
            y:1,
        }
        
        //booleano per collisione
        this.markedToCollision = false;
        this.chord = ArrayAccordiScelti[i];
        this.image = new Image();
        this.image.src = scrImages[Math.floor(Math.random()*scrImages.length)];
    }

    draw(){
        c.beginPath()
        //serve?
        c.strokeRect(this.position.x,this.position.y,this.width,this.height)
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
        //inserico la sigla sopra al blocco
        c.fillText(this.chord,this.position.x ,this.position.y);
    }

    update() {
        //se io premo sulla tastiera i blocchi cominciano a scendere
        if(primaNota == true) {
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
    }

   
}
