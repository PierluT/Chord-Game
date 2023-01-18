let choosenAvatar = "";
let choosenMode= "";
let composerToAnimate = "";
let graficaModificata = false;
// Seleziona i div
var composerAnimation = document.querySelector('#avatarScelto');
let clickedButton = document.getElementById('playButton');
var mozart = document.querySelector('#mozart');
var beethoven = document.querySelector('#beethoven');
var bach = document.querySelector('#bach');

var posizioneLiv = 0;
var posizioneMode = 0;

var livello1Scelto = document.querySelector('#livello1');
var livello2Scelto = document.querySelector('#livello2');
var livello3Scelto = document.querySelector('#livello3');

var readChoosenMode = document.querySelector('#readMode'); 
var listenChoosenMode = document.querySelector('#listenMode');

//variabili css originale elementi HTML
//livelli style
var originalStyleLivello1 = window.getComputedStyle(document.getElementById("livello1"), null);
var originalStyleLivello2 = window.getComputedStyle(document.getElementById("livello2"), null);
var originalStyleLivello3 = window.getComputedStyle(document.getElementById("livello3"), null);
//mode style
var originalStyleReadMode = window.getComputedStyle(document.getElementById("readMode"), null);
var originalStyleListenMode = window.getComputedStyle(document.getElementById("listenMode"), null);
//avatar style
var originalStyleBach = window.getComputedStyle(document.getElementById("bach"), null);
var originalStyleMozart = window.getComputedStyle(document.getElementById("mozart"), null);
var originalStyleBeethoven = window.getComputedStyle(document.getElementById("beethoven"), null);

function changeLevel(){
    switch (posizioneLiv){
        case 1:
            lev = 1;
            levInizialeScelto=lev;
            console.log("LIVELLO SCELTO", levInizialeScelto);
            livello1Scelto.style.color = "white";
            var currentSize = window.getComputedStyle(livello1Scelto, null).getPropertyValue('font-size');
            var currentSize = parseFloat(currentSize);
            livello1Scelto.style.fontSize = (currentSize * 1.08) + 'px';
            document.getElementById("livello2").style.cssText = originalStyleLivello2.cssText;
            document.getElementById("livello3").style.cssText = originalStyleLivello3.cssText;
            break;

        case 2:
            lev = 2;
            levInizialeScelto=lev;
            console.log("LIVELLO SCELTO", levInizialeScelto);
            livello2Scelto.style.color = "white";
            var currentSize = window.getComputedStyle(livello2Scelto, null).getPropertyValue('font-size');
            var currentSize = parseFloat(currentSize);
            livello2Scelto.style.fontSize = (currentSize * 1.08) + 'px';
            document.getElementById("livello1").style.cssText = originalStyleLivello1.cssText;
            document.getElementById("livello3").style.cssText = originalStyleLivello3.cssText;
            break;

        case 3:
            lev = 3;
            levInizialeScelto=lev;
            console.log("LIVELLO SCELTO", levInizialeScelto);
            livello3Scelto.style.color = "white";
            var currentSize = window.getComputedStyle(livello3Scelto, null).getPropertyValue('font-size');
            var currentSize = parseFloat(currentSize);
            livello3Scelto.style.fontSize = (currentSize * 1.08) + 'px';
            document.getElementById("livello2").style.cssText = originalStyleLivello2.cssText;
            document.getElementById("livello1").style.cssText = originalStyleLivello1.cssText;
            break;
    }
}

function changeMode() {
    switch(posizioneMode) {
        case 1:
            choosenMode = 'read';
            readChoosenMode.style.color = "white";
            var currentSize = window.getComputedStyle(readChoosenMode, null).getPropertyValue('font-size');
            var currentSize = parseFloat(currentSize);
            readChoosenMode.style.fontSize = (currentSize * 1.08) + 'px';

            document.getElementById("listenMode").style.cssText = originalStyleListenMode.cssText;

            break;
        
        case 2:
            choosenMode = 'listen';
            listenChoosenMode.style.color = "white";
            var currentSize = window.getComputedStyle(listenChoosenMode, null).getPropertyValue('font-size');
            var currentSize = parseFloat(currentSize);
            listenChoosenMode.style.fontSize = (currentSize * 1.08) + 'px';

            document.getElementById("readMode").style.cssText = originalStyleReadMode.cssText;
            break;

    }
}

// Aggiungi l'animation-name 'myAnimation' all'elemento
composerAnimation.style.animationName = composerToAnimate;

mozart.onclick = function(){
    composerAnimation.style.animationName = 'mozart';
    choosenAvatar = 'mozart';
    srcPlayer = 'mozart';
    $(mozart).css('border','2px solid green');
    document.getElementById("bach").style.cssText = originalStyleBach.cssText;
    document.getElementById("beethoven").style.cssText = originalStyleBeethoven.cssText;
}

bach.onclick = function(){
    composerAnimation.style.animationName = 'bach'; 
    //composerToAnimate ='bach';
    choosenAvatar = 'bach';
    $(bach).css('border','2px solid green');
    document.getElementById("mozart").style.cssText = originalStyleMozart.cssText;
    document.getElementById("beethoven").style.cssText = originalStyleBeethoven.cssText;
    
}

beethoven.onclick = function(){
    composerAnimation.style.animationName = 'beethoven'; 
    composerToAnimate ='beethoven';
    choosenAvatar = 'beethoven';
    srcPlayer = 'beethoven';
    $(beethoven).css('border','2px solid blanchedalmond');
    document.getElementById("bach").style.cssText = originalStyleBach.cssText;
    document.getElementById("mozart").style.cssText = originalStyleMozart.cssText;
}

clickedButton.onclick = replace;

function replace () {
    if(choosenMode == "" || choosenAvatar == "" || levInizialeScelto == 0) {
        alert("Choose a character, modality and level.")
        choosenMode = "";
        choosenAvatar= "";
        composerToAnimate= "";
        ripristinoGraficaIniziale();
    } else{
        //display schermata di gioco
        document.getElementById("schermataIniziale").style.display= "none";
        document.getElementById("schermataGioco").style.display = "inline";
        ripristinoGraficaIniziale();
        intro_music.stop();
        start();
        animate(0);

    } 
}

function ripristinoGraficaIniziale(){
        document.getElementById("mozart").style.cssText = originalStyleMozart.cssText;
        document.getElementById("beethoven").style.cssText = originalStyleBeethoven.cssText;
        document.getElementById("bach").style.cssText = originalStyleBach.cssText;
        document.getElementById("livello1").style.cssText = originalStyleLivello1.cssText;
        document.getElementById("livello2").style.cssText = originalStyleLivello2.cssText;
        document.getElementById("livello3").style.cssText = originalStyleLivello3.cssText;
        document.getElementById("readMode").style.cssText = originalStyleReadMode.cssText;
        document.getElementById("listenMode").style.cssText = originalStyleListenMode.cssText;
}















