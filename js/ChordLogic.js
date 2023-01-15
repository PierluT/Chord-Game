const ToneDiesis = ["C", "G", "D", "A", "E", "B", "F#", "C#"];
const ToneBemolli = ["C", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"];

const WhiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
const BlackNotesDiesis = ["C#", "D#", "E#", "F#", "G#", "A#", "B#"];
const BlackNotesBemolli = ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"];

const FirstNotes = ["E#", "Fb", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"];
const SecondNotes = ["B#", "Cb", "C", "C#", "Db", "D", "D#", "Eb", "E"];


function chosenCircleOfFifth(ToneDiesis, ToneBemolli){
    var indexToneDB = Math.random();
    var randomElementDB;
    if (indexToneDB < 0.5) {
        randomElementDB = ToneDiesis;
    } else {
        randomElementDB = ToneBemolli;
    }
    return randomElementDB;
}

function createSequenceRead(arrayAccordiPossibili, arrayDominantiSecondarie, arrayDominantiSub, Livello_scelto){
    var BooleanDomSec = false; //secDom o subDom sì o no
    var Accordo_scelto;

    for(var i=0; i<20; i++){
        if(BooleanDomSec==false){
            var indexAccordoScelto = Math.floor(Math.random() * arrayAccordiPossibili.length);
        }
        //secondary and substitute dominant
        let index_perc = Math.random();
        if (index_perc>=0.15 || BooleanDomSec == true){
            Accordo_scelto = arrayAccordiPossibili[indexAccordoScelto];
            BooleanDomSec = false;
        } else if (index_perc>=0.05){
            //scelgo dominante secondaria
            if(indexAccordoScelto == 0 || indexAccordoScelto == 6){
                Accordo_scelto = arrayAccordiPossibili[indexAccordoScelto];
                BooleanDomSec = false;
            } else{
                Accordo_scelto = arrayDominantiSecondarie[indexAccordoScelto];
                BooleanDomSec = true;
            } 
        }else if (index_perc>=0){
            //scelgo dominante sostitutiva
            if(indexAccordoScelto == 0 || indexAccordoScelto == 6){
                Accordo_scelto = arrayAccordiPossibili[indexAccordoScelto];
                BooleanDomSec = false;
            } else{
                Accordo_scelto = arrayDominantiSub[indexAccordoScelto];
                BooleanDomSec = true;
            } 
        }

        //creazione array in base a LIVELLO SCELTO
        if (BooleanDomSec==false) {
            if (Livello_scelto == 1) {
                //triadi livello 1 (100%)
                Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
            } else if (Livello_scelto == 2) {
                //settime livello 2 (75%)
                let numeroCasuale1 = Math.random();
                if (numeroCasuale1 <= 0.25) {
                    //triadi livello 1 (25%)
                    Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                }
            } else if (Livello_scelto == 3) {
                let numeroCasuale2 = Math.random();
                if (numeroCasuale2 < 0.10) {
                    //triadi livello 3 (10%)
                    Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                } else if (numeroCasuale2 < 0.25) {
                    //settime livello 3 (15%)
                    Accordo_scelto = Accordo_scelto.replace(/6/g, "");
                } else {
                    //none livello 3 (75%)
                    if (Accordo_scelto != arrayAccordiPossibili[2] && Accordo_scelto != arrayAccordiPossibili[6]) {
                        //no none su III e VII grado
                        //none maggiori, minori e di dominante (alterate) sull V
                        let randomRepaceDom9 = ["9", "7#9", "7b9"];
                        let randomIndexDom9 = Math.floor(Math.random() * randomRepaceDom9.length);
                        let randomDom9 = randomRepaceDom9[randomIndexDom9];
                        Accordo_scelto = Accordo_scelto.replace(/maj7/g, "maj9"). replace(/m7/g, "m9").replace(/7/g, randomDom9);
                    } else if (Accordo_scelto == arrayAccordiPossibili[2]){
                        //no nona sul III grado
                        let numeroCasuale3 = Math.random();
                        if (numeroCasuale3 <= 0.5) {
                            Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                        }
                    } else if (Accordo_scelto != arrayAccordiPossibili[6]) {
                        //no nona sul VII grado
                        let numeroCasuale4 = Math.random();
                        if (numeroCasuale4 <= 0.5) {
                            Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                        }
                    }
                }
            }
        }

        //visualizza note dell'accordo scelto in un array
        var ArrayNoteAccordoScelto = Tonal.Chord.get(Accordo_scelto).notes;

        //aggiungi ottava 4 e 5
        for (var k=0; k<ArrayNoteAccordoScelto.length; k++){
            if(k>=1 && (ArrayNoteAccordoScelto[k-1].includes("A") || ArrayNoteAccordoScelto[k-1].includes("B") || ArrayNoteAccordoScelto[k-1].includes("5"))){
                ArrayNoteAccordoScelto[k]=ArrayNoteAccordoScelto[k]+"4";
            } else {
                ArrayNoteAccordoScelto[k]=ArrayNoteAccordoScelto[k]+"3";
            } 
        }

        //trasforma note in MIDI
        var ArrayMidi = [];
        for (var k=0; k<ArrayNoteAccordoScelto.length; k++){
            ArrayMidi[k]=Tonal.Midi.toMidi(ArrayNoteAccordoScelto[k]);
        }

        ArrayAccordiScelti.push(Accordo_scelto);
        ArrayAccordiMidiScelti.push(ArrayMidi);
    }

    return [ArrayAccordiScelti, ArrayAccordiMidiScelti]
}

function createSequenceListen(ArrayAccordiScelti_listen, ArrayAccordiMidiScelti_listen, Livello_scelto){

    for (let i=0; i<100; i++){
        if (i<33) { //note naturali
            var indexNote = Math.floor(Math.random() * WhiteNotes.length);
            var randomNote = WhiteNotes[indexNote];
            ArrayAccordiScelti_listen.push(randomNote);
        } else { //note alterate
            var indexNoteWB = Math.random();
            if(indexNoteWB<0.5){ //bemolli
                var indexNote = Math.floor(Math.random() * BlackNotesBemolli.length);
                var randomNote = BlackNotesBemolli[indexNote];
                ArrayAccordiScelti_listen.push(randomNote);
            } else { //diesis
                var indexNote = Math.floor(Math.random() * BlackNotesDiesis.length);
                var randomNote = BlackNotesDiesis[indexNote];
                ArrayAccordiScelti_listen.push(randomNote);
            }
        }  
    }
    
    for(let i=0; i<ArrayAccordiScelti_listen.length; i++){
        if(FirstNotes.includes(ArrayAccordiScelti_listen[i])) { //set ottava di partenza
            ArrayAccordiScelti_listen[i] = ArrayAccordiScelti_listen[i] + "2";
        }
        if(SecondNotes.includes(ArrayAccordiScelti_listen[i])) { //set ottava di partenza
            ArrayAccordiScelti_listen[i] = ArrayAccordiScelti_listen[i] + "3";
        }
    }
    console.log(ArrayAccordiScelti_listen)
    
    for (var k=0; k<ArrayAccordiScelti_listen.length; k++){
    
        var fund = Tonal.Midi.toMidi(ArrayAccordiScelti_listen[k]);
        var terza;
        var quinta;
        var settima;
        var chordType = "";
    
        if (Livello_scelto == 1){ //triadi maggiori e minori
            var majminChord = Math.random();
            if (majminChord<0.5){
                terza = fund + 4; //maggiore
            } else {
                terza = fund + 3; //minore
                chordType = "m";
            }
            quinta = fund + 7;
        }
        if (Livello_scelto == 2) { //triadi maggiori, minori, eccedenti, diminuite
            var majmindimaugChord = Math.random();
            if (majmindimaugChord<0.25){ //maggiore
                terza = fund + 4;
                quinta = fund + 7;
            } else if (majmindimaugChord<0.5){ //minore
                terza = fund + 3;
                quinta = fund + 7
                chordType = "m";
            } else if (majmindimaugChord<0.75){ //diminuita
                terza = fund + 3;
                quinta = fund + 6;
                chordType = "dim";
            } else { //eccedente
                terza = fund + 4;
                quinta = fund + 8;
                chordType = "aug";
            }
        }
        if (Livello_scelto == 3) { //settime
            var majmindimaugChord = Math.random();
            if (majmindimaugChord<0.16){ //prima specie (settima di dominante) -> più percentuale
                terza = fund + 4;
                quinta = fund + 7;
                settima = fund + 10;
                chordType = "7";
            } else if (majmindimaugChord<0.30){ //seconda specie
                terza = fund + 3;
                quinta = fund + 7;
                settima = fund + 10;
                chordType = "min7";
            } else if (majmindimaugChord<0.44){ //terza specie
                terza = fund + 3;
                quinta = fund + 6;
                settima = fund + 10;
                chordType = "m7b5";
            } else if (majmindimaugChord<0.58){ //quarta specie
                terza = fund + 4;
                quinta = fund + 7;
                settima = fund + 11;
                chordType = "maj7";
            } else if (majmindimaugChord<0.72){ //quinta specie
                terza = fund + 3;
                quinta = fund + 6;
                settima = fund + 9;
                chordType = "dim7";
            } else if (majmindimaugChord<0.86){ //sesta specie
                terza = fund + 3;
                quinta = fund + 7;
                settima = fund + 11;
                chordType = "mMaj7";
            } else { //settima specie
                terza = fund + 4;
                quinta = fund + 8;
                settima = fund + 11;
                chordType = "maj7#5";
            }
        }
    
        if(Livello_scelto == 3){
            ArrayAccordiMidiScelti_listen[k] = [fund, terza, quinta, settima];
        } else {
            ArrayAccordiMidiScelti_listen[k] = [fund, terza, quinta];
        }
        console.log("1: ", ArrayAccordiScelti_listen);
        ArrayAccordiScelti_listen[k]=ArrayAccordiScelti_listen[k].slice(0, 1).trim();
        console.log("2: ", ArrayAccordiScelti_listen);
        ArrayAccordiScelti_listen[k]=ArrayAccordiScelti_listen[k] + chordType;
        console.log("3: ", ArrayAccordiScelti_listen);
    }
    return [ArrayAccordiScelti_listen, ArrayAccordiMidiScelti_listen]
}




function CreateChords(Livello_scelto){

    //////////////////////////////
    //READ MODE

    if (choosenMode == 'read'){

        //scegli tonalità con diesis o tonalità con bemolli
        var randomElementDB = chosenCircleOfFifth(ToneDiesis, ToneBemolli);

        for (let index=0; index<randomElementDB.length; index++){

            var arrayAccordiPossibili = [];
            var arrayDominantiSecondarie = [];
            var arrayDominantiSub = [];

            //crea array di accordi possibili per ogni tonalità
            Tonalita_scelta = randomElementDB[index];    
            for (const element of Tonal.Key.majorKey(Tonalita_scelta).chords) {
                arrayAccordiPossibili.push(element);
            }
            for (const element of Tonal.Key.majorKey(Tonalita_scelta).secondaryDominants) {
                arrayDominantiSecondarie.push(element);
            }
            for (const element of Tonal.Key.majorKey(Tonalita_scelta).substituteDominants) {
                arrayDominantiSub.push(element);
            }

            var creaTotRead = createSequenceRead(arrayAccordiPossibili, arrayDominantiSecondarie, arrayDominantiSub, Livello_scelto);
            ArrayAccordiScelti = creaTotRead[0];
            ArrayAccordiMidiScelti = creaTotRead[1];
        }
        console.log("ARRAY ACCORDI SCELTI: ", ArrayAccordiScelti)
    }

    //////////////////////////////
    //LISTEN MODE

    if (choosenMode == 'listen'){

        var creaTotListen = createSequenceListen(ArrayAccordiScelti_listen,ArrayAccordiMidiScelti_listen,Livello_scelto)
        ArrayAccordiScelti_listen = creaTotListen[0];
        ArrayAccordiMidiScelti_listen = creaTotListen[1];

        console.log("ACCORDI: ", ArrayAccordiScelti_listen);
    }

    return [ArrayAccordiScelti, ArrayAccordiMidiScelti, ArrayAccordiScelti_listen, ArrayAccordiMidiScelti_listen];
}







