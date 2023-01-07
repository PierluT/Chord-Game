const canvas = document.getElementById('gameSet');
const c = canvas.getContext('2d');
canvas.width = 1024
canvas.height = 750

const gravity = 0.5

//const colorGreen = 'rgba(75,192,192,1)';
c.font = "italic bolder 50px Arial";
//array provvisorio con elenco sigle accordi
 

//larghezza testo

const textWidth = c.measureText(ArrayNoteAccordoScelto).width;
const scrImages = ['./img/assets/block1_cut.png','./img/assets/block2_cut.png'];

//blocchi che verranno disegnati dopo 
var chordBlockArray = [];

let timeToNextBlock = 0;
//variabile che andremo a modificare con il knob della MIDI, ora è impostato a 4 secondi
let blockInterval= 4000;
let lastBlockTime = 0;
let primaNota = false
let gameOver = false
let rispostaGiusta = false
let playerState = "-frontale-sx";
let playerNamePlusState = choosenAvatar + playerState;
console.log(playerNamePlusState)

const V0X_MAX = 1.1; // initial velocity (m/s)
const V0Y_MAX = 0.8;

let vox_MODIFIER;
let deltaTime;

const player = new Player({
    x: 450,
    y :0,
})

const gol = new GOL();

//index array di accordi
var indexChords=0;

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


chordBlockArray.push(block1)
chordBlockArray.push(block2)
chordBlockArray.push(block3)


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
    gol.generate();
    gol.display();
    //giocatore
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
        player.automaticJump(vox_MODIFIER, V0Y_MAX)
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
    primaNota = true;
    keysPressed[event.key] = true;
    
    //Al posto delle lettere ci andranno le risposte esatte o sbagliate
    switch(event.key){
        /*case 'd':
            keys.d.pressed = true
            break
        case 's':
            keys.a.pressed = true
                break
        case 'w':
                player.velocity.y = -20
                break*/
        case 'l':
            let nextBlockPosition = player.computeNextBlockDistance();

            let nextBlockX = nextBlockPosition.xDestinationNextBlock;

            let xDistance = nextBlockX - player.position.x;

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

            rispostaGiusta = true;
            window.keyPressCounter = 0;
            console.log("Vite rimaste: ", 3-window.keyPressCounter);

            // initialize the game of life
            gol.init();
            break;

        //VITE RIMASTE se premo un atro key, invece di l
        //se perdo 3 vite muoio e torno a home
        default:
            if (!window.keyPressCounter) {
                window.keyPressCounter = 0;
            }
            console.log("Vite rimaste: ", 2-window.keyPressCounter);
            window.keyPressCounter++;
            if (window.keyPressCounter >= 3) {
                alert("MORTO! Torna alla schermata iniziale")
                console.log("fine vite");
                document.getElementById("schermataIniziale").style.display= "inline";
                document.getElementById("schermataGioco").style.display = "none";

                primaNota = false;
                window.keyPressCounter = 0;
            }

            /*//PROVA CON BOTTONE
            if (window.keyPressCounter >= 3) {

                //bottone torna a schermata iniziale
                let button = document.createElement("button");
                button.textContent = "Torna alla schermata iniziale";
                button.addEventListener("click", function() {
                    document.getElementById("schermataIniziale").style.display= "inline";
                    document.getElementById("schermataGioco").style.display = "none";
                });
                let message = "MORTO! Torna alla schermata iniziale";
                window.alert(message + " " + button.outerHTML);
                console.log("fine vite");
                document.getElementById("schermataIniziale").style.display= "inline";
                document.getElementById("schermataGioco").style.display = "none";
                
                primaNota = false;
                window.keyPressCounter = 0;
            }*/
            break;

    }


    /*if (keysPressed["q"] && keysPressed["e"] && keysPressed["t"]) {
        console.log("ciao");
        soundEngine.init('24');
        soundEngine.init('28');
        keysPressed[event.key] = false;
    }*/
    


})











/*//per aggiornare lo status delle keys
window.addEventListener('keyup', (event) =>{
    
    //Al posto delle lettere ci andranno le risposte esatte o sbagliate
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 's':
            keys.a.pressed = false
                break
        case 'w':
                player.velocity.y = -10
                break
    }
})
var a4 = teoria.note('a4');       // Scientific notation
var g5 = teoria.note("g''"); 
console.log(teoria.interval(a4, g5));

console.log(Tonal.Key.minorKey("Ab"));*/

