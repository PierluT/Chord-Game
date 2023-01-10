
//mp3 piano notes
const sound = new Howl({
    src: ['dist/piano.mp3'],
    onload() {
        //console.log('Sound file has been loaded. Do something here!');
        soundEngine.init();
        sound.stop();
    },
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


//soundEngine.play(chordNotes);
}



//MIDI

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


/*var lastNoteReceived = 50;
//faccio un ciclo for in ChordLogic per paassaargli l'array di aarray ogni saalto
const arrrrrrr = [50,51,52];
var arrayComparaMIDI =[];*/


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

        /*lastNoteReceived = note;
        console.log('noteNumber:', lastNoteReceived);

        for(let j=0; j<arrrrrrr.length; j++){
            if(arrrrrrr[j]==lastNoteReceived || (lastNoteReceived-arrrrrrr[j]) % 12 == 0 || (lastNoteReceived+arrrrrrr[j]) % 12 == 0 ){
                if(!arrayComparaMIDI.includes(lastNoteReceived)
                && !arrayComparaMIDI.includes(lastNoteReceived + 12) && !arrayComparaMIDI.includes(lastNoteReceived - 12)
                && !arrayComparaMIDI.includes(lastNoteReceived + 24) && !arrayComparaMIDI.includes(lastNoteReceived - 24)
                && !arrayComparaMIDI.includes(lastNoteReceived + 36) && !arrayComparaMIDI.includes(lastNoteReceived - 36)
                && !arrayComparaMIDI.includes(lastNoteReceived + 48) && !arrayComparaMIDI.includes(lastNoteReceived - 48)
                && !arrayComparaMIDI.includes(lastNoteReceived + 60) && !arrayComparaMIDI.includes(lastNoteReceived - 60)){
                    arrayComparaMIDI.push(arrrrrrr[j]);
                }
            }  
        }
        console.log(arrayComparaMIDI);
        if(arrayComparaMIDI.length==arrrrrrr.length){
            console.log("array controllato, passa al successivo");
            arrayComparaMIDI = [];
        }*/
        
        
        
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
