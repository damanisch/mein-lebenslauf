document.addEventListener('DOMContentLoaded', () => {
    const stage = document.getElementById('stage');
    const introVideo = document.getElementById('myVideo');

    // --- 1. SICHERHEIT: Video-Logik ---
    if (introVideo) {
        introVideo.muted = true;
        
        // Video-Events
        introVideo.addEventListener('ended', handleVideoEnd);
        introVideo.addEventListener('error', handleVideoEnd); // Wichtig für Firefox
        
        introVideo.play().catch(err => {
            console.warn("Autoplay blockiert, überspringe Intro.");
            handleVideoEnd();
        });
    }

    // --- 2. ZENTRALE LOGIK ---
    function handleVideoEnd() {
        if (stage.classList.contains('header-mode')) return;
        stage.classList.add('header-mode');
        const videoPart = document.getElementById('videoPart');
        if (videoPart) videoPart.style.opacity = '0';
    }

    // --- 3. NAVIGATION (ONEPAGER) ---
    window.showSection = (sectionName) => {
        const target = document.getElementById('section-' + sectionName);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
        }
    };

    // --- 4. SCROLL-SPY ---
    const sections = document.querySelectorAll('.section-panel');
    const navButtons = document.querySelectorAll('.nav-btn');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id').replace('section-', '');
                navButtons.forEach(btn => btn.classList.remove('active'));
                const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
                if (activeBtn) activeBtn.classList.add('active');
            }
        });
    }, { root: null, rootMargin: "-20% 0px -50% 0px", threshold: 0 });

    sections.forEach(section => observer.observe(section));

   const profPic = document.getElementById('profilePic');
if (profPic) {
    profPic.addEventListener('click', () => {
        window.location.reload();
    });
}

});