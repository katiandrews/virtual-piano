const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
let isMousedown;
const btn = document.querySelectorAll('.btn');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
const fullscreenButton = document.querySelector('.fullscreen');

//creates audio and plays it
function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

//plays note when mouse is pressed
piano.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('piano-key')) {
      const note = event.target.dataset.note;
      const src = `assets/audio/${note}.mp3`;
      event.target.classList.add('piano-key-active')
      playAudio(src);
      isMousedown = true;
    }   
  });
//makes key inactive when mouse is not pressed
window.addEventListener('mouseup', (event) => {
  isMousedown = false;    
  if (event.target.classList.contains('piano-key-active')) {
    event.target.classList.toggle('piano-key-active');
  }
  });

//plays note if mouse is pressed and mouse over the key
piano.addEventListener('mousemove', (event) => {
    if (event.target.classList.contains('piano-key')) {
      if (isMousedown) {
      if (event.target.classList.contains('piano-key-active')) return;
      const note = event.target.dataset.note;
      const src = `assets/audio/${note}.mp3`;
      event.target.classList.toggle('piano-key-active');
      playAudio(src);
      }  
    }   
  });

//makes key inactive when mouse is pressed and not over the key
piano.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('piano-key')) {
      if (isMousedown) {
      event.target.classList.toggle('piano-key-active')
      }  
    }   
  });

//plays note when the button pressed
window.addEventListener('keydown', function(event) {
    const pianoКey = document.querySelector(`.piano-key[data-letter="${event.code[event.code.length-1]}"]`);
    if (!pianoКey) return;
    if (event.repeat) return;
    const note = pianoКey.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    pianoКey.classList.toggle('piano-key-active');
    playAudio(src);
  });

//makes key inactive when key is up 
window.addEventListener('keyup', function(event) {
    const pianoКey = document.querySelector(`.piano-key[data-letter="${event.code[event.code.length-1]}"]`);
    if (!pianoКey) return;
    pianoКey.classList.toggle('piano-key-active');
  });

//switch between Letters and Notes buttons
btn.forEach (element => element.addEventListener('click', function() {
  if (element.classList.contains('btn-active')) return;
  if (btnLetters.classList.contains('btn-active')) {
    btnLetters.classList.remove('btn-active');
    for (i = 0; i < pianoKeys.length; i++){
      pianoKeys[i].classList.remove('piano-key-letter');
    }
  }
  if (btnNotes.classList.contains('btn-active')) {
    btnNotes.classList.remove('btn-active');
    for (i = 0; i < pianoKeys.length; i++){
      pianoKeys[i].classList.add('piano-key-letter');
    }
  }
  element.classList.add('btn-active');
}));


//request fullscreen mode if document is not in fullscreen mode and other way around
function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

//toggle fullscreen only when fullscreen button is pressed
fullscreenButton.addEventListener('click', function(event) {
  toggleFullScreen();
})
