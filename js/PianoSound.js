
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
    //console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateDevices);
    const inputs = midiAccess.inputs;
    //console.log(inputs);
    inputs.forEach((input) => {
        //console.log(input);
        input.addEventListener('midimessage', handleInput);
        
    })
}


function updateDevices(event) {
    console.log('Name:', event.port.name, 'Brand:', event.port.manufacturer, 'State:', event.port.state, 'Type:', event.port.type);
}
function failure() {
    console.log('Could not connect MIDI');
}


var lastNoteReceived = 0;
//faccio un ciclo for in ChordLogic per paassaargli l'array di aarray ogni saalto
const arrrrrrr = ArrayAccordiMidiScelti;
var arrayComparaMIDI =[];
var indiceArrrr=0;

//CONTEGGIO VITE e MORTE
var ConteggioVite = 3;
var errori = [];
var ArrayAccordiErrori = [];
var ArrayMIDIErrori = [[],[],[]];

function controlloPerdita() {

    ConteggioVite--;
    errori.push(Tonal.Midi.midiToNoteName(lastNoteReceived, { pitchClass: true }));
    ArrayAccordiErrori.push(ArrayAccordiScelti[indexChords-3]);
    if(ConteggioVite == 2){
        for(let k=0; k<ArrayAccordiMidiScelti[indexChords-3].length; k++) {
            ArrayMIDIErrori[0].push(Tonal.Midi.midiToNoteName(ArrayAccordiMidiScelti[indexChords-3][k], { pitchClass: true, sharps: true }));
        }
    }
    if(ConteggioVite == 1){
        for(let k=0; k<ArrayAccordiMidiScelti[indexChords-3].length; k++) {
            ArrayMIDIErrori[1].push(Tonal.Midi.midiToNoteName(ArrayAccordiMidiScelti[indexChords-3][k], { pitchClass: true, sharps: true }));
        }
    }
    if(ConteggioVite == 0){
        for(let k=0; k<ArrayAccordiMidiScelti[indexChords-3].length; k++) {
            ArrayMIDIErrori[2].push(Tonal.Midi.midiToNoteName(ArrayAccordiMidiScelti[indexChords-3][k], { pitchClass: true, sharps: true }));
        }
    }

    if(ConteggioVite == 0){
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
                    start();
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

function controlloGiusto(){
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

}



//data notes
function handleInput(input) {
    //console.log(input);
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    //LIVELLO
    if (command == 128){
        switch (note) {
            case 64: //su
            if(lev<3){
                lev++;
                console.log("Level: ", lev)
                ArrayTotale = CreateChords(lev);
                ArrayAccordiScelti = ArrayTotale[0];
                ArrayAccordiMidiScelti = ArrayTotale[1];
                ArrayAccordiScelti_listen = ArrayTotale[2];
                ArrayNoteAccordoScelto = ArrayTotale[3];
            }
            break;
            case 65: //giu
            if(lev>1){
                lev--;
                console.log("Level: ", lev)
                ArrayTotale = CreateChords(lev);
                ArrayAccordiScelti = ArrayTotale[0];
                ArrayAccordiMidiScelti = ArrayTotale[1];
                ArrayAccordiScelti_listen = ArrayTotale[2];
                ArrayNoteAccordoScelto = ArrayTotale[3];
            }
            break;
        }
    }
    switch (command) {

        case 145: //noteOn
        /*if(velocity>0){
            //note is on
            noteOn(note, velocity);
        } else {
            //note is off
            noteOff(note);
        }*/
        
        //playTasto
        var notaMIDI = note.toString();
        soundEngine.init(notaMIDI);

        lastNoteReceived = note;
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

        // errori
        if(controllo == true){
            controlloPerdita(lastNoteReceived);
        }
        if(arrayComparaMIDI.length==arrrrrrr[indiceArrrr].length){
            controlloGiusto();
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











