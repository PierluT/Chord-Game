// Seleziona i div
var mozart = document.querySelector('#mozart');
var beethoven = document.querySelector('#beethoven');

var readChoosenMode = document.querySelector('#readMode');
var listenChoosenMode = document.querySelector('#listenMode');

mozart.addEventListener('click', function() {

  choosenAvatar = 'mozart';
  console.log(choosenAvatar)
});

beethoven.addEventListener('click', function() {

  choosenAvatar = 'beethoven';
  console.log(choosenAvatar)
});

readChoosenMode.addEventListener('click', function(){
    choosenMode = 'ear';
    console.log(choosenMode);
})

listenChoosenMode.addEventListener('click',function(){
    choosenMode = 'listen';
    console.log(choosenMode);
})

function replace (){
    if(choosenMode == "" || choosenAvatar == ""){
        alert("Choose a character and a modality.")
        choosenMode = "";
        choosenAvatar= "";
    }else{
        document.getElementById("schermataIniziale").style.display= "none";
        document.getElementById("gameSet").style.display = "inline";
    }
    
    
}









