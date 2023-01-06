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
        console.log(soundSequence);

    }
}