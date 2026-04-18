const previewOverlay = document.getElementById('preview');
const cursor = document.getElementById('cursorDot');
const audioPlayer = document.getElementById('audioPlayer');

let rot = 0;

previewOverlay.addEventListener('click', () => {
    previewOverlay.classList.add('hidden');
    audioPlayer.play();
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

document.querySelectorAll('a').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.querySelector('svg').style.transform = `scale(1.4) rotate(${rot}deg)`;
    });
    el.addEventListener('mouseleave', () => {
        cursor.querySelector('svg').style.transform = `rotate(${rot}deg)`;
    });
});

document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));