
function CreateChords(Livello_scelto){

    //LIVELLLO SCELTO
    console.log("livello scelto (console in function CreateChord)", Livello_scelto);

    //if (choosenMode == 'read'){
        //SCEGLI DIREZIONE CIRCOLO DELLE QUINTE PER GENERARE SEQUENZA DI TONALITA'
        const ToneDiesis = ["C", "G", "D", "A", "E", "B", "F#", "C#"];
        const ToneBemolli = ["C", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"];

        const indexToneDB = Math.random();
        var randomElementDB;
        if (indexToneDB < 0.5) {
        randomElementDB = ToneDiesis;
        } else {
        randomElementDB = ToneBemolli;
        }
        //STAMPA ARRAY CIRCOLO DELLLE QUINTE DI ARRAY
        //console.log("CIRCOLO DI TONALITA' SCELTO (o tonalità con diesis o bemolli): ", randomElementDB);

        //OGNI TOT ACCORDI, CAMBIARE TONALITA' nel circolo delle quinte scelto random
        var Tonalita_scelta;

        var ArrayAccordiScelti = [];
        var ArrayAccordiMidiScelti = [];


        for (let index=0; index<randomElementDB.length; index++){
            Tonalita_scelta = randomElementDB[index];
            //console.log("TONALITA': ", Tonalita_scelta);

            //scegli maggiore, minore
            //const MajMin = ["major", "minor"];
            const MajMin = ["major"];
            const indexMajMin = Math.floor(Math.random() * MajMin.length);
            const Modo_scelto = MajMin[indexMajMin];
            //console.log("MODO SCELTO: ", Modo_scelto);

            var arrayAccordiPossibili = [];
            var arrayDominantiSecondarie = [];
            var arrayDominantiSub = [];
            if(Modo_scelto == "major"){
                //console.log("TONALITA' SCELTA: ", Tonal.Key.majorKey(Tonalita_scelta));
                for (const element of Tonal.Key.majorKey(Tonalita_scelta).chords) {
                    arrayAccordiPossibili.push(element);
                }
                for (const element of Tonal.Key.majorKey(Tonalita_scelta).secondaryDominants) {
                    arrayDominantiSecondarie.push(element);
                }
                for (const element of Tonal.Key.majorKey(Tonalita_scelta).substituteDominants) {
                    arrayDominantiSub.push(element);
                }
            } else {
                //scegli naturale, armonica, melodica con bottone
                const NatHarmMel = ["natural", "harmonic", "melodic"];
                let indexNatHarmMel = Math.floor(Math.random() * NatHarmMel.length);
                const Modo_minore_scelto = NatHarmMel[indexNatHarmMel];
                //console.log("MODO MINORE SCELTO: ", Modo_minore_scelto);
                //console.log("TONALITA' SCELTA: ", Tonal.Key.minorKey(Tonalita_scelta)[Modo_minore_scelto]);
                for (const element of Tonal.Key.minorKey(Tonalita_scelta)[Modo_minore_scelto].chords) {
                    arrayAccordiPossibili.push(element);
                }
            }

            //console.log("ARRAY ACCORDI POSSIBILI:", arrayAccordiPossibili);
            //console.log("ARRAY DOMINANTI SECONDARIE:", arrayDominantiSecondarie); //solo per maggiori
            //console.log("ARRAY DOMINANTI SOSTITUTIVE:", arrayDominantiSub); //solo per maggiori

            //visualizza tot accordi random di scala scelta
            var BooleanDomSec = false;
            var indexAccordoScelto;
            var Accordo_scelto;
            for(var i=0; i<3; i++){
                if(BooleanDomSec==false){
                    indexAccordoScelto = Math.floor(Math.random() * arrayAccordiPossibili.length);
                }
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
                        //console.log("Scelta dominante secondaria");
                        BooleanDomSec = true;
                    } 
                }else if (index_perc>=0){
                    //scelgo dominante sostitutiva
                    if(indexAccordoScelto == 0 || indexAccordoScelto == 6){
                        Accordo_scelto = arrayAccordiPossibili[indexAccordoScelto];
                        BooleanDomSec = false;
                    } else{
                        Accordo_scelto = arrayDominantiSub[indexAccordoScelto];
                        //console.log("Scelta dominante sostitutiva");
                        BooleanDomSec = true;
                    } 
                }


                var Accordo_scelto_ridotto;
                //riduzione o ampliamento accordi in base a livello
                if(BooleanDomSec==true){
                    Accordo_scelto_ridotto = Accordo_scelto;
                } else if (BooleanDomSec==false) {
                    if (Livello_scelto == 1) {
                        Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                    } else if (Livello_scelto == 2) {
                        let numeroCasuale1 = Math.random();
                        if (numeroCasuale1 <= 0.25) {
                            Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                        }
                    } else if (Livello_scelto == 3) {
                        let numeroCasuale2 = Math.random();
                        if (numeroCasuale2 < 0.10) {
                            //triadi
                            Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                        } else if (numeroCasuale2 < 0.25) {
                            //settime
                            Accordo_scelto = Accordo_scelto.replace(/6/g, "");
                        } else {
                            //nona modo maggiore
                            if (Modo_scelto == "major" && Accordo_scelto != arrayAccordiPossibili[2] && Accordo_scelto != arrayAccordiPossibili[6]) {
                                //possibilità di none di dominante alterate
                                let randomRepaceDom9 = ["9", "7#9", "7b9"];
                                let randomIndexDom9 = Math.floor(Math.random() * randomRepaceDom9.length);
                                let randomDom9 = randomRepaceDom9[randomIndexDom9];
                                Accordo_scelto = Accordo_scelto.replace(/maj7/g, "maj9"). replace(/m7/g, "m9").replace(/7/g, randomDom9);
                            } else if (Modo_scelto == "major" && Accordo_scelto == arrayAccordiPossibili[2]){
                                //no nona sul terzo grado scala maggiore
                                let numeroCasuale3 = Math.random();
                                if (numeroCasuale3 <= 0.5) {
                                    Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                                }
                            } else if (Accordo_scelto != arrayAccordiPossibili[6]) {
                                //no nona sul settimo grado scala maggiore
                                let numeroCasuale4 = Math.random();
                                if (numeroCasuale4 <= 0.5) {
                                    Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                                }
                            }//DA METTERE NONE PER MODO MINORE NATURALE!!!
                            /*else if (Modo_scelto == "minor" && Modo_minore_scelto == "natural") {
                                //nona modo maggiore naturale
                                Accordo_scelto = Accordo_scelto.replace(/maj7/g, "maj9"). replace(/7/g, "9");
                            }*/
                        }
                    }
                }
                //console.log("ACCORDO SCELTO:", Accordo_scelto);

                //visualizza note dell'accordo in un array
                var ArrayNoteAccordoScelto = Tonal.Chord.get(Accordo_scelto).notes;
                //console.log("ARRAY ACCORDO SCELTO:", ArrayNoteAccordoScelto);

                //riduci accordo per modalità LISTEN
                Accordo_scelto_ridotto = ArrayNoteAccordoScelto[0];
                //console.log("ARRAY ACCORDO SCELTO RIDOTTO:", Accordo_scelto_ridotto);

                //aggiungi ottava 4 e 5
                for (var k=0; k<ArrayNoteAccordoScelto.length; k++){
                    if(k>=1 && (ArrayNoteAccordoScelto[k-1].includes("A") || ArrayNoteAccordoScelto[k-1].includes("B") || ArrayNoteAccordoScelto[k-1].includes("5"))){
                        ArrayNoteAccordoScelto[k]=ArrayNoteAccordoScelto[k]+"4";
                    } else {
                        ArrayNoteAccordoScelto[k]=ArrayNoteAccordoScelto[k]+"3";
                    }  
                }
                //console.log("ARRAY ACCORDO SCELTO con ottava:", ArrayNoteAccordoScelto);

                //trasforma note in MIDI
                var ArrayMidi = [];
                for (var k=0; k<ArrayNoteAccordoScelto.length; k++){
                    ArrayMidi[k]=Tonal.Midi.toMidi(ArrayNoteAccordoScelto[k]);
                }
                //console.log("ARRAY MIDI: ", ArrayMidi);

                //push elementi dell'array degli accordi scelti
                ArrayAccordiScelti.push(Accordo_scelto);
                //push array di MIDI in array totale di accordi scelti
                ArrayAccordiMidiScelti.push(ArrayMidi);
            }
        }
        if (choosenMode == 'read'){
        console.log("Scelto READ")
        console.log("ARRAY ACCORDI SCELTI: ", ArrayAccordiScelti);
        console.log("ARRAY ACCORDI MIDI SCELTI: ", ArrayAccordiMidiScelti);
    }


    //////////////////////////////
    //LISTEN MODE

    var ArrayAccordiScelti_listen = [];
    var ArrayFundMidiScelti_listen = [];
    var ArrayAccordiMidiScelti_listen = [];

    if (choosenMode=='listen'){
        console.log("Scelto LISTEN")
        
        const WhiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
        const BlackNotesDiesis = ["C#", "D#", "E#", "F#", "G#", "A#", "B#"];
        const BlackNotesBemolli = ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"];

        const FirstNotes = ["E#", "Fb", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"];
        const SecondNotes = ["B#", "Cb", "C", "C#", "Db", "D", "D#", "Eb", "E"];


        //SCELTA IN BASE A PERCENTUALE
        /*for (let i=0; i<100; i++){
            var indexNoteWB = Math.random();
            if (indexNoteWB >= 0.20) {
                var indexNote = Math.floor(Math.random() * WhiteNotes.length);
                var randomNote = WhiteNotes[indexNote];
                ArrayAccordiScelti_listen.push(randomNote);
            } else if (indexNoteWB >= 0.10){
                var indexNote = Math.floor(Math.random() * BlackNotesDiesis.length);
                var randomNote = BlackNotesDiesis[indexNote];
                ArrayAccordiScelti_listen.push(randomNote);
            } else {
                var indexNote = Math.floor(Math.random() * BlackNotesBemolli.length);
                var randomNote = BlackNotesBemolli[indexNote];
                ArrayAccordiScelti_listen.push(randomNote);
            }
            
        }*/

        //SCELTA IN CRESCENTE
        for (let i=0; i<100; i++){

            if (i<33) {
                var indexNote = Math.floor(Math.random() * WhiteNotes.length);
                var randomNote = WhiteNotes[indexNote];
                ArrayAccordiScelti_listen.push(randomNote);
            } else if (i<66){
                var indexNote = Math.floor(Math.random() * BlackNotesDiesis.length);
                var randomNote = BlackNotesDiesis[indexNote];
                ArrayAccordiScelti_listen.push(randomNote);
            } else {
                var indexNote = Math.floor(Math.random() * BlackNotesBemolli.length);
                var randomNote = BlackNotesBemolli[indexNote];
                ArrayAccordiScelti_listen.push(randomNote);
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
        
        
        for (var k=0; k<ArrayAccordiScelti_listen.length; k++){
            ArrayFundMidiScelti_listen[k]=Tonal.Midi.toMidi(ArrayAccordiScelti_listen[k]);

            var fund = ArrayFundMidiScelti_listen[k];
            var terza;
            var quinta;
            var settima;

            if (Livello_scelto==1){ //triadi maggiori e minori
                var majminChord = Math.random();
                if (majminChord<0.5){
                    terza = fund + 4; //maggiore
                } else {
                    terza = fund + 3; //minore
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
                } else if (majmindimaugChord<0.75){ //diminuita
                    terza = fund + 3;
                    quinta = fund + 6;
                } else { //eccedente
                    terza = fund + 4;
                    quinta = fund + 8;
                }
            }
            if (Livello_scelto == 3) { //settime
                var majmindimaugChord = Math.random();
                if (majmindimaugChord<0.16){ //prima specie (settima di dominante) -> più percentuale
                    terza = fund + 4;
                    quinta = fund + 7;
                    settima = fund + 10;
                } else if (majmindimaugChord<0.30){ //seconda specie
                    terza = fund + 3;
                    quinta = fund + 7;
                    settima = fund + 10;
                } else if (majmindimaugChord<0.44){ //terza specie
                    terza = fund + 3;
                    quinta = fund + 6;
                    settima = fund + 10;
                } else if (majmindimaugChord<0.58){ //quarta specie
                    terza = fund + 4;
                    quinta = fund + 7;
                    settima = fund + 11;
                } else if (majmindimaugChord<0.72){ //quinta specie
                    terza = fund + 3;
                    quinta = fund + 6;
                    settima = fund + 9;
                } else if (majmindimaugChord<0.86){ //sesta specie
                    terza = fund + 3;
                    quinta = fund + 7;
                    settima = fund + 11;
                } else { //settima specie
                    terza = fund + 4;
                    quinta = fund + 8;
                    settima = fund + 11;
                }
            }
  
            if(Livello_scelto==3){
                ArrayAccordiMidiScelti_listen[k] = [fund, terza, quinta, settima];
            } else {
                ArrayAccordiMidiScelti_listen[k] = [fund, terza, quinta];
            }

        }

        //console.log("NOTE FUND: ", ArrayAccordiScelti_listen);
        //console.log("NOTE FUND MIDI ", ArrayFundMidiScelti_listen);
        //console.log("ACCORDI ", ArrayAccordiMidiScelti_listen);
    
      
    }

    

    return [ArrayAccordiScelti, ArrayAccordiMidiScelti, ArrayAccordiScelti_listen, ArrayAccordiMidiScelti_listen];
}







