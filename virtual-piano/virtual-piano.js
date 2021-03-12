const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
let isMousedown;
const btn = document.querySelectorAll('.btn');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

//creates audio and plays it
function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

//plays note when mouse is pressed
piano.addEventListener('mousedown', (event) => {
    if(event.target.classList.contains('piano-key')) {
      const note = event.target.dataset.note;
      const src = `assets/audio/${note}.mp3`;
      event.target.classList.add('piano-key-active')
      playAudio(src);
      isMousedown = true;
    }   
  });
//makes key inactive when mouse is not pressed
window.addEventListener('mouseup', (event) => {
      event.target.classList.toggle('piano-key-active')
      isMousedown = false;   
  });

//plays note is mouse is pressed and mouse over the key
piano.addEventListener('mouseover', (event) => {
    if(event.target.classList.contains('piano-key')) {
      if(isMousedown) {
      const note = event.target.dataset.note;
      const src = `assets/audio/${note}.mp3`;
      event.target.classList.toggle('piano-key-active')
      playAudio(src);
      }  
    }   
  });

//makes key inactive when mouse is pressed and not over the key
piano.addEventListener('mouseout', (event) => {
    if(event.target.classList.contains('piano-key')) {
      if(isMousedown) {
      event.target.classList.toggle('piano-key-active')
      }  
    }   
  });

//plays note when the button pressed
window.addEventListener('keydown', function(event) {
    const pianoКey = document.querySelector(`.piano-key[data-letter="${event.code[3]}"]`);
    if (!pianoКey) return;
    if(event.repeat) return;
    const note = pianoКey.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    pianoКey.classList.toggle('piano-key-active');
    playAudio(src);
  });

//makes key inactive when key is up 
window.addEventListener('keyup', function(event) {
    const pianoКey = document.querySelector(`.piano-key[data-letter="${event.code[3]}"]`);
    if (!pianoКey) return;
    pianoКey.classList.toggle('piano-key-active');
  });

btn.forEach(element => element.addEventListener('click', function() {
  if(btnLetters.classList.contains('btn-active')) {
    btnLetters.classList.remove('btn-active');
    for (i = 0; i < pianoKeys.length; i++){
      pianoKeys[i].classList.remove('piano-key-letter');
    }
  }
  if(btnNotes.classList.contains('btn-active')) {
    btnNotes.classList.remove('btn-active');
    for (i = 0; i < pianoKeys.length; i++){
      pianoKeys[i].classList.add('piano-key-letter');
    }
  }
  element.classList.add('btn-active');
}));


