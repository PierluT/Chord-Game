let choosenAvatar = "";
let choosenMode= "";
let composerToAnimate = "";
let clickedButton = document.getElementById('playButton');
// Seleziona i div
var mozart = document.querySelector('#mozart');
var beethoven = document.querySelector('#beethoven');

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
    if(choosenMode == "" || choosenAvatar == "") {
        alert("Choose a character and a modality.")
        choosenMode = "";
        choosenAvatar= "";
        composerToAnimate= "";
        //srcPlayer = "";
    }else{
        document.getElementById("schermataIniziale").style.display= "none";
        document.getElementById("schermataGioco").style.display = "inline";
        soundChord.init('24','25','26');
        soundEngine.init('24');
    } 
}












