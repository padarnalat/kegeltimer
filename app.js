const timerEl = document.getElementById('time');
const modeEl = document.getElementById('mode');
const circle = document.getElementById('circle');
const setEl = document.getElementById('currentSet');
const totalSetsDisplay = document.getElementById('totalSetsDisplay');
const btn = document.getElementById('startStop');

let running = false;
let stopRequested = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

btn.addEventListener('click', async () => {
  if (running) {
    stopRequested = true;
    running = false;
    btn.textContent = 'Start';
    return;
  }

  running = true;
  stopRequested = false;
  btn.textContent = 'Stop';

  const setTime = Number(document.getElementById('setTime').value);
  const restTime = Number(document.getElementById('restTime').value);
  const totalSets = Number(document.getElementById('totalSets').value);
  totalSetsDisplay.textContent = totalSets;

  for (let currentSetNum = 1; currentSetNum <= totalSets; currentSetNum++) {
    if (stopRequested) break;

    // SET phase
    modeEl.textContent = 'SET';
    circle.className = 'circle set';
    setEl.textContent = currentSetNum;
    for (let t = 1; t <= setTime; t++) {
      if (stopRequested) break;
      timerEl.textContent = t;
      await sleep(1000);
    }

    if (stopRequested) break;

    // 1-second pause between SET/REST
    timerEl.textContent = '';
    await sleep(1000);

    // REST phase
    if (currentSetNum < totalSets) {
      modeEl.textContent = 'REST';
      circle.className = 'circle rest';
      for (let r = restTime; r > 0; r--) {
        if (stopRequested) break;
        timerEl.textContent = r;
        await sleep(1000);
      }

      if (stopRequested) break;

      // 1-second pause
      timerEl.textContent = '';
      await sleep(1000);
    }
  }

  running = false;
  btn.textContent = 'Start';
  timerEl.textContent = stopRequested ? 'Stopped' : 'Done';
  modeEl.textContent = '';
  circle.className = 'circle set';
});
