(function () {
    'use strict';

    // === Hamburger Toggle ===
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    function toggleSidebar(open) {
        const shouldOpen = open !== undefined ? open : !sidebar.classList.contains('open');
        sidebar.classList.toggle('open', shouldOpen);
        hamburger.classList.toggle('active', shouldOpen);
        overlay.classList.toggle('visible', shouldOpen);
        document.body.style.overflow = shouldOpen ? 'hidden' : '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            toggleSidebar();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function () {
            toggleSidebar(false);
        });
    }

    // Close sidebar on nav link click (mobile)
    document.querySelectorAll('[data-close-sidebar]').forEach(function (link) {
        link.addEventListener('click', function () {
            toggleSidebar(false);
        });
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleSidebar(false);
        }
    });

    // === 3D Tilt Effect on Project Cards ===
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform =
                'perspective(1200px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

            // Shine follow
            const shine = card.querySelector('.card-shine');
            if (shine) {
                const pctX = (x / rect.width) * 100;
                const pctY = (y / rect.height) * 100;
                shine.style.setProperty('--shine-x', pctX + '%');
                shine.style.setProperty('--shine-y', pctY + '%');
            }
        });

        card.addEventListener('click', function (e) {
            // Don't navigate if user clicked the anchor itself (let default happen)
            if (e.target.closest('a')) return;
            var link = card.querySelector('a');
            if (link) window.open(link.href, link.target || '_self');
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';

            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.setProperty('--shine-x', '50%');
                shine.style.setProperty('--shine-y', '50%');
            }
        });
    });

    // === Light Refraction Effect on Contact Items ===
    document.querySelectorAll('[data-refract]').forEach(function (item) {
        item.addEventListener('mousemove', function (e) {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            item.style.setProperty('--refract-x', x + '%');
            item.style.setProperty('--refract-y', y + '%');
        });
    });

    // === Smooth Reveal on Scroll ===
    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }

    var observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    document.querySelectorAll('section:not(#home)').forEach(function (section) {
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
    });

    console.log('Portfolio glassmorphism effects loaded.');

})();
