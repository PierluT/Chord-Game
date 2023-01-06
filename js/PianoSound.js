//MODELLO RIPORDUZIONE SUONI MIDI VIDEO YOUTUBE

const sound = new Howl({
    src: ['dist/piano.mp3'],
    onload() {
        console.log('Sound file has been loaded. Do something here!');
        soundEngine.init();
    },
    onloaderror(e, msg) {
        console.log('Error', e, msg);
    }
});

const soundEngine = {
    init() {
        const lengthOfNote = 2400;
        let timeIndex = 0;
        //24 is C1 and 96 is C7
        for (let i = 24; i <= 96; i++){
            sound['_sprite'][i] = [timeIndex, lengthOfNote];
            timeIndex += lengthOfNote;
        }
        //play C1
        //sound.play('24');
        //play D1
        //sound.play('26');
    },
    play(soundSequence) {
        //console.log(soundSequence); //nome delle note di ogni array della sequenza
        const chordMidiNumber = soundSequence.maap(notename => {
            return note(noteName).midi;
        });
        sound.volume(0.75);
        chordMidiNumber.forEach(noteMidiNumber => {
            console.log(noteMidiNumber, note(noteName).midi); //nome notaaccordo, midi nota accordo
            sound.play(noteMidiNumber.toString());
        });
    }
}

soundEngine.play(chordNotes);