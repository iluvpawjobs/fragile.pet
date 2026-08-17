const preview = document.getElementById('preview');
const profile = document.getElementById('profileArea');
const audio = document.getElementById('audioPlayer');

if (preview && profile) {
  preview.addEventListener('click', () => {
    preview.classList.add('hidden');
    profile.classList.remove('hidden');
    if (audio) audio.play().catch(() => {});
  });
}
