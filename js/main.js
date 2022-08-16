'use strict'
{

  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  const face = document.getElementById('face');
  
  let startTime;
  let timeoutId;
  let faceId;
  let elapsedTime = 0;
  let num = 1;

  
  face.classList.add('nomal-face');

  function countUp(){
    
    //分やミリ秒かわかりやすく表示
    const d = new Date(Date.now() - startTime + elapsedTime);
    const h = String(d.getHours()-9).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    timer.textContent = `${h}:${m}:${s}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 1000);
  }

  function changeFace(){
    if((num % 3) === 0 || /3/.test(num)){
      face.classList.remove('nomal-face');
      face.classList.add('funny-face');
    }else{
      face.classList.remove('funny-face');
      face.classList.add('nomal-face');
    }
    
    faceId = setTimeout(() => {
      changeFace();
      num++;
    }, 1000);

  }


  
  // ボタンの有効無効
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
    setButtonStateRunning()
    startTime = Date.now();
    changeFace();
    countUp();
  });

  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true ){
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    clearTimeout(faceId);
    elapsedTime += Date.now() - startTime;
  });
  
  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true ){
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00:00';
    elapsedTime = 0;
  });
}