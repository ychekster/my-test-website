document.addEventListener('DOMContentLoaded', () => {

    /* =====================
       FAQ ACCORDION
       ===================== */

    const faqItems = document.querySelectorAll('.faq-block');

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-toggle');
        const wrapper = item.querySelector('.faq-answer-wrapper');

        if (!btn || !wrapper) return;

        wrapper.style.maxHeight = '0px';

        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => {
                const w = i.querySelector('.faq-answer-wrapper');
                if (!w) return;
                w.style.maxHeight = w.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    w.style.maxHeight = '0px';
                });
                i.classList.remove('active');
            });

            // Open clicked if it was closed
            if (!isActive) {
                item.classList.add('active');
                wrapper.style.maxHeight = '0px';
                requestAnimationFrame(() => {
                    wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
                });
            }
        });
    });


    /* =====================
       BURGER / MOBILE MENU
       ===================== */

    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('mobile-overlay');
    document.body.appendChild(overlay);

    function openMenu() {
        burgerBtn.classList.add('active');
        mobileMenu.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        burgerBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    burgerBtn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked
    document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    /* =====================
       SMOOTH ANCHOR NAVIGATION
       (accounts for sticky header height)
       ===================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        });
    });


    /* =====================
       SCROLL REVEAL
       ===================== */

    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
