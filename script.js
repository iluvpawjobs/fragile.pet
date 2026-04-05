const audioPlayer = document.getElementById('audioPlayer');
const progressSlider = document.getElementById('progressSlider');
const progressBar = document.getElementById('progressBar');
const previewOverlay = document.getElementById('preview');
const cursor = document.getElementById('cursorDot');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

let rot = 0;

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

playBtn.addEventListener('click', () => {
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

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
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

function rotateCursor() {
    rot += 0.5;
    const svg = cursor.querySelector('svg');
    if (svg) svg.style.transform = `rotate(${rot}deg)`;
    requestAnimationFrame(rotateCursor);
}
rotateCursor();

document.querySelectorAll('a, button, .progress-slider, .progress-container').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.querySelector('svg').style.transform = `scale(1.4) rotate(${rot}deg)`;
    });
    el.addEventListener('mouseleave', () => {
        cursor.querySelector('svg').style.transform = `rotate(${rot}deg)`;
    });
});

document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

const videos = ['0001-0240.mp4', '0002-0240.mp4', '0003-0240.mp4', '0004-0240.mp4', '0005-0240.mp4', '0006-0240.mp4'];
const video = document.getElementById('bgVideo');
const source = document.createElement('source');

source.src = videos[Math.floor(Math.random() * videos.length)];
source.type = 'video/mp4';
video.appendChild(source);

video.play().catch(() => {
    document.addEventListener('click', () => video.play());
    document.addEventListener('touchstart', () => video.play());
});
