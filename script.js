document.addEventListener('DOMContentLoaded', () => {
    const stage = document.getElementById('stage');
    const introVideo = document.getElementById('myVideo');
    const mainContent = document.getElementById('mainContent');
    const muteBtn = document.getElementById('muteToggle');
    const navBtns = document.querySelectorAll('.nav-btn');

    // Autoplay starten
    introVideo.muted = true;
    introVideo.play().catch(e => console.log("Autoplay blockiert", e));

    // Funktion für das Ende des Videos
    function handleVideoEnd() {
        if (stage.classList.contains('header-mode')) return;

        stage.classList.add('header-mode');
        document.getElementById('videoPart').style.opacity = '0';
        
        // Sprung zum Main Content
        requestAnimationFrame(() => {
            const target = mainContent.offsetTop;
            window.scrollTo({ top: target, behavior: 'smooth' });
        });
    }

    // Event Listener für Video-Ende
    introVideo.addEventListener('ended', handleVideoEnd);

    // Fallback für Safari/Mobile
    introVideo.addEventListener('timeupdate', function checkEnd() {
        if (introVideo.duration && introVideo.currentTime >= introVideo.duration - 0.5) {
            handleVideoEnd();
            introVideo.removeEventListener('timeupdate', checkEnd);
        }
    });

    // Profilbild-Klick (Zurück zum Start)
    document.getElementById('profilePic').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        stage.classList.remove('header-mode');
        document.getElementById('videoPart').style.opacity = '1';
    });

    // Ton-Toggle
    muteBtn.addEventListener('click', () => {
        introVideo.muted = !introVideo.muted;
        muteBtn.textContent = introVideo.muted ? 'Ton einschalten' : 'Ton ausschalten';
    });

    // Sektions-Navigation
    window.showSection = (sectionName) => {
        document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
        navBtns.forEach(b => b.classList.remove('active'));

        const target = document.getElementById('section-' + sectionName);
        if (target) target.classList.add('active');

        const btn = document.querySelector(`[data-section="${sectionName}"]`);
        if (btn) btn.classList.add('active');

        window.scrollTo({ top: mainContent.offsetTop - 80, behavior: 'smooth' });
    };
});