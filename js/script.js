const canvas = document.getElementById('gameSet');
const c = canvas.getContext('2d');
// percentage of the window width that will be occupied by the canvas
let width_perc = 0.65;
canvas.width = width_perc*window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5

let checkGravity = true;

//const colorGreen = 'rgba(75,192,192,1)';
//c.font = "italic bolder 50px Arial";

//larghezza testo

const textWidth = c.measureText(ArrayNoteAccordoScelto).width;
const scrImages = ['./img/assets/block1_cut.png','./img/assets/block2_cut.png'];
//const srcLooserPlayers = ['./img/Mozart/MozartPerso.gif', './img/Beethoven/BeethovenPerso.gif'];
//blocchi che verranno disegnati dopo 
var chordBlockArray;

let timeToNextBlock;
//variabile che andremo a modificare con il knob della MIDI, ora è impostato a 4 secondi
let blockInterval= 4000;
let lastBlockTime;
let primaNota;
let gameOver = false
let rispostaGiusta
let playerState;
let playerNamePlusState;
playerNamePlusState = choosenAvatar + playerState;


const V0X_MAX = 1; // initial velocity (m/s)
const V0Y_MAX = 1.2;

let vox_MODIFIER;
let voy_MODIEFIER;
let deltaTime;

const player = new Player({
    x: 450,
    y: 0,
})

//const gol = new GOL();

//index array di accordi
var indexChords;

start()

//saranno le nostre giusto e sbagliato
const keys = {
    d:{
        pressed : false
    },
    a:{
        pressed : false
    }
}
//il timestamp mi serve per controllare il refresh automatico della animate.
function animate (timestamp) {
    c.clearRect(0,0,canvas.width,canvas.height)
    deltaTime = timestamp - lastBlockTime;
    lastBlockTime = timestamp;
    timeToNextBlock += deltaTime; 
    // update the Game of Life matrix for this frame
    //gol.generate();
    //gol.display();
    //giocatore
    loop();
    player.update();

    if((primaNota == true) && (timeToNextBlock > blockInterval )){
        chordBlockArray.push(new collisionBlock(indexChords));
        indexChords++;
        timeToNextBlock = 0;
    };
    [...chordBlockArray].forEach(block => block.draw());
    
    [...chordBlockArray].forEach(block => block.update());
    
    player.chechForVerticalCollision(chordBlockArray);
    //stampa dell'array aggiornato nel quale ho solamente i blocchi visibili nel canvas.
    //console.log(chordBlockArray)
    if(rispostaGiusta){
        player.automaticJump(vox_MODIFIER, voy_MODIEFIER)
    }

    //se tengo premuto continua ad andarea destra,altrimenti si stoppa 
    //perchè la velocità viene risettata a 0
    player.velocity.x = 0
    if(keys.d.pressed) {
        player.velocity.x = 1
    }else if (keys.a.pressed) {
        player.velocity.x = -1
    }
    
    //richiama ogni volta la funzione
   window.requestAnimationFrame(animate)
}

animate(0)



//in base a ciò che premo nella tastiera
let keysPressed = {};

