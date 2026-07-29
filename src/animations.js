import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Attaches GSAP scroll-reveal animations to all elements matching `.gsap-reveal`
 * within an optional container (defaults to the full document).
 *
 * @param {Element|Document} [container=document] - Root to query within.
 */
export function initAnimations(container = document) {
    const elements = container.querySelectorAll('.gsap-reveal');

    elements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 95%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 16,
            duration: 0.6,
            ease: 'power2.out',
        });
    });
}

export { ScrollTrigger };
