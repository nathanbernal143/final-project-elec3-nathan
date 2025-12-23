const parts = {
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    milliseconds: document.getElementById('milliseconds'),
};

const controls = {
    toggle: document.querySelector('[data-action="toggle"]'),
    reset: document.querySelector('[data-action="reset"]'),
    toggleLabel: document.getElementById('toggleLabel'),
};

const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

let elapsedMs = 0;
let isRunning = false;
let lastTick = null;
let rafId = null;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const hundredths = Math.floor((ms % 1000) / 10);

    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        hundredths: String(hundredths).padStart(2, '0'),
        label: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`,
    };
}

function renderTime(ms = elapsedMs) {
    const time = formatTime(ms);
    parts.hours.textContent = time.hours;
    parts.minutes.textContent = time.minutes;
    parts.seconds.textContent = time.seconds;
    parts.milliseconds.textContent = time.hundredths;
}

function renderStatus(state) {
    statusText.textContent = state;
    statusDot.style.opacity = state === 'Idle' ? 0.35 : 1;
    statusDot.style.background = state === 'Running' ? '#65f6c4' : '#f6d165';
}

function tick(timestamp) {
    if (!isRunning) return;
    if (lastTick === null) lastTick = timestamp;
    const delta = timestamp - lastTick;
    lastTick = timestamp;
    elapsedMs += delta;
    renderTime();
    rafId = requestAnimationFrame(tick);
}

function toggleRun() {
    if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(rafId);
        controls.toggleLabel.textContent = 'Resume';
        controls.toggle.classList.remove('active');
        controls.reset.disabled = false;
        renderStatus('Paused');
        return;
    }

    isRunning = true;
    controls.toggleLabel.textContent = 'Stop';
    controls.toggle.classList.add('active');
    controls.reset.disabled = true;
    renderStatus('Running');
    lastTick = null;
    rafId = requestAnimationFrame(tick);
}

function resetTimer() {
    isRunning = false;
    cancelAnimationFrame(rafId);
    elapsedMs = 0;
    lastTick = null;
    controls.toggleLabel.textContent = 'Start';
    controls.toggle.classList.remove('active');
    controls.reset.disabled = false;
    renderStatus('Idle');
    renderTime();
}

function handleClick(event) {
    const action = event.target.dataset.action;
    if (!action) return;
    if (action === 'toggle') toggleRun();
    if (action === 'reset') resetTimer();
}

function handleKeyboard(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        toggleRun();
    } else if (event.key === 'r' || event.key === 'R') {
        resetTimer();
    }
}

document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyboard);

renderStatus('Idle');
renderTime();
