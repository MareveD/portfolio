/* ------------------------------------------------------------------------------ */

/* Accueil : Header */

document.addEventListener('DOMContentLoaded', () => {
    const shape1 = document.getElementById('shape1');
    const shape2 = document.getElementById('shape2');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        let calculScroll = scrollTop - lastScrollTop;

        if (calculScroll !== 0) {
            let rotation1 = parseFloat(getComputedStyle(shape1).getPropertyValue('--rotation') || 0);
            let rotation2 = parseFloat(getComputedStyle(shape2).getPropertyValue('--rotation') || 0);

            shape1.style.setProperty('--rotation', rotation1 + calculScroll * 0.1);
            shape2.style.setProperty('--rotation', rotation2 - calculScroll * 0.1);

            shape1.style.transform = `rotate(${rotation1 + calculScroll * 0.1}deg)`;
            shape2.style.transform = `rotate(${rotation2 - calculScroll * 0.1}deg)`;

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }
    });
});

/* ------------------------------------------------------------------------------ */

/* Accueil : Experience */

document.addEventListener('DOMContentLoaded', () => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: Array.from(Array(101).keys(), x => x * 0.01)
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const borderRight = entry.target.querySelector('.border-right');
            const borderLeft = entry.target.querySelector('.border-left');

            if (entry.isIntersecting) {
                const scrollRatio = entry.intersectionRatio;

                if (borderRight) {
                    borderRight.style.transform = `scaleX(${scrollRatio})`;
                }

                if (borderLeft) {
                    borderLeft.style.transform = `scaleX(${scrollRatio})`;
                }

                if (entry.target.classList.contains('blocks')) {
                    entry.target.classList.add('blocks-active');
                    const blocks = entry.target.querySelectorAll('.block');
                    blocks.forEach((block, index) => {
                        setTimeout(() => {
                            block.classList.add('block-active');
                        }, index * 300);
                    });
                }
            } else {
                if (borderRight) {
                    borderRight.style.transform = 'scaleX(0)';
                }

                if (borderLeft) {
                    borderLeft.style.transform = 'scaleX(0)';
                }

                if (entry.target.classList.contains('blocks')) {
                    entry.target.classList.remove('blocks-active');
                    const blocks = entry.target.querySelectorAll('.block');
                    blocks.forEach((block) => {
                        block.classList.remove('block-active');
                    });
                }
            }
        });
    }, options);

    const targets = document.querySelectorAll('.home-experience, .blocks, .border-right, .border-left');
    targets.forEach(target => {
        observer.observe(target);
    });
});