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

// ── World clock ───────────────────────────────────────
const TIMEZONES = [
  { city: 'Local Time',       country: 'Your device',    tz: null },
  { city: 'London',           country: 'United Kingdom', tz: 'Europe/London' },
  { city: 'Paris',            country: 'France',         tz: 'Europe/Paris' },
  { city: 'Berlin',           country: 'Germany',        tz: 'Europe/Berlin' },
  { city: 'Rome',             country: 'Italy',          tz: 'Europe/Rome' },
  { city: 'Madrid',           country: 'Spain',          tz: 'Europe/Madrid' },
  { city: 'Amsterdam',        country: 'Netherlands',    tz: 'Europe/Amsterdam' },
  { city: 'Brussels',         country: 'Belgium',        tz: 'Europe/Brussels' },
  { city: 'Zurich',           country: 'Switzerland',    tz: 'Europe/Zurich' },
  { city: 'Stockholm',        country: 'Sweden',         tz: 'Europe/Stockholm' },
  { city: 'Oslo',             country: 'Norway',         tz: 'Europe/Oslo' },
  { city: 'Copenhagen',       country: 'Denmark',        tz: 'Europe/Copenhagen' },
  { city: 'Helsinki',         country: 'Finland',        tz: 'Europe/Helsinki' },
  { city: 'Warsaw',           country: 'Poland',         tz: 'Europe/Warsaw' },
  { city: 'Prague',           country: 'Czech Republic', tz: 'Europe/Prague' },
  { city: 'Vienna',           country: 'Austria',        tz: 'Europe/Vienna' },
  { city: 'Budapest',         country: 'Hungary',        tz: 'Europe/Budapest' },
  { city: 'Bucharest',        country: 'Romania',        tz: 'Europe/Bucharest' },
  { city: 'Athens',           country: 'Greece',         tz: 'Europe/Athens' },
  { city: 'Istanbul',         country: 'Turkey',         tz: 'Europe/Istanbul' },
  { city: 'Moscow',           country: 'Russia',         tz: 'Europe/Moscow' },
  { city: 'Dubai',            country: 'UAE',            tz: 'Asia/Dubai' },
  { city: 'Riyadh',           country: 'Saudi Arabia',   tz: 'Asia/Riyadh' },
  { city: 'Tehran',           country: 'Iran',           tz: 'Asia/Tehran' },
  { city: 'Karachi',          country: 'Pakistan',       tz: 'Asia/Karachi' },
  { city: 'Mumbai',           country: 'India',          tz: 'Asia/Kolkata' },
  { city: 'New Delhi',        country: 'India',          tz: 'Asia/Kolkata' },
  { city: 'Kolkata',          country: 'India',          tz: 'Asia/Kolkata' },
  { city: 'Colombo',          country: 'Sri Lanka',      tz: 'Asia/Colombo' },
  { city: 'Dhaka',            country: 'Bangladesh',     tz: 'Asia/Dhaka' },
  { city: 'Kathmandu',        country: 'Nepal',          tz: 'Asia/Kathmandu' },
  { city: 'Yangon',           country: 'Myanmar',        tz: 'Asia/Rangoon' },
  { city: 'Bangkok',          country: 'Thailand',       tz: 'Asia/Bangkok' },
  { city: 'Jakarta',          country: 'Indonesia',      tz: 'Asia/Jakarta' },
  { city: 'Singapore',        country: 'Singapore',      tz: 'Asia/Singapore' },
  { city: 'Kuala Lumpur',     country: 'Malaysia',       tz: 'Asia/Kuala_Lumpur' },
  { city: 'Manila',           country: 'Philippines',    tz: 'Asia/Manila' },
  { city: 'Hong Kong',        country: 'China',          tz: 'Asia/Hong_Kong' },
  { city: 'Shanghai',         country: 'China',          tz: 'Asia/Shanghai' },
  { city: 'Beijing',          country: 'China',          tz: 'Asia/Shanghai' },
  { city: 'Taipei',           country: 'Taiwan',         tz: 'Asia/Taipei' },
  { city: 'Seoul',            country: 'South Korea',    tz: 'Asia/Seoul' },
  { city: 'Tokyo',            country: 'Japan',          tz: 'Asia/Tokyo' },
  { city: 'Osaka',            country: 'Japan',          tz: 'Asia/Tokyo' },
  { city: 'Sydney',           country: 'Australia',      tz: 'Australia/Sydney' },
  { city: 'Melbourne',        country: 'Australia',      tz: 'Australia/Melbourne' },
  { city: 'Brisbane',         country: 'Australia',      tz: 'Australia/Brisbane' },
  { city: 'Perth',            country: 'Australia',      tz: 'Australia/Perth' },
  { city: 'Auckland',         country: 'New Zealand',    tz: 'Pacific/Auckland' },
  { city: 'Honolulu',         country: 'United States',  tz: 'Pacific/Honolulu' },
  { city: 'Anchorage',        country: 'United States',  tz: 'America/Anchorage' },
  { city: 'Los Angeles',      country: 'United States',  tz: 'America/Los_Angeles' },
  { city: 'San Francisco',    country: 'United States',  tz: 'America/Los_Angeles' },
  { city: 'Seattle',          country: 'United States',  tz: 'America/Los_Angeles' },
  { city: 'Phoenix',          country: 'United States',  tz: 'America/Phoenix' },
  { city: 'Denver',           country: 'United States',  tz: 'America/Denver' },
  { city: 'Chicago',          country: 'United States',  tz: 'America/Chicago' },
  { city: 'Houston',          country: 'United States',  tz: 'America/Chicago' },
  { city: 'New York',         country: 'United States',  tz: 'America/New_York' },
  { city: 'Miami',            country: 'United States',  tz: 'America/New_York' },
  { city: 'Toronto',          country: 'Canada',         tz: 'America/Toronto' },
  { city: 'Vancouver',        country: 'Canada',         tz: 'America/Vancouver' },
  { city: 'Montreal',         country: 'Canada',         tz: 'America/Toronto' },
  { city: 'Mexico City',      country: 'Mexico',         tz: 'America/Mexico_City' },
  { city: 'Bogotá',           country: 'Colombia',       tz: 'America/Bogota' },
  { city: 'Lima',             country: 'Peru',           tz: 'America/Lima' },
  { city: 'Santiago',         country: 'Chile',          tz: 'America/Santiago' },
  { city: 'São Paulo',        country: 'Brazil',         tz: 'America/Sao_Paulo' },
  { city: 'Rio de Janeiro',   country: 'Brazil',         tz: 'America/Sao_Paulo' },
  { city: 'Buenos Aires',     country: 'Argentina',      tz: 'America/Argentina/Buenos_Aires' },
  { city: 'Caracas',          country: 'Venezuela',      tz: 'America/Caracas' },
  { city: 'Cairo',            country: 'Egypt',          tz: 'Africa/Cairo' },
  { city: 'Lagos',            country: 'Nigeria',        tz: 'Africa/Lagos' },
  { city: 'Nairobi',          country: 'Kenya',          tz: 'Africa/Nairobi' },
  { city: 'Johannesburg',     country: 'South Africa',   tz: 'Africa/Johannesburg' },
  { city: 'Casablanca',       country: 'Morocco',        tz: 'Africa/Casablanca' },
  { city: 'Accra',            country: 'Ghana',          tz: 'Africa/Accra' },
];

