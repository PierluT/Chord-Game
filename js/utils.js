//variabili per gestione salto automatico
let xDestinationNextBlock;
let yDestinationNextBlock;
let posizioneAtterraggioX;
let posizioneAtterraggioY;
let v0 = 0.5; // initial velocity (m/s)
const g = 9.81;
//time steps
const deltaPixel = 1;
let t;
let deltaTime;
let xDistance;
let yDistance;
let deltaDistance;

function findNextBlock(){
    //trova il primo che ha markedtocollision = false (ovvero il prossimo su cui saltare)
    let nextBlockToJump = chordBlockArray.find(block => block.markedToCollision == false);
    xDestinationNextBlock = nextBlockToJump.position.x + nextBlockToJump.width / 2 - this.width/2;
    yDestinationNextBlock = nextBlockToJump.position.y - nextBlockToJump.height; 

    return [xDestinationNextBlock, yDestinationNextBlock]
}



