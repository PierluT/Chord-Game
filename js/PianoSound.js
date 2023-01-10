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

var lastNoteReceived;
console.log('ULTIMA NOTARICEVUTA',lastNoteReceived);

//check to MIDI
if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success, failure);
}
function success(midiAccess) {
    midiAccess.addEventListener('statechange', updateDevices);
    const inputs = midiAccess.inputs;
    //console.log(inputs);
    inputs.forEach((input) => {
        //console.log(input);
        input.addEventListener('midimessage', handleInput);
        input.onmidimessage = (message) => {
            const [eventType, noteNumber, velocity] = message.data;
            if(eventType == 145) {
                console.log('noteNumber:', noteNumber);
                lastNoteReceived = noteNumber;
            }
        };
    })
}
function updateDevices(event) {
    console.log('Name:', event.port.name, 'Brand:', event.port.manufacturer, 'State:', event.port.state, 'Type:', event.port.type);
}
function failure() {
    console.log('Could not connect MIDI');
}

//data notes
function handleInput(input) {
    //console.log(event);
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];
    //console.log(command, note, velocity);

    switch (command) {

        case 145: //noteOn
        /*if(velocity>0){
            //note is on
            noteOn(note, velocity);
        } else {
            //note is off
            noteOff(note);
        }*/
        var notaMIDI = note.toString();
        soundEngine.init(notaMIDI);
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

