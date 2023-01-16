let choosenAvatar = "";
let choosenMode= "";
let composerToAnimate = "";
let clickedButton = document.getElementById('playButton');
// Seleziona i div
var mozart = document.querySelector('#mozart');
var beethoven = document.querySelector('#beethoven');

var livello1Scelto = document.querySelector('#livello1');
var livello2Scelto = document.querySelector('#livello2');
var livello3Scelto = document.querySelector('#livello3');

livello1Scelto.addEventListener('click', function() {
    lev = 1;
  });

livello2Scelto.addEventListener('click', function() {
    lev = 2;
});

livello3Scelto.addEventListener('click', function() {
    lev = 3;
});
// Seleziona l'elemento
var composerAnimation = document.querySelector('#avatarScelto');
// Aggiungi l'animation-name 'myAnimation' all'elemento
composerAnimation.style.animationName = composerToAnimate;


var readChoosenMode = document.querySelector('#readMode');
var listenChoosenMode = document.querySelector('#listenMode');

mozart.addEventListener('click', function() {
  composerAnimation.style.animationName = 'mozart';
  choosenAvatar = 'mozart';
  srcPlayer = 'mozart';
});

beethoven.addEventListener('click', function() {
  composerAnimation.style.animationName = 'beethoven'; 
  composerToAnimate ='beethoven';
  choosenAvatar = 'beethoven';
  srcPlayer = 'beethoven';
});

readChoosenMode.addEventListener('click', function(){
    choosenMode = 'read';
    //console.log("ARRAY TEXT SU BLOCCHI: ", ArrayText);
})

listenChoosenMode.addEventListener('click',function() {
    choosenMode = 'listen';
    //console.log("ARRAY TEXT SU BLOCCHI: ", ArrayText);
})

clickedButton.onclick = replace;

function replace () {
    if(choosenMode == "" || choosenAvatar == "" || lev==0) {
        alert("Choose a character, modality and level.")
        choosenMode = "";
        choosenAvatar= "";
        composerToAnimate= "";
        //srcPlayer = "";
    }else{
        document.getElementById("schermataIniziale").style.display= "none";
        document.getElementById("schermataGioco").style.display = "inline";
        start();
        animate(0);

    } 
}















