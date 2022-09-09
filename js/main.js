'use strict'
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  const face = document.getElementById('face');
  const sound = document.getElementById('sound-play');
  let startTime;
  let timeoutId;
  let elapsedTime = 0;
  // let num = 1;
  
  
  face.classList.add('nomal-face');
  
  function countUp(){
    
    const d = new Date(Date.now() - startTime + elapsedTime);
    const h = String(d.getHours()-9).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${h}:${m}:${s}.${ms}`;

    if((d.getSeconds() === 0)){
      face.classList.remove('funny-face');
      face.classList.add('nomal-face');
    }else if((d.getSeconds() % 3) === 0 || /3/.test(d.getSeconds())){

      sound.play();
      face.classList.remove('nomal-face');
      face.classList.add('funny-face');

      // sound.pause();
    }else{
      face.classList.remove('funny-face');
      face.classList.add('nomal-face');
    }
    
    timeoutId = setTimeout(() => {
      countUp();
      // num++;
    }, 10);
  }

  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }
  
  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }
  
  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }
  
  setButtonStateInitial();
  
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true ){
      return;
    }
    sound.load();
    setButtonStateRunning()
    startTime = Date.now();
    countUp();
  });
  
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true ){
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });
  
  reset.addEventListener('click', () => {
    face.classList.remove('funny-face');
    face.classList.add('nomal-face');
    if (reset.classList.contains('inactive') === true ){
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00:00.000';
    elapsedTime = 0;
  });
}