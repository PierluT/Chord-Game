const sound = new Howl({
    src: ['dist/piano.mp3'],
    onload() {
        console.log('Sound file has been loaded. Do something here!');
    },
    onloaderror(e, msg) {
        console.log('Error', e, msg);
    }
});