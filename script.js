// ── Fullscreen ────────────────────────────────────────
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener('fullscreenchange', () => {
  const isFs = !!document.fullscreenElement;
  document.getElementById('fs-icon-expand').style.display   = isFs ? 'none'   : '';
  document.getElementById('fs-icon-compress').style.display = isFs ? ''       : 'none';
  document.getElementById('fs-toggle').classList.toggle('active', isFs);
});

document.getElementById('fs-toggle').addEventListener('click', toggleFullscreen);

// Press F to toggle fullscreen (when not typing in an input)
document.addEventListener('keydown', e => {
  if (e.key === 'f' || e.key === 'F') toggleFullscreen();
});

// ── State ─────────────────────────────────────────────
let is24hr    = true;
let pomoMode  = false;
let selectedMins = 25;
let totalSecs    = 25 * 60;
let remainSecs   = totalSecs;
let running      = false;
let interval     = null;

const CIRCUM = 565.49; // 2π × 90 (SVG circle r=90)

// ── DOM refs ──────────────────────────────────────────
const clockEl      = document.getElementById('clock-display');
const pomoPanel    = document.getElementById('pomo-panel');
const pomoTimeEl   = document.getElementById('pomo-time');
const arcFill      = document.getElementById('arc-fill');
const startBtn     = document.getElementById('pomo-start');
const pauseBtn     = document.getElementById('pomo-pause');
const fontDropdown = document.getElementById('font-dropdown');
const paletteDrop  = document.getElementById('palette-dropdown');

// ── Clock ─────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');

  if (!is24hr) {
    h = h % 12 || 12;
  }
  clockEl.textContent = `${String(h).padStart(2, '0')}:${m}`;
}

updateClock();
setInterval(updateClock, 1000);

// 12/24 toggle
document.getElementById('hr-toggle').addEventListener('click', function () {
  is24hr = !is24hr;
  this.textContent = is24hr ? '24h' : '12h';
  updateClock();
});

// ── Pomodoro ──────────────────────────────────────────
function setArc(ratio) {
  arcFill.style.strokeDashoffset = CIRCUM * (1 - ratio);
}

function formatPomo(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderPomo() {
  pomoTimeEl.textContent = formatPomo(remainSecs);
  setArc(remainSecs / totalSecs);
}

function startPomo() {
  if (running) return;
  running = true;
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'inline';
  interval = setInterval(() => {
    if (remainSecs <= 0) {
      clearInterval(interval);
      running = false;
      onPomoFinish();
      return;
    }
    remainSecs--;
    renderPomo();
  }, 1000);
}

function pausePomo() {
  clearInterval(interval);
  running = false;
  startBtn.style.display = 'inline';
  pauseBtn.style.display = 'none';
}

function resetPomo() {
  pausePomo();
  remainSecs = totalSecs;
  renderPomo();
}

function onPomoFinish() {
  startBtn.style.display = 'inline';
  pauseBtn.style.display = 'none';
  pomoTimeEl.classList.add('pulse');
  pomoTimeEl.addEventListener('animationend', () => pomoTimeEl.classList.remove('pulse'), { once: true });
  if (Notification.permission === 'granted') {
    new Notification('Tyme.', { body: 'Timer complete. Take a breath.', silent: true });
  }
}

startBtn.addEventListener('click', startPomo);
pauseBtn.addEventListener('click', pausePomo);
document.getElementById('pomo-reset').addEventListener('click', resetPomo);

document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedMins = parseInt(btn.dataset.mins);
    totalSecs    = selectedMins * 60;
    remainSecs   = totalSecs;
    pausePomo();
    renderPomo();
  });
});

// Toggle pomo mode
document.getElementById('pomo-toggle').addEventListener('click', () => {
  pomoMode = !pomoMode;
  if (pomoMode) {
    clockEl.style.display = 'none';
    pomoPanel.classList.add('visible');
    document.getElementById('pomo-toggle').classList.add('active');
    document.body.classList.add('pomo-mode');
    if (Notification.permission === 'default') Notification.requestPermission();
  } else {
    clockEl.style.display = '';
    pomoPanel.classList.remove('visible');
    document.getElementById('pomo-toggle').classList.remove('active');
    document.body.classList.remove('pomo-mode');
    pausePomo();
  }
});

renderPomo();

// ── Font switcher ─────────────────────────────────────
document.getElementById('font-trigger').addEventListener('click', e => {
  e.stopPropagation();
  fontDropdown.classList.toggle('open');
  paletteDrop.classList.remove('open');
});

document.querySelectorAll('.font-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.font-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    const f = opt.dataset.font;
    document.documentElement.style.setProperty('--font', f);
    clockEl.style.fontFamily         = f;
    pomoTimeEl.style.fontFamily      = f;
    document.getElementById('brand').style.fontFamily = f;
    fontDropdown.classList.remove('open');
  });
});

// ── Palette switcher ──────────────────────────────────
document.getElementById('palette-trigger').addEventListener('click', e => {
  e.stopPropagation();
  paletteDrop.classList.toggle('open');
  fontDropdown.classList.remove('open');
});

document.querySelectorAll('.palette-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('.palette-dot').forEach(d => d.classList.remove('selected'));
    dot.classList.add('selected');
    document.documentElement.style.setProperty('--bg',   dot.dataset.bg);
    document.documentElement.style.setProperty('--text', dot.dataset.text);
    document.documentElement.style.setProperty('--wave', dot.dataset.text); // waves = text color
    document.body.style.background = dot.dataset.bg;
    paletteDrop.classList.remove('open');
  });
});

// Close dropdowns on outside click
document.addEventListener('click', () => {
  fontDropdown.classList.remove('open');
  paletteDrop.classList.remove('open');
});
