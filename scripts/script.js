document.addEventListener('DOMContentLoaded', () => {

    const items = document.querySelectorAll('.faq-block');

    items.forEach(item => {
        const btn = item.querySelector('.faq-toggle');
        const wrapper = item.querySelector('.faq-answer-wrapper');

        if (!btn || !wrapper) return;

        // начальное состояние
        wrapper.style.maxHeight = '0px';

        btn.addEventListener('click', () => {

            const isActive = item.classList.contains('active');

            // ЗАКРЫВАЕМ ВСЕ (анимацией)
            items.forEach(i => {
                const w = i.querySelector('.faq-answer-wrapper');
                if (!w) return;

                w.style.maxHeight = w.scrollHeight + 'px'; // фиксируем текущую высоту
                requestAnimationFrame(() => {
                    w.style.maxHeight = '0px'; // анимируем вверх
                });

                i.classList.remove('active');
            });

            // ОТКРЫВАЕМ текущий
            if (!isActive) {
                item.classList.add('active');

                // сначала 0 → потом реальная высота
                wrapper.style.maxHeight = '0px';

                requestAnimationFrame(() => {
                    wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
                });
            }
        });
    });

});
