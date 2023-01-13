
function CreateChords(Livello_scelto){

    //LIVELLLO SCELTO
    console.log("livello scelto", Livello_scelto);

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
    var ArrayAccordiScelti_listen = [];

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
        for(var i=0; i<20; i++){
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
                    if (numeroCasuale1 <= 0.5) {
                        Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                    }
                } else if (Livello_scelto == 3) {
                    let numeroCasuale2 = Math.random();
                    if (numeroCasuale2 < 0.33) {
                        //triadi
                        Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
                    } else if (numeroCasuale2 < 0.66) {
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
                    ArrayNoteAccordoScelto[k]=ArrayNoteAccordoScelto[k]+"5";
                } else {
                    ArrayNoteAccordoScelto[k]=ArrayNoteAccordoScelto[k]+"4";
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
            //Riduco array accordi per modalità LISTEN
            ArrayAccordiScelti_listen.push(Accordo_scelto_ridotto);
        }
    }

    console.log("ARRAY ACCORDI SCELTI: ", ArrayAccordiScelti);
    console.log("ARRAY ACCORDI MIDI SCELTI: ", ArrayAccordiMidiScelti);
    console.log("ARRAY ACCORDI SCELTI RIDOTTI: ", ArrayAccordiScelti_listen);

    return [ArrayAccordiScelti, ArrayAccordiMidiScelti, ArrayAccordiScelti_listen];
}







