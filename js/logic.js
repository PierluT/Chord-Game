let choosenAvatar = "";
let choosenMode= "";
let composerToAnimate = "";
let clickedButton = document.getElementById('playButton');
// Seleziona i div
var mozart = document.querySelector('#mozart');
var beethoven = document.querySelector('#beethoven');
var bach = document.querySelector('#bach');

var livello1Scelto = document.querySelector('#livello1');
var livello2Scelto = document.querySelector('#livello2');
var livello3Scelto = document.querySelector('#livello3');

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
/*
livello1Scelto.addEventListener('click', function() {
    lev = 1;
    levInizialeScelto=lev;
  });
*/
  //cliccato a mano,va settato con bottone
  livello1Scelto.onclick = function() {
    lev = 1;
    levInizialeScelto=lev;
    console.log(levInizialeScelto);
    this.style.color = "white";
    var currentSize = window.getComputedStyle(this, null).getPropertyValue('font-size');
    var currentSize = parseFloat(currentSize);
    this.style.fontSize = (currentSize * 1.08) + 'px';

    document.getElementById("livello2").style.cssText = originalStyleLivello2.cssText;
    document.getElementById("livello3").style.cssText = originalStyleLivello3.cssText;
}

/*
livello2Scelto.addEventListener('click', function() {
    lev = 2;
    levInizialeScelto=lev;
});
*/

//cliccato a mano,va settato con bottone
livello2Scelto.onclick = function() {
    lev = 2;
    levInizialeScelto=lev;
    console.log(levInizialeScelto);
    this.style.color = "white";
    var currentSize = window.getComputedStyle(this, null).getPropertyValue('font-size');
    var currentSize = parseFloat(currentSize);
    this.style.fontSize = (currentSize * 1.08) + 'px';

    document.getElementById("livello1").style.cssText = originalStyleLivello1.cssText;
    document.getElementById("livello3").style.cssText = originalStyleLivello3.cssText;
}
/*
livello3Scelto.addEventListener('click', function() {
    lev = 3;
    levInizialeScelto=lev;
});
*/

//cliccato a mano,va settato con bottone
livello3Scelto.onclick = function() {
    lev = 3;
    levInizialeScelto=lev;
    console.log(levInizialeScelto);
    this.style.color = "white";
    var currentSize = window.getComputedStyle(this, null).getPropertyValue('font-size');
    var currentSize = parseFloat(currentSize);
    this.style.fontSize = (currentSize * 1.08) + 'px';
    document.getElementById("livello2").style.cssText = originalStyleLivello2.cssText;
    document.getElementById("livello1").style.cssText = originalStyleLivello1.cssText;
}
// Seleziona l'elemento
var composerAnimation = document.querySelector('#avatarScelto');
// Aggiungi l'animation-name 'myAnimation' all'elemento
composerAnimation.style.animationName = composerToAnimate;


var readChoosenMode = document.querySelector('#readMode');
var listenChoosenMode = document.querySelector('#listenMode');

readChoosenMode.onclick = function() {
    this.style.color = "white";
    var currentSize = window.getComputedStyle(this, null).getPropertyValue('font-size');
    var currentSize = parseFloat(currentSize);
    this.style.fontSize = (currentSize * 1.08) + 'px';

    document.getElementById("listenMode").style.cssText = originalStyleListenMode.cssText;

}

listenChoosenMode.onclick = function() {
    this.style.color = "white";
    var currentSize = window.getComputedStyle(this, null).getPropertyValue('font-size');
    var currentSize = parseFloat(currentSize);
    this.style.fontSize = (currentSize * 1.08) + 'px';

    document.getElementById("readMode").style.cssText = originalStyleReadMode.cssText;
}

mozart.onclick = function(){
    $(mozart).css('border','2px solid green');
    document.getElementById("bach").style.cssText = originalStyleBach.cssText;
    document.getElementById("beethoven").style.cssText = originalStyleBeethoven.cssText;
}

bach.onclick = function(){
    $(bach).css('border','2px solid green');
    document.getElementById("mozart").style.cssText = originalStyleMozart.cssText;
    document.getElementById("beethoven").style.cssText = originalStyleBeethoven.cssText;
    
}

beethoven.onclick = function(){
    $(beethoven).css('border','2px solid green');
    document.getElementById("bach").style.cssText = originalStyleBach.cssText;
    document.getElementById("mozart").style.cssText = originalStyleMozart.cssText;
}

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

bach.addEventListener('click', function() {
    composerAnimation.style.animationName = 'bach'; 
    //composerToAnimate ='bach';
    choosenAvatar = 'bach';
    srcPlayer = 'bach';
  });

readChoosenMode.addEventListener('click', function(){
    choosenMode = 'read';
})

listenChoosenMode.addEventListener('click',function() {
    choosenMode = 'listen';
})

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















