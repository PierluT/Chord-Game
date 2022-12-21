class collisionBlock {
    //poi la dovrò settare random
    constructor() {
        this.width = 300
        this.height = 160
        this.position = {
            x: ( Math.random() * (canvas.width - this.width)),
            y: 0,
        }

        this.velocity= {
            x:0,
            y:1,
        }
        //booleano per eliminare dall'array i blocchi non più visibili
        this.markedToDelete = false;
        this.image = new Image();
        this.image.src = scrImages[Math.floor(Math.random()*scrImages.length)];
    }

    draw(){
        c.beginPath()

        //serve?
        //c.strokeRect(this.position.x,this.position.y,this.width,this.height)
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
        //inserico la sigla sopra al blocco 
        c.fillText(chordSignature,this.position.x + 50 + (textWidth /2 ),this.position.y);

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
   
}