
var lev = 0;
console.log("Start Level: ", lev);
document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
var ArrayTotale;
var ArrayAccordiScelti = [];
var ArrayAccordiMidiScelti = [];
var ArrayAccordiScelti_listen = [];
var ArrayAccordiMidiScelti_listen = [];

function setLevel(input){
    const porta1 = input.data[0];
    const porta2 = input.data[1];
    const porta3 = input.data[2];

    //LIVELLO
    if (porta1 == 144){
        switch (porta2) {
            case 64: //su
            if(lev<3){
                lev++;
                console.log("Level: ", lev)
                document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
            }
            break;
            case 65: //giu
            if(lev>1){
                lev--;
                console.log("Level: ", lev)
                document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
            }
            break;
            case 66: //restart
                start();
                document.getElementById("livesleft").innerHTML = "LIVES LEFT: " + ConteggioVite;
            break;
        } 
    }
}


