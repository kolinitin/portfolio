/**
 * Initialises scroll behavior for horizontal screen tracks.
 *
 * Ensures all cards remain 100% crisp, 100% opaque, and full scale without fading edge effects,
 * while maintaining dynamic edge peeking / gap calculation.
 *
 * @param {Element|Document} [container=document] - Root element to search within.
 */
export function initHorizontalScrollReveals(container = document) {
    const scrollTracks = container.querySelectorAll('.custom-horizontal-scroll');

    scrollTracks.forEach(track => {
        const cards = Array.from(track.querySelectorAll('.horizontal-screen-card'));
        if (cards.length === 0) return;

        /**
         * Calculates and applies the optimal dynamic gap between cards
         * to guarantee a clean peek cut on the right edge.
         */
        const updateDynamicGap = () => {
            if (cards.length < 2) return;

            const firstCard = cards[0];
            const cardWidth = firstCard.offsetWidth;
            if (cardWidth === 0) return;

            const trackWidth = track.clientWidth;
            if (trackWidth === 0) return;

            const computedStyle = window.getComputedStyle(track);
            const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
            const paddingRight = parseFloat(computedStyle.paddingRight) || 0;

            const availableWidth = trackWidth - paddingLeft - paddingRight;

            // Check if total content fits without any scrolling needed
            const totalNaturalWidth = cards.length * cardWidth;
            if (totalNaturalWidth <= availableWidth) {
                track.style.gap = window.innerWidth < 640 ? '24px' : '48px';
                return;
            }

            const isMobile = window.innerWidth < 640;
            const minGap = isMobile ? 16 : 40;
            const maxGap = isMobile ? 40 : 64;

            let bestGap = isMobile ? 24 : 56;
            let bestScore = -Infinity;

            for (let g = minGap; g <= maxGap; g += 2) {
                const pitch = cardWidth + g;
                const count = Math.floor(availableWidth / pitch);
                const cardStartX = count * pitch;

                const visibleAmount = availableWidth - cardStartX;
                const fraction = visibleAmount / cardWidth;

                let score = -1;
                if (fraction >= 0.2 && fraction <= 0.8) {
                    score = 1 - 2 * Math.abs(fraction - 0.5);
                } else if (fraction > 0 && fraction < 0.2) {
                    score = 0.3 * (fraction / 0.2);
                } else if (fraction > 0.8 && fraction < 1.0) {
                    score = 0.3 * ((1.0 - fraction) / 0.2);
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestGap = g;
                }
            }

            track.style.gap = `${bestGap}px`;
        };

        const updateCardStates = () => {
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'none';
            });
        };

        // Initial gap calculation & card state initialization
        updateDynamicGap();
        updateCardStates();

        // Observe resize events on the track container
        if (typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(() => {
                updateDynamicGap();
                updateCardStates();
            });
            resizeObserver.observe(track);
        }

        window.addEventListener('resize', () => {
            updateDynamicGap();
            updateCardStates();
        }, { passive: true });
    });
}
