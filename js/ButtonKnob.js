
var lev = 1;

var ArrayTotale;
var ArrayTot1;
var ArrayTot2;
var ArrayTot3;
var ArrayAccordiScelti = [];
var ArrayAccordiMidiScelti = [];
var ArrayAccordiScelti_listen = [];
var ArrayAccordiMidiScelti_listen = [];


//LEVEL BUTTONS
function setLevel(input){
    var porta1 = input.data[0];
    var porta2 = input.data[1];
    var porta3 = input.data[2];

    if (porta1 == 144){
        switch (porta2) {
            case 64: //su
            if(posizioneLiv < 3){
                posizioneLiv++;
                console.log("posizione livello: ", posizioneLiv)
                changeLevel();
            }
            break;
            case 65: //giu
            if(posizioneLiv > 1){
                posizioneLiv--;
                console.log("Level: ", posizioneLiv)
                changeLevel();
            }
            break;

            case 66:    
                if( posizioneMode > 0){
                    posizioneMode--;
                    console.log("indice mode", posizioneMode)
                    changeMode();
                }
                break;
            
            case 67:
                if(posizioneMode < 2){
                    posizioneMode++;
                    console.log("indice mode", posizioneMode)
                    changeMode();
                }
                break;
        } 
    }
}

//RESET BUTTON (STOP ALL CLIPS)
function setReset(input){
    var porta1 = input.data[0];
    var porta2 = input.data[1];
    var porta3 = input.data[2];
    if (porta1 == 144){
        
        switch (porta2) {
            case 81: 
            //bottone reset
            /*
            console.log("bottone 81 sono qui");
            azzeraValori();
            document.getElementById("schermataIniziale").style.display= "none";
            document.getElementById("schermataGioco").style.display = "inline";
            ripristinoGraficaIniziale();
            */
            break;
        } 
    }
}

var v;
//KNOB VELOCITA'
function setVelocity(input){
    var porta1 = input.data[0];
    var porta2 = input.data[1];
    var porta3 = input.data[2];
    if (porta1 == 176 && porta2 == 51){
        v=Math.max(0.5,(porta3/(127)));
        console.log(v)
    }
}




