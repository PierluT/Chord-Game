//MODELLO RIPRODUZIONE SUONI MIDI VIDEO YOUTUBE

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
