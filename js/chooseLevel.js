
//DA METTERE var lev = 0; quando si usa piano keyboard
var lev = 1;
console.log("Start Level: ", lev);
document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
var ArrayTotale;
var ArrayAccordiScelti = [];
var ArrayAccordiMidiScelti = [];
var ArrayAccordiScelti_listen = [];

function setLevel(input){
    const porta1 = input.data[0];
    const porta2 = input.data[1];
    const porta3 = input.data[2];

    //LIVELLO
    if (porta1 == 128){
        switch (porta2) {
            case 64: //su
            if(lev<3){
                lev++;
                console.log("Level: ", lev)
                document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
                start();
            }
            break;
            case 65: //giu
            if(lev>1){
                lev--;
                console.log("Level: ", lev)
                document.getElementById("livelloScelto").innerHTML = "LEVEL: " + lev;
                start();
            }
            break;
        }
        
    } 
}