let selectedTz = null; // null = local

function getTzTime(tz) {
  const opts = { hour: '2-digit', minute: '2-digit', hour12: !is24hr };
  if (tz) opts.timeZone = tz;
  return new Intl.DateTimeFormat('en-GB', opts).format(new Date());
}

function renderTzList(filter = '') {
  const q = filter.toLowerCase();
  const list = document.getElementById('tz-list');
  list.innerHTML = '';
  TIMEZONES
    .filter(t => !q || t.city.toLowerCase().includes(q) || t.country.toLowerCase().includes(q))
    .forEach(t => {
      const li = document.createElement('li');
      li.className = 'tz-item' + (t.tz === selectedTz ? ' selected' : '');
      li.innerHTML = `
        <div class="tz-item-left">
          <span class="tz-city">${t.city}</span>
          <span class="tz-country">${t.country}</span>
        </div>
        <span class="tz-time">${getTzTime(t.tz)}</span>`;
      li.addEventListener('click', () => {
        selectedTz = t.tz;
        updateClock();
        const tzLabel = document.getElementById('tz-label');
        if (t.tz) {
          tzLabel.textContent = `${t.city} · ${t.country}`;
          tzLabel.classList.add('visible');
        } else {
          tzLabel.classList.remove('visible');
        }
        closeTzPanel();
      });
      list.appendChild(li);
    });
}

let tzListInterval = null;

function openTzPanel() {
  document.getElementById('tz-panel').classList.add('open');
  document.getElementById('tz-search').value = '';
  renderTzList();
  document.getElementById('tz-search').focus();
  tzListInterval = setInterval(() => renderTzList(document.getElementById('tz-search').value), 1000);
}

