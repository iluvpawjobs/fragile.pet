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

