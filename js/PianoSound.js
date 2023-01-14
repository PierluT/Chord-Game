
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
        input.addEventListener('midimessage', setLevel); 
    })
    

}


function updateDevices(event) {
    console.log('Name:', event.port.name, 'Brand:', event.port.manufacturer, 'State:', event.port.state, 'Type:', event.port.type);
}
function failure() {
    console.log('Could not connect MIDI');
}




//CONTEGGIO VITE e MORTE
var ConteggioVite = 3;
var errori = [];
var ArrayAccordiErrori = [];
var ArrayMIDIErrori = [[],[],[]];

function controlloPerdita(lastNoteReceived, arChord, arMIDI, indiceAr) {
    ConteggioVite--;
    errori.push(Tonal.Midi.midiToNoteName(lastNoteReceived, { pitchClass: true }));
    console.log("errore", errori);
    ArrayAccordiErrori.push(arChord[indiceAr].slice(0, -1));
    console.log("accordo in cui ho fatto l'errore", ArrayAccordiErrori);
    if(ConteggioVite == 2){
        for(let k=0; k<arMIDI[indiceAr].length; k++) {
            ArrayMIDIErrori[0].push(Tonal.Midi.midiToNoteName(arMIDI[indiceAr][k], { pitchClass: true, sharps: true }));
        }
    }
    if(ConteggioVite == 1){
        for(let k=0; k<arMIDI[indiceAr].length; k++) {
            ArrayMIDIErrori[1].push(Tonal.Midi.midiToNoteName(arMIDI[indiceAr][k], { pitchClass: true, sharps: true }));
        }
    }
    if(ConteggioVite == 0){
        for(let k=0; k<arMIDI[indiceAr].length; k++) {
            ArrayMIDIErrori[2].push(Tonal.Midi.midiToNoteName(arMIDI[indiceAr][k], { pitchClass: true, sharps: true }));
        }
    }
    console.log("note in cui ho fatto l'errore", ArrayMIDIErrori);

    if(ConteggioVite == 0){
        var imageUrl = this.document.querySelector('#imgPlayerPerso');
        imageUrl.src = looserImage;
        primaNota = false;
        document.getElementById("schermataGioco").style.opacity = 0.3;

        //PRIMO ERRORE
        document.getElementById("primoErrore").innerHTML = ArrayAccordiErrori[0] + " -> " + ArrayMIDIErrori[0] + "(<s>" + errori[0] + "</s>)";
        //SECONDO ERRORE
        document.getElementById("secondoErrore").innerHTML = ArrayAccordiErrori[1] + " -> " + ArrayMIDIErrori[1] + "(<s>" + errori[1] + "</s>)";
        //TERZO ERRORE
        document.getElementById("terzoErrore").innerHTML = ArrayAccordiErrori[2] + " -> " + ArrayMIDIErrori[2] + "(<s>" + errori[2] + "</s>)";

        $( function() {
            $( "#dialog" ).dialog({
                title: "Game Over",
                modal: true,
                buttons: {
                Restart: function() {
                    ConteggioVite = 3;
                    indexChords=0;
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
    voy_MODIEFIER = V0Y_MAX*(0.5 + 0.5*((yDistance+ 200)/canvas.height));
    //console.log(yDistance/canvas.height)

    rispostaGiusta = true;
    //attivo questo commento se do 3 possibilità per accordo e non 3 totali
    //window.keyPressCounter = 0;
    // initialize the game of life
    //gol.init();

}


var lastNoteReceived = 0;
var arrayComparaMIDI =[];
var indiceAr=0;

//data notes
function handleInput(input) {
    //console.log(input);
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    switch (command) {

        case 145:

        var notaMIDI = note.toString();
        soundEngine.init(notaMIDI);
        console.log(note);

        lastNoteReceived = note;
        var controllo = true;

        var arMIDI;
        var arChord;

        switch (choosenMode) {
            case 'read':
                arMIDI = ArrayAccordiMidiScelti;
                arChord = ArrayAccordiScelti;
            break;
            
            case 'listen':
                arMIDI = ArrayAccordiMidiScelti_listen;
                arChord = ArrayAccordiScelti_listen;
            break;
        }

        for(let j=0; j<arMIDI[indiceAr].length; j++){ 
            if(arMIDI[indiceAr][j]==lastNoteReceived || (Math.abs(lastNoteReceived-arMIDI[indiceAr][j])) % 12 == 0){
                let found = false;
                for (let i = -96; i <= 96; i += 12) {
                    if (arrayComparaMIDI.includes(lastNoteReceived + i)) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    arrayComparaMIDI.push(lastNoteReceived);
                    console.log(arrayComparaMIDI);
                }

                controllo = false;
            }
        }       

        // errori
        if(controllo == true){
            controlloPerdita(lastNoteReceived, arChord, arMIDI, indiceAr);
        }
        if(arrayComparaMIDI.length==arMIDI[indiceAr].length){
            controlloGiusto();
            arrayComparaMIDI = [];
            //indiceAr++; //messo in function automaticJump in Player.js (così prima di atterrare non conta errore se si ripetono note)
        }
         
        break;

    }
  
}



var fund = 0;

function listenSound (allChord) {
    setTimeout(function() {
        soundEngine.init(allChord[0].toString());
    }, 500);
    setTimeout(function() {
        soundEngine.init(allChord[1].toString());
    }, 1000);
    setTimeout(function() {
        soundEngine.init(allChord[2].toString());
    }, 1500);
    if(lev==3){
        setTimeout(function() {
            soundEngine.init(allChord[3].toString());
        }, 2000);
        setTimeout(function() {
            soundEngine.init(allChord[0].toString());
            soundEngine.init(allChord[1].toString());
            soundEngine.init(allChord[2].toString());
            soundEngine.init(allChord[3].toString());
        }, 2500);
    } else {
        setTimeout(function() {
            soundEngine.init(allChord[0].toString());
            soundEngine.init(allChord[1].toString());
            soundEngine.init(allChord[2].toString());
        }, 2000);
    }  
}