function closeTzPanel() {
  document.getElementById('tz-panel').classList.remove('open');
  clearInterval(tzListInterval);
}

document.getElementById('tz-toggle').addEventListener('click', e => {
  e.stopPropagation();
  document.getElementById('tz-panel').classList.contains('open') ? closeTzPanel() : openTzPanel();
});
document.getElementById('tz-close').addEventListener('click', closeTzPanel);
document.getElementById('tz-search').addEventListener('input', function () {
  renderTzList(this.value);
});
document.getElementById('tz-panel').addEventListener('click', function (e) {
  if (e.target === this) closeTzPanel();
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
const clockEl       = document.getElementById('clock-display');
const pomoPanel     = document.getElementById('pomo-panel');
const pomoTimeEl    = document.getElementById('pomo-time');
const pomoIndicator = document.getElementById('pomo-indicator');
const startBtn      = document.getElementById('pomo-start');
const pauseBtn      = document.getElementById('pomo-pause');
const fontDropdown  = document.getElementById('font-dropdown');
const paletteDrop   = document.getElementById('palette-dropdown');

// ── Clock ─────────────────────────────────────────────
function updateClock() {
  clockEl.textContent = getTzTime(selectedTz);
}

updateClock();
setInterval(updateClock, 1000);

// 12/24 toggle
document.getElementById('hr-toggle').addEventListener('click', function () {
  is24hr = !is24hr;
  this.textContent = is24hr ? '24h' : '12h';
  updateClock();
  if (document.getElementById('tz-panel').classList.contains('open')) {
    renderTzList(document.getElementById('tz-search').value);
  }
});

// ── Pomodoro ──────────────────────────────────────────
function formatPomo(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderPomo() {
  const formatted = formatPomo(remainSecs);
  pomoTimeEl.textContent = formatted;
  if (running && !pomoMode) {
    pomoIndicator.textContent = formatted;
    pomoIndicator.classList.add('visible');
  } else {
    pomoIndicator.classList.remove('visible');
  }
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
  pomoIndicator.classList.remove('visible');
}

function resetPomo() {
  pausePomo();
  remainSecs = totalSecs;
  renderPomo();
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Unlock the context on the first user interaction
document.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
}, { once: true });

function playFinishSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
  notes.forEach((freq, i) => {
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    const t = audioCtx.currentTime + i * 0.18;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.18, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
    osc.start(t);
    osc.stop(t + 1.8);
  });
}

function onPomoFinish() {
  startBtn.style.display = 'inline';
  pauseBtn.style.display = 'none';
  playFinishSound();
  // if user is on clock view, switch back to pomo to show the pulse
  if (!pomoMode) {
    clockEl.style.display = 'none';
    pomoPanel.classList.add('visible');
    pomoMode = true;
    document.getElementById('pomo-toggle').classList.add('active');
    document.body.classList.add('pomo-mode');
  }
  pomoTimeEl.classList.add('pulse');
  pomoTimeEl.addEventListener('animationend', () => pomoTimeEl.classList.remove('pulse'), { once: true });
  if (Notification.permission === 'granted') {
    new Notification('Clème.', { body: 'Timer complete. Take a breath.', silent: true });
  }
}

startBtn.addEventListener('click', startPomo);
pauseBtn.addEventListener('click', pausePomo);
document.getElementById('pomo-reset').addEventListener('click', resetPomo);
document.getElementById('pomo-cancel').addEventListener('click', () => {
  resetPomo();
  exitPomoView();
});

function setDuration(mins) {
  selectedMins = mins;
  totalSecs    = mins * 60;
  remainSecs   = totalSecs;
  pausePomo();
  renderPomo();
  document.getElementById('duration-slider').value = mins;
  document.getElementById('duration-label').textContent = `${mins} min`;
}

document.getElementById('duration-slider').addEventListener('input', function () {
  setDuration(parseInt(this.value));
});

function exitPomoView() {
  pomoMode = false;
  clockEl.style.display = '';
  pomoPanel.classList.remove('visible');
  document.getElementById('pomo-toggle').classList.remove('active');
  document.body.classList.remove('pomo-mode');
}

// Toggle pomo mode — never pauses the timer, just hides/shows the panel
document.getElementById('pomo-toggle').addEventListener('click', () => {
  if (!pomoMode) {
    pomoMode = true;
    clockEl.style.display = 'none';
    pomoPanel.classList.add('visible');
    document.getElementById('pomo-toggle').classList.add('active');
    document.body.classList.add('pomo-mode');
    if (Notification.permission === 'default') Notification.requestPermission();
  } else {
    exitPomoView();
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
