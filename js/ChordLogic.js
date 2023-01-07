/*import { Key } from "tonal";
import { Chord } from "tonal";
import { Midi } from "tonal";*/


//scegli livello 1 (triadi) o livello 2 (triade e settime) o livello 3 (triadi, settime, none)
const FacDif = ["level 1", "level 2", "level 3"];
var indexFacDif = Math.floor(Math.random() * FacDif.length);
const Livello_scelto = FacDif[indexFacDif];
console.log("LIVELLO SCELTO (da 1 a 3): ", Livello_scelto);

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
console.log("CIRCOLO DI TONALITA' SCELTO (o tonalità con diesis o bemolli): ", randomElementDB);

//OGNI TOT ACCORDI, CAMBIARE TONALITA' nel circolo delle quinte scelto random
var Tonalita_scelta;

const ArrayAccordiScelti = [];
const ArrayAccordiMidiScelti = [];
const ArrayAccordiScelti_listen = [];

for (let index=0; index<randomElementDB.length; index++){
    Tonalita_scelta = randomElementDB[index];
    console.log("TONALITA': ", Tonalita_scelta);

    //scegli maggiore, minore
    //const MajMin = ["major", "minor"];
    const MajMin = ["major"];
    const indexMajMin = Math.floor(Math.random() * MajMin.length);
    const Modo_scelto = MajMin[indexMajMin];
    console.log("MODO SCELTO: ", Modo_scelto);

    const arrayAccordiPossibili = [];
    const arrayDominantiSecondarie = [];
    const arrayDominantiSub = [];
    if(Modo_scelto == "major"){
        console.log("TONALITA' SCELTA: ", Tonal.Key.majorKey(Tonalita_scelta));
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
        console.log("MODO MINORE SCELTO: ", Modo_minore_scelto);
        console.log("TONALITA' SCELTA: ", Tonal.Key.minorKey(Tonalita_scelta)[Modo_minore_scelto]);
        for (const element of Tonal.Key.minorKey(Tonalita_scelta)[Modo_minore_scelto].chords) {
            arrayAccordiPossibili.push(element);
        }
    }

    console.log("ARRAY ACCORDI POSSIBILI:", arrayAccordiPossibili);
    //DA GESTIRE DOMINANTI SECONDAARIE O DOMINANTI SUB
    console.log("ARRAY DOMINANTI SECONDARIE:", arrayDominantiSecondarie); //solo per maggiori
    console.log("ARRAY DOMINANTI SOSTITUTIVE:", arrayDominantiSub); //solo per maggiori

    //visualizza tot accordi random di scala scelta
    for(var i=0; i<10; i++){
        let indexAccordoScelto = Math.floor(Math.random() * arrayAccordiPossibili.length);
        var Accordo_scelto = arrayAccordiPossibili[indexAccordoScelto];
        var Accordo_scelto_ridotto;

        //riduzione o ampliamento accordi in base a livello
        if (Livello_scelto == "level 1") {
            Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
        } else if (Livello_scelto == "level 2") {
            let numeroCasuale1 = Math.random();
            if (numeroCasuale1 <= 0.5) {
                Accordo_scelto = Accordo_scelto.replace(/m7b5|o7/g, "dim").replace(/maj7|7|Maj7|6/g, "");
            }
        } else if (Livello_scelto == "level 3") {
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
        console.log("ACCORDO SCELTO:", Accordo_scelto);

        //visualizza note dell'accordo in un array
        var ArrayNoteAccordoScelto = Tonal.Chord.get(Accordo_scelto).notes;
        console.log("ARRAY ACCORDO SCELTO:", ArrayNoteAccordoScelto);

        //riduci accordo per modalità LISTEN
        Accordo_scelto_ridotto = ArrayNoteAccordoScelto[0];
        console.log("ARRAY ACCORDO SCELTO RIDOTTO:", Accordo_scelto_ridotto);

        //aggiungi ottava 4 e 5
        for (var k=0; k<ArrayNoteAccordoScelto.length; k++){
            if(k>=1 && (ArrayNoteAccordoScelto[k-1].includes("A") || ArrayNoteAccordoScelto[k-1].includes("B") || ArrayNoteAccordoScelto[k-1].includes("5"))){
                ArrayNoteAccordoScelto[k]=ArrayNoteAccordoScelto[k]+"5";
            } else {
                ArrayNoteAccordoScelto[k]=ArrayNoteAccordoScelto[k]+"4";
            }  
        }
        console.log("ARRAY ACCORDO SCELTO con ottava:", ArrayNoteAccordoScelto);

        //trasforma note in MIDI
        var ArrayMidi = [];
        for (var k=0; k<ArrayNoteAccordoScelto.length; k++){
            ArrayMidi[k]=Tonal.Midi.toMidi(ArrayNoteAccordoScelto[k]);
        }
        console.log("ARRAY MIDI: ", ArrayMidi);

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

//scegli READ o LISTEN mode
/*const GameMode = ["READ", "LISTEN"];
const indexGameMode = Math.floor(Math.random() * GameMode.length);
const GameMode_scelto = GameMode[indexGameMode];
console.log("MODO DI GIOCO SCELTO (READ o LISTEN): ", GameMode_scelto);*/

const ArrayText = [];

switch (choosenMode) {
    case 'read':
        ArrayText = ArrayAccordiScelti;
        break;
    case 'listen':
        ArrayText = ArrayAccordiScelti_listen;
        break;
}

console.log("ARRAY TEXT SU BLOCCHI: ", ArrayText);


//let keysPressed = {};
/*let currentArray = 0;
//ora uso keyArray, ma dovremo usare ArrayAccordiMidiScelti con i numeri MIDI
const keyArray = [['q','w','e'], ['r','t','y'], ['r','t','y']];
window.addEventListener('keydown', (event) => {
    const key = event.key;
    if (keyArray[currentArray].includes(key)){
        console.log('ciao');
        for(let i=0; i<currentArray.length; i++){
            console.log(currentArray[i]);
            soundEngine.init(currentArray[i]);
        }
        currentArray++;
    }
    if (currentArray >= keyArray.length){
        console.log("fine gioco");
    }
});*/




/*window.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;

    if (keysPressed["q"] && keysPressed["e"] && keysPressed["t"]) {
        console.log("ciao");
        soundEngine.init('24');
        keysPressed[event.key] = false;
    }
    


})*/


