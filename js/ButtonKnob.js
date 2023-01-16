
var lev = 1;
var v=0.6;

//document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
var ArrayTotale;
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
            if(lev<=3){
                lev++;
                console.log("Level: ", lev)
                //document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
            }
            break;
            case 65: //giu
            if(lev>=1){
                lev--;
                console.log("Level: ", lev)
                //document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
            }
            break;
        } 
    }
}

//RESET BUTTON
function setReset(input){
    var porta1 = input.data[0];
    var porta2 = input.data[1];
    var porta3 = input.data[2];
    if (porta1 == 144){
        switch (porta2) {
            case 81: //restart
                start();
                document.getElementById("livesleft").innerHTML = "LIVES LEFT: " + ConteggioVite;
            break;
        } 
    }
}


//KNOB VELOCITA'
function setVelocity(input){
    var porta1 = input.data[0];
    var porta2 = input.data[1];
    var porta3 = input.data[2];
    if (porta1 == 176 && porta2 == 51){
        var v=(porta3/(127));
        console.log(v)
    }
    return v
}

