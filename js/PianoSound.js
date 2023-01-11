
//mp3 piano notes
const sound = new Howl({
    src: ['dist/piano.mp3'],
    /*onload() {
        console.log('Sound file has been loaded. Do something here!');
        soundEngine.init();
        sound.stop();
    },*/
    /*onloaderror(e, msg) {
        console.log('Error', e, msg);
    }*/
});

const soundEngine = {
    init(x) {
        const lengthOfNote = 2400;
        let timeIndex = 0;
        //24 is C1 and 96 is C7
        for (let i = 24; i <= 96; i++){
            sound['_sprite'][i] = [timeIndex, lengthOfNote];
            timeIndex += lengthOfNote;
        }    
        sound.play(x);
    }
}

const soundChord = {
    init(a,b,c) {
        const lengthOfNote = 2400;
        let timeIndex = 0;
        //24 is C1 and 96 is C7
        for (let i = 24; i <= 96; i++){
            sound['_sprite'][i] = [timeIndex, lengthOfNote];
            timeIndex += lengthOfNote;
        }
        sound.play(a);
        sound.play(b);
        sound.play(c)
    }
}



//check to MIDI
if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success, failure);
}

function success(midiAccess) {
    midiAccess.addEventListener('statechange', updateDevices);
    const inputs = midiAccess.inputs;
    inputs.forEach((input) => {
        input.addEventListener('midimessage', handleInput);
    })
}


function updateDevices(event) {
    console.log('Name:', event.port.name, 'Brand:', event.port.manufacturer, 'State:', event.port.state, 'Type:', event.port.type);
}
function failure() {
    console.log('Could not connect MIDI');
}


var lastNoteReceived = 50;
//faccio un ciclo for in ChordLogic per paassaargli l'array di aarray ogni saalto
const arrrrrrr = ArrayAccordiMidiScelti;
var arrayComparaMIDI =[];
var indiceArrrr=0;

//CONTEGGIO VITE e MORTE
var ConteggioVite = 3;
function controlloPerdita() {
    console.log("Vite rimaste: ", ConteggioVite)
    if(ConteggioVite == 0){
        alert("MORTO! Torna alla schermata iniziale")
        document.getElementById("schermataIniziale").style.display= "inline";
        document.getElementById("schermataGioco").style.display = "none";
        primaNota = false;
        ConteggioVite = 3;
    }
}



//data notes
function handleInput(input) {
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    switch (command) {

        case 145: //noteOn
        /*if(velocity>0){
            //note is on
            noteOn(note, velocity);
        } else {
            //note is off
            noteOff(note);
        }*/
        
        //playTatso
        var notaMIDI = note.toString();
        soundEngine.init(notaMIDI);

        lastNoteReceived = note;
        //console.log('noteNumber:', lastNoteReceived);

        var controllo = true;

        for(let j=0; j<arrrrrrr[indiceArrrr].length; j++){ 
            if(arrrrrrr[indiceArrrr][j]==lastNoteReceived || (Math.abs(lastNoteReceived-arrrrrrr[indiceArrrr][j])) % 12 == 0){
                if(!arrayComparaMIDI.includes(lastNoteReceived)
                && !arrayComparaMIDI.includes(lastNoteReceived + 12) && !arrayComparaMIDI.includes(lastNoteReceived - 12)
                && !arrayComparaMIDI.includes(lastNoteReceived + 24) && !arrayComparaMIDI.includes(lastNoteReceived - 24)
                && !arrayComparaMIDI.includes(lastNoteReceived + 36) && !arrayComparaMIDI.includes(lastNoteReceived - 36)
                && !arrayComparaMIDI.includes(lastNoteReceived + 48) && !arrayComparaMIDI.includes(lastNoteReceived - 48)
                && !arrayComparaMIDI.includes(lastNoteReceived + 60) && !arrayComparaMIDI.includes(lastNoteReceived - 60)
                && !arrayComparaMIDI.includes(lastNoteReceived + 72) && !arrayComparaMIDI.includes(lastNoteReceived - 72)
                && !arrayComparaMIDI.includes(lastNoteReceived + 84) && !arrayComparaMIDI.includes(lastNoteReceived - 84)){
                    arrayComparaMIDI.push(arrrrrrr[indiceArrrr][j]);
                    console.log(arrayComparaMIDI);
                }
                controllo = false;
            }
        }

        if(controllo == true){
            ConteggioVite--;
            controlloPerdita();
        }


        //console.log(arrayComparaMIDI);
        if(arrayComparaMIDI.length==arrrrrrr[indiceArrrr].length){

            ///////////////////////////////
            primaNota = true;

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

            console.log(rispostaGiusta)

            ///////////////////////////////
            arrayComparaMIDI = [];
            //passa a elemento successivo
            indiceArrrr++;
        }
         
        break;

        case 129: //noteOff
        //note is off
        /*noteOff(note);*/
        break;
    }

    
}

function noteOn(note, velocity) {
    console.log(note, velocity);
}
function noteOff(note, velocity) {
    console.log(note, velocity);
}











