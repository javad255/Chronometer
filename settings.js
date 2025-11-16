let startTime = 0;
let running = false;
let interval;

const display = document.getElementById("time");
const startStopBtn = document.getElementById("startStop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const laps = document.getElementById("laps");

function format(t) {
  let ms = t % 1000;
  t = Math.floor(t / 1000);
  let s = t % 60;
  t = Math.floor(t / 60);
  let m = t % 60;
  let h = Math.floor(t / 60);

  return (
    String(h).padStart(2, "0") + ":" +
    String(m).padStart(2, "0") + ":" +
    String(s).padStart(2, "0") + "." +
    String(ms).padStart(3, "0")
  );
}

startStopBtn.onclick = () => {
  if (!running) {
    running = true;
    startStopBtn.innerText = "توقف";
    startTime = Date.now() - (startTime || 0);

    interval = setInterval(() => {
      display.innerText = format(Date.now() - startTime);
    }, 10);

  } else {
    running = false;
    startStopBtn.innerText = "شروع";
    clearInterval(interval);
  }
};

lapBtn.onclick = () => {
  if (!running) return;
  const li = document.createElement("li");
  li.innerHTML = `<span>Lap</span><span>${display.innerText}</span>`;
  laps.prepend(li);
};

resetBtn.onclick = () => {
  running = false;
  clearInterval(interval);
  startTime = 0;
  display.innerText = "00:00:00.000";
  startStopBtn.innerText = "شروع";
  laps.innerHTML = "";
};
