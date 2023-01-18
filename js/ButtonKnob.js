
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
                /*
                levInizialeScelto=lev;
                lev++;
                */
                posizioneLiv++;
                console.log("posizione livello: ", posizioneLiv)
                changeLevel();
            }
            break;
            case 65: //giu
            if(posizioneLiv > 1){
                /*
                levInizialeScelto=lev;
                lev--;
                */
                posizioneLiv--;
                console.log("Level: ", posizioneLiv)
                changeLevel();
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
            case 81: //restart
            //DA VEDERE
                //replace();
            break;
            case 98: //reset
            //DA VEDERE
                /*lost.stop();
                intro_music.play();
                choosenAvatar = "";
                choosenMode= "";
                composerToAnimate = "";
                azzeraValori();
                document.getElementById("schermataIniziale").style.display = "inline";
                document.getElementById("schermataGioco").style.display = "none";
                document.getElementById("schermataGioco").style.opacity = 1;*/
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




