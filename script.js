document.addEventListener('DOMContentLoaded', () => {

    const stage           = document.getElementById('stage');
    const introVideo      = document.getElementById('myVideo');
    const hamburger       = document.getElementById('hamburger');
    const mobileMenu      = document.getElementById('mobileMenu');
    const mobileOverlay   = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');


    /* ----------------------------------------------------------------
       1. VIDEO-INTRO
       Spielt das Intro-Video ab. Nach Ende (oder Fehler) → Header-Modus.
       ---------------------------------------------------------------- */
    if (introVideo) {
        introVideo.muted = true;

        introVideo.addEventListener('ended', handleVideoEnd);
        introVideo.addEventListener('error', handleVideoEnd); // Wichtig für Firefox

        introVideo.play().catch(() => {
            console.warn('Autoplay blockiert — überspringe Intro.');
            handleVideoEnd();
        });
    }

    function handleVideoEnd() {
        if (stage.classList.contains('header-mode')) return;
        stage.classList.add('header-mode');

        const videoPart = document.getElementById('videoPart');
        if (videoPart) videoPart.style.opacity = '0';

        // Skill-Balken animieren, sobald der Header sichtbar ist
        animateSkillBars();
    }


    /* ----------------------------------------------------------------
       2. NAVIGATION (Smooth Scroll zu Sektion)
       ---------------------------------------------------------------- */
    window.showSection = (sectionName) => {
        const target = document.getElementById('section-' + sectionName);
        if (!target) return;

        const headerOffset    = 88;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
    };


    /* ----------------------------------------------------------------
       3. SCROLL-SPY
       Hebt den aktiven Nav-Button hervor, je nach sichtbarer Sektion.
       ---------------------------------------------------------------- */
    const sections   = document.querySelectorAll('.section-panel');
    const navButtons = document.querySelectorAll('.nav-btn');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const sectionId = entry.target.id.replace('section-', '');
            navButtons.forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
            if (activeBtn) activeBtn.classList.add('active');
        });
    }, { root: null, rootMargin: '-20% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));


    /* ----------------------------------------------------------------
       4. PROFILBILD → zurück zum Start (Reload)
       ---------------------------------------------------------------- */
    const profPic = document.getElementById('profilePic');
    if (profPic) {
        profPic.addEventListener('click', () => window.location.reload());
    }


    /* ----------------------------------------------------------------
       5. HAMBURGER-MENÜ (Mobile Seitenleiste)
       ---------------------------------------------------------------- */
    function openMobileMenu() {
        mobileMenu.classList.add('is-open');
        mobileOverlay.style.display = 'block';
        // Kleiner Delay damit display:block greift, bevor opacity-Transition läuft
        requestAnimationFrame(() => mobileOverlay.classList.add('is-open'));
        hamburger.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Hintergrund-Scroll sperren
    }

    window.closeMobileMenu = function () {
        mobileMenu.classList.remove('is-open');
        mobileOverlay.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // Display erst nach Transition zurücksetzen
        mobileOverlay.addEventListener('transitionend', () => {
            if (!mobileOverlay.classList.contains('is-open')) {
                mobileOverlay.style.display = 'none';
            }
        }, { once: true });
    };

    if (hamburger)       hamburger.addEventListener('click', openMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
    if (mobileOverlay)   mobileOverlay.addEventListener('click', closeMobileMenu);

    // ESC-Taste schließt das Menü
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        }
    });


    /* ----------------------------------------------------------------
       6. SKILL-BALKEN ANIMATION
       Liest data-level (0–100) und setzt die CSS-Breite.
       Wird nach Video-Ende aufgerufen (und beim Scroll in die Sektion).
       ---------------------------------------------------------------- */
    function animateSkillBars() {
        const bars = document.querySelectorAll('.skill-bar-fill');
        bars.forEach(bar => {
            const level = bar.getAttribute('data-level') || '0';
            bar.style.width = level + '%';
        });
    }

    // Auch animieren, wenn die Skills-Sektion in den Sichtbereich scrollt
    const skillsSection = document.getElementById('section-skills');
    if (skillsSection) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) animateSkillBars();
            });
        }, { threshold: 0.1 });
        skillObserver.observe(skillsSection);
    }

});
