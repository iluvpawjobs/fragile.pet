const discordUserId = '1146490692567322694';
const lastSeen = document.getElementById('lastSeen');
const discordStatus = document.getElementById('discordStatus');
const enterScreen = document.getElementById('enterScreen');
const backgroundVideo = document.getElementById('backgroundVideo');

enterScreen.addEventListener('click', () => {
    document.body.classList.add('entered');
    enterScreen.remove();
    backgroundVideo.play().catch(() => {});
});

const statusNames = {
    online: 'online',
    idle: 'idle',
    dnd: 'do not disturb',
    offline: 'offline'
};

fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`)
    .then(response => {
        if (!response.ok) throw new Error('discord status request failed');
        return response.json();
    })
    .then(({ success, data }) => {
        if (!success || !data) return;
        const state = data.discord_status || 'offline';
        discordStatus.textContent = statusNames[state] || state;
        lastSeen.textContent = state === 'offline' ? 'last seen recently' : 'active on discord';
    })
    .catch(() => {});