window.addEventListener('keydown', function(event) {
  
    keysPressed[event.key] = true;
    
    //Al posto delle lettere ci andranno le risposte esatte o sbagliate
    switch(event.key){
 
        case 'l': //DA TENERE PER PROVE SENZA MIDI
            primaNota = true;
            let nextBlockPosition = player.computeNextBlockDistance();

            let nextBlockX = nextBlockPosition.xDestinationNextBlock;
            let nextBlockY = nextBlockPosition.yDestinationNextBlock;

            let xDistance = nextBlockX - player.position.x;
            let yDistance = -(nextBlockY  - player.position.y);

            switch (true) {
                case xDistance > 0:
                    playerNamePlusState = "";
                    playerState = "-salto-dx";
                    playerNamePlusState = choosenAvatar + playerState;
                    //player.updateIndexes(playerNamePlusState);                    
                    break;

                case xDistance < 0:
                    playerNamePlusState = "";
                    playerState = "-salto-sx";
                    playerNamePlusState = choosenAvatar + playerState;
                    //player.updateIndexes(playerNamePlusState);
                    break;
            }
                
            
            vox_MODIFIER = V0X_MAX*(xDistance/canvas.width);
            voy_MODIEFIER = V0Y_MAX*(0.8 + 0.2*((yDistance+100)/canvas.height));
            //console.log(yDistance/canvas.height)

            rispostaGiusta = true;
            //attivo questo commento se do 3 possibilità per accordo e non 3 totali
            //window.keyPressCounter = 0;
            // initialize the game of life
            //gol.init();

            break;
         //per implementazione perdita vite senza MIDI   
         case 'g':
            ConteggioVite--;
            errori.push(Tonal.Midi.midiToNoteName(lastNoteReceived, { pitchClass: true }));
            ArrayAccordiErrori.push(ArrayAccordiScelti[indexChords-3]);
            if(ConteggioVite == 2){
                for(let k=0; k<ArrayAccordiMidiScelti[indexChords-3].length; k++) {
                    ArrayMIDIErrori[0].push(Tonal.Midi.midiToNoteName(ArrayAccordiMidiScelti[indexChords-3][k], { pitchClass: true }));
                }
            }
            if(ConteggioVite == 1){
                for(let k=0; k<ArrayAccordiMidiScelti[indexChords-3].length; k++) {
                    ArrayMIDIErrori[1].push(Tonal.Midi.midiToNoteName(ArrayAccordiMidiScelti[indexChords-3][k], { pitchClass: true }));
                }
            }
            if(ConteggioVite == 0){
                for(let k=0; k<ArrayAccordiMidiScelti[indexChords-3].length; k++) {
                    ArrayMIDIErrori[2].push(Tonal.Midi.midiToNoteName(ArrayAccordiMidiScelti[indexChords-3][k], { pitchClass: true }));
                }
            }

            if(ConteggioVite == 0){
                //playerState = "";
                var imageUrl = this.document.querySelector('#imgPlayerPerso');
                imageUrl.src = looserImage;
                primaNota = false;
                document.getElementById("schermataGioco").style.opacity = 0.3;

                //PRIMO ERRORE
                document.getElementById("primoErrore").innerHTML = "1st wrong chord: " + ArrayAccordiErrori[0] + "<br>The notes were: " + ArrayMIDIErrori[0] + "<br>Error: " + errori[0];
                //SECONDO ERRORE
                document.getElementById("secondoErrore").innerHTML = "2nd wrong chord: " + ArrayAccordiErrori[1] + "<br>The notes were: " + ArrayMIDIErrori[1] + "<br>Error: " + errori[1];
                //TERZO ERRORE
                document.getElementById("terzoErrore").innerHTML = "3rd wrong chord: " + ArrayAccordiErrori[2] + "<br>The notes were: " + ArrayMIDIErrori[2] + "<br>Error: " + errori[2];


                $( function() {
                    $( "#dialog" ).dialog({
                      title: "Game Over",
                      modal: true,
                      buttons: {
                        Restart: function() {
                            ConteggioVite = 3;

                            start()
                            console.log()
                            errori = [];
                            ArrayAccordiErrori = [];
                            ArrayMIDIErrori = [[],[],[]];
                            primaNota = false;
                            document.getElementById("schermataGioco").style.opacity = 1;
                          $( this ).dialog( "close" );
                        }
                      }
                    });
                  });
              
            }


    }


})

function start(){
    chordBlockArray = [];
    timeToNextBlock = 0;
    lastBlockTime = 0;
    primaNota = false;
    rispostaGiusta = false;
    indexChords=0;
    playerState = "-frontale-sx";
    
    // initialize the background
    init();

    player.position.y = canvas.height-player.height;
    player.position.x = 450;

    //blocchi di partenza
    const block1 = new collisionBlock(indexChords);
    indexChords++;
    block1.position.x = 100;
    block1.position.y = 500;

    const block2 = new collisionBlock(indexChords);
    indexChords++;
    block2.position.x = 700;
    block2.position.y = 300

    const block3 = new collisionBlock(indexChords);
    indexChords++;
    block3.position.x = 100;
    block3.position.y = 100;

    chordBlockArray.push(block1);
    chordBlockArray.push(block2);
    chordBlockArray.push(block3);
}










