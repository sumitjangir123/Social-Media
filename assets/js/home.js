dragElement(document.getElementById("user-chat-box"));

//for chat msg input container and the msg list
var element = document.getElementById("chat-message-input-container");
var element1= document.getElementById("chat-messages-list");

function dragElement(elmnt) {
    setTimeout(function(){ 
      elmnt.style.display="block";
      //calling the sound play function
      playAudio();
     }, 4000);

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    startHeight = parseInt(document.defaultView.getComputedStyle(elmnt).height, 10);
    // set the element's new position:
    // elmnt.style.height = (elmnt.offsetTop - pos2) + "px";
   

    if((elmnt.offsetLeft - pos1)>0){
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    //for hiding the msg list and the input field for the chat box
    if ((startHeight + pos2) < 130) {
      element.style.display="none";
      element1.style.display="none";
    }else{
      element.style.display="flex";
      element1.style.display="block";
    }

    //making the div stretchable
    elmnt.style.height = (startHeight + pos2) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
// copyrights:Sumit kumar Jangir

var x= document.getElementById('hider');
var y= document.getElementById('shower');
var z= document.getElementById('user-chat-box');
var e= document.getElementById('chat-message-input-container');
function doIt(){
    x.style.display="none";
    y.style.display="block";
    z.style.height="50px";
    e.style.position="relative";
}

function doItAgain(){
  x.style.display="block";
  y.style.display="none";
  z.style.height="400px";
  e.style.position="absolute"
}

//for playing the notification sound
var sound = document.getElementById("myAudio"); 
function playAudio() { 
  sound.play(); 
} 

//for the functionality of hide and show
function showComments(id){
  
  let button= document.getElementById(id);
  let temp= document.getElementById("comment_section"+ "_"+id);
  console.log(button.innerText);

  if(button.innerText=="COMMENTS"){
    temp.style.display="block";
    button.innerText="HIDE";
  }else{
    temp.style.display="none";
    button.innerText="COMMENTS";
  }
 
}