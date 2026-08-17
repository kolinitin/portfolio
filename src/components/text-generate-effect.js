import { gsap } from 'gsap';

/**
 * Applies Aceternity UI's Text Generate Effect to target element(s).
 * Splits text into individual words and animates them sequentially from opacity 0 + blur(10px)
 * to opacity 1 + blur(0px).
 *
 * @param {string|Element|NodeList} target - Selector string or DOM element(s).
 * @param {Object} [options] - Configuration options.
 * @param {number} [options.duration=0.5] - Duration of each word's animation in seconds.
 * @param {number} [options.stagger=0.08] - Delay between words in seconds.
 * @param {number} [options.blur=10] - Initial blur in pixels.
 * @param {number} [options.delay=0.15] - Delay before starting the animation in seconds.
 * @param {string} [options.ease='power2.out'] - Easing function for GSAP.
 * @param {Function} [options.onComplete] - Callback function when animation finishes.
 */
export function initTextGenerateEffect(target, options = {}) {
    const elements = typeof target === 'string'
        ? document.querySelectorAll(target)
        : (target instanceof NodeList || Array.isArray(target) ? target : [target]);

    const {
        duration = 0.5,
        stagger = 0.08,
        blur = 10,
        delay = 0.15,
        ease = 'power2.out',
        onComplete,
    } = options;

    elements.forEach((el) => {
        if (!el || el.dataset.textGenerateInitialized === 'true') return;
        el.dataset.textGenerateInitialized = 'true';

        const originalText = el.textContent.trim();
        if (!originalText) return;

        // Split text by whitespace while preserving punctuation
        const words = originalText.split(/\s+/);

        // Build word elements with initial blur and opacity 0
        el.innerHTML = words
            .map((word) => `<span class="text-generate-word inline-block opacity-0" style="filter: blur(${blur}px); will-change: opacity, filter;">${word}</span>`)
            .join(' ');

        const wordSpans = el.querySelectorAll('.text-generate-word');

        // Animate each word in sequence (Aceternity UI effect)
        gsap.to(wordSpans, {
            opacity: 1,
            filter: 'blur(0px)',
            duration,
            stagger,
            delay,
            ease,
            onComplete: () => {
                // Remove will-change and inline filters for crisp font rendering after completion
                wordSpans.forEach((span) => {
                    span.style.willChange = 'auto';
                    span.style.filter = 'none';
                });
                if (typeof onComplete === 'function') {
                    onComplete();
                }
            },
        });
    });
}
