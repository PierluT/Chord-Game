var arMIDI;
var arChord;

//mp3 piano notes
const sound = new Howl({
    src: ['dist/mp3/piano.mp3'],
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
        //set volume
        sound.volume(0.3);

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
        input.addEventListener('midimessage', setReset);
        input.addEventListener('midimessage', setVelocity);
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
document.getElementById("livesleft").innerHTML = "LIVES LEFT: " + ConteggioVite;
var errori = [];
var ArrayAccordiErrori = [];
var ArrayMIDIErrori = [[],[],[]];

function controlloPerdita(lastNoteReceived, arChord, arMIDI, indiceAr) {

    // streak interrupted
    lastCorrect = false;
    checkStreak();

    document.getElementById("livesleft").innerHTML = "LIVES LEFT: " + ConteggioVite;
    if(ConteggioVite!=0){
        errori.push(Tonal.Midi.midiToNoteName(lastNoteReceived, { pitchClass: true }));
        ArrayAccordiErrori.push(arChord[indiceAr]);
        if(ConteggioVite == 2){
            error.play();
            for(let k=0; k<arMIDI[indiceAr].length; k++) {
                ArrayMIDIErrori[0].push(Tonal.Midi.midiToNoteName(arMIDI[indiceAr][k], { pitchClass: true, sharps: true }));
            }
        }
        if(ConteggioVite == 1){
            error.play();
            for(let k=0; k<arMIDI[indiceAr].length; k++) {
                ArrayMIDIErrori[1].push(Tonal.Midi.midiToNoteName(arMIDI[indiceAr][k], { pitchClass: true, sharps: true }));
            }
        }
    }
    if(ConteggioVite == 0 && gameOver==false){
        errori.push(Tonal.Midi.midiToNoteName(lastNoteReceived, { pitchClass: true }));
        ArrayAccordiErrori.push(arChord[indiceAr]);
        lost.play();
        for(let k=0; k<arMIDI[indiceAr].length; k++) {
            ArrayMIDIErrori[2].push(Tonal.Midi.midiToNoteName(arMIDI[indiceAr][k], { pitchClass: true, sharps: true }));
        }
    }
    console.log("errore", errori);
    console.log("accordo in cui ho fatto l'errore", ArrayAccordiErrori);
    //console.log("note in cui ho fatto l'errore", ArrayMIDIErrori);

    if(ConteggioVite == 0){
        var imageUrl = this.document.querySelector('#imgPlayerPerso');
        imageUrl.src = looserImage;
        gameStarted = false;
        document.getElementById("schermataGioco").style.opacity = 0.3;

        if (gameOver==true){ //se muore per raggiungimento ground
            if(errori.length==0){
                document.getElementById("primoErrore").innerHTML = "You're slow! You didn't jump in time";
            } else if(errori.length==1){
                document.getElementById("primoErrore").innerHTML = ArrayAccordiErrori[0] + " -> " + ArrayMIDIErrori[0] + "(<s>" + errori[0] + "</s>)";
                document.getElementById("secondoErrore").innerHTML = "You're slow! You didn't jump in time";
            } else if(errori.length==2){
                document.getElementById("primoErrore").innerHTML = ArrayAccordiErrori[0] + " -> " + ArrayMIDIErrori[0] + "(<s>" + errori[0] + "</s>)";
                document.getElementById("secondoErrore").innerHTML = ArrayAccordiErrori[1] + " -> " + ArrayMIDIErrori[1] + "(<s>" + errori[1] + "</s>)";
                document.getElementById("terzoErrore").innerHTML = "You're slow! You didn't jump in time";
            }
        } else {
            //PRIMO ERRORE
            document.getElementById("primoErrore").innerHTML = ArrayAccordiErrori[0] + " -> " + ArrayMIDIErrori[0] + "(<s>" + errori[0] + "</s>)";
            //SECONDO ERRORE
            document.getElementById("secondoErrore").innerHTML = ArrayAccordiErrori[1] + " -> " + ArrayMIDIErrori[1] + "(<s>" + errori[1] + "</s>)";
            //TERZO ERRORE
            document.getElementById("terzoErrore").innerHTML = ArrayAccordiErrori[2] + " -> " + ArrayMIDIErrori[2] + "(<s>" + errori[2] + "</s>)";
        }

        
        
        $( function() {
            $( "#dialog" ).dialog({
                modal: true,
                draggable: true, 
                resizable: false, 
                position: {
                    my: "left top", 
                    at: "right top", 
                    of: "#schermataInziale"
                },
                height: 740,
                width: 660,
                buttons: {
                Restart: function() {
                    lost.stop();
                    ConteggioVite=3;
                    document.getElementById("livesleft").innerHTML = "LIVES LEFT: " + ConteggioVite;
                    indexChords=0;
                    ArrayAccordiScelti = [];
                    ArrayAccordiScelti_listen = [];
                    errori = [];
                    ArrayAccordiErrori = [];
                    ArrayMIDIErrori = [[],[],[]];
                    arrayComparaMIDI = [];
                    start();
                    document.getElementById("schermataGioco").style.opacity = 1;
                    $(this).dialog("destroy");
                    //$( this ).dialog( "close" );
                    }
                }
            });
        });       
    }
}

function controlloGiusto(){

    //SOUND RIGHT ANSWER
    rightAnswer.play();

    gameStarted = true;
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
    voy_MODIEFIER = V0Y_MAX*(0.5 + 0.5*((yDistance + 100)/canvas.height));
    //console.log(yDistance/canvas.height)

    rispostaGiusta = true;
    //attivo questo commento se do 3 possibilità per accordo e non 3 totali
    //window.keyPressCounter = 0;
    // initialize the game of life
    //gol.init(); 

    // -------- UPDATE THE SCORE --------

    scorePipeline();

    if(choosenMode=='read') {
        document.getElementById("score").innerHTML = "SCORE: " + score +"/" + ArrayAccordiScelti.length;
    }
    if(choosenMode=='listen'){
        document.getElementById("score").innerHTML = "SCORE: " + score +"/" + ArrayAccordiScelti_listen.length;
    }   

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

        /*
        switch (choosenMode) {
            case 'read':
                arMIDI = ArrayAccordiMidiScelti;
                arChord = ArrayAccordiScelti;
            break;
            
            case 'listen':
                arMIDI = ArrayAccordiMidiScelti_listen;
                arChord = ArrayAccordiScelti_listen;
            break;
        } */

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
            ConteggioVite--;
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

// ------- INITIALIZING THE SOUNDS --------

//RIGHT ANSWER
const rightAnswer = new Howl({
    src: ['dist/mp3/risposta_giusta.mp3'],
});

//ERROR
const error = new Howl({
    src: ['dist/mp3/risposta_sbagliata.mp3'],
});

//LOST
const lost = new Howl({
    src: ['dist/mp3/game_over.mp3'],
});

// INTRO MUSIC
const intro_music = new Howl({
    src: ['dist/mp3/intro_music.mp3'],
});

// LEVEL UP
const level_up_sound = new Howl({
    src: ['dist/mp3/level_up.wav'],
});

// GAME STARTED
const game_started_sound = new Howl({
    src: ['dist/mp3/game_started.mp3'],
});



