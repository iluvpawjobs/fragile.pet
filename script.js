const audioPlayer = document.getElementById('audioPlayer');
const progressSlider = document.getElementById('progressSlider');
const progressBar = document.getElementById('progressBar');
const previewOverlay = document.getElementById('preview');

previewOverlay.addEventListener('click', () => {
    previewOverlay.classList.add('hidden');
    audioPlayer.play();
});

audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + '%';
    progressSlider.value = progress;
});

progressSlider.addEventListener('input', (e) => {
    audioPlayer.currentTime = (e.target.value / 100) * audioPlayer.duration;
});

const cursor = document.getElementById('cursorDot');
let x = 0, y = 0, rot = 0;

document.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    document.body.appendChild(dot);
    
    requestAnimationFrame(() => {
        dot.style.opacity = '0.6';
        dot.style.width = '5px';
        dot.style.height = '5px';
    });
    
    setTimeout(() => {
        dot.style.opacity = '0';
        setTimeout(() => dot.remove(), 200);
    }, 80);
});

function spin() {
    rot += 0.5;
    const svg = cursor.querySelector('svg');
    if (svg) svg.style.transform = `rotate(${rot}deg)`;
    requestAnimationFrame(spin);
}
spin();

document.querySelectorAll('a, button, .progress-slider, .progress-container').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const svg = cursor.querySelector('svg');
        svg.style.transform = `scale(1.4) rotate(${rot}deg)`;
    });
    el.addEventListener('mouseleave', () => {
        const svg = cursor.querySelector('svg');
        svg.style.transform = `rotate(${rot}deg)`;
    });
});

document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

const playBtn2 = document.getElementById('playBtn2');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

playBtn2.addEventListener('click', () => {
    audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
});

audioPlayer.addEventListener('play', () => {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
});

audioPlayer.addEventListener('pause', () => {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
});

