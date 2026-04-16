document.addEventListener('DOMContentLoaded', () => {

    // FAQ
    const items = document.querySelectorAll('.faq-entry');

    items.forEach(item => {
        const btn = item.querySelector('.faq-header');
        const wrapper = item.querySelector('.faq-answer-wrapper');

        if (!btn || !wrapper) return;

        wrapper.style.maxHeight = '0px';

        btn.addEventListener('click', () => {

            const isActive = item.classList.contains('active');

            items.forEach(i => {
                const w = i.querySelector('.faq-answer-wrapper');
                if (!w) return;

                w.style.maxHeight = w.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    w.style.maxHeight = '0px';
                });

                i.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
                i.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');

                wrapper.style.maxHeight = '0px';

                requestAnimationFrame(() => {
                    wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
                });
            }
        });
    });

    // Логотип — скролл вверх
    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Burger menu
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobile-nav');

    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            const isOpen = burger.classList.toggle('is-open');
            mobileNav.classList.toggle('is-open', isOpen);
            burger.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu on nav link click
        mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('is-open');
                mobileNav.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
    }

});
