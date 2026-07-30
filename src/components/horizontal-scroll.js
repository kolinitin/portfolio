/**
 * Initialises subtle scroll-driven reveal animations for horizontal screen tracks.
 *
 * Cards entering or leaving the viewport from the left or right edges
 * smoothly transition between ~0.5 opacity (0.94 scale) and 1.0 opacity (1.0 scale).
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
         * (ranging between gap-10 / 40px and gap-16 / 64px on sm+ viewports)
         * to guarantee a false cut / card peek on the right edge.
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

            // Min & Max gap bounds as requested (gap-10: 40px, gap-16: 64px on desktop)
            const isMobile = window.innerWidth < 640;
            const minGap = isMobile ? 16 : 40; // 16px (gap-4) or 40px (gap-10)
            const maxGap = isMobile ? 40 : 64; // 40px (gap-10) or 64px (gap-16)

            let bestGap = isMobile ? 24 : 56;
            let bestScore = -Infinity;

            for (let g = minGap; g <= maxGap; g += 2) {
                const pitch = cardWidth + g;
                const count = Math.floor(availableWidth / pitch);
                const cardStartX = count * pitch;

                // Amount of the next card peeking into the right side of available width
                const visibleAmount = availableWidth - cardStartX;
                const fraction = visibleAmount / cardWidth;

                let score = -1;
                if (fraction >= 0.2 && fraction <= 0.8) {
                    // Ideal cut is ~30% to 70% visible (centered around 50% peek)
                    score = 1 - 2 * Math.abs(fraction - 0.5);
                } else if (fraction > 0 && fraction < 0.2) {
                    // Slightly visible peek is acceptable but less ideal
                    score = 0.3 * (fraction / 0.2);
                } else if (fraction > 0.8 && fraction < 1.0) {
                    // Mostly full card (near flush) has lower score
                    score = 0.3 * ((1.0 - fraction) / 0.2);
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestGap = g;
                }
            }

            track.style.gap = `${bestGap}px`;
        };

        // Initial gap calculation
        updateDynamicGap();

        // Observe resize events on the track container
        if (typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(() => {
                updateDynamicGap();
                updateCardStates();
            });
            resizeObserver.observe(track);
        }

        let ticking = false;

        const updateCardStates = () => {
            const trackRect = track.getBoundingClientRect();
            const trackWidth = trackRect.width;

            if (trackWidth === 0) return;

            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardWidth = cardRect.width;

                // Position relative to track container
                const leftRelative = cardRect.left - trackRect.left;
                const rightRelative = cardRect.right - trackRect.left;

                // Threshold zones for reveal (first 15% and last 15% of track width)
                const fadeZone = Math.min(100, trackWidth * 0.15);

                let opacity = 1;
                let scale = 1;

                if (leftRelative < fadeZone) {
                    // Entering/exiting left edge
                    const progress = Math.max(0, rightRelative / (fadeZone + cardWidth * 0.5));
                    const clampedProgress = Math.min(1, progress);
                    opacity = 0.5 + 0.5 * clampedProgress;
                    scale = 0.94 + 0.06 * clampedProgress;
                } else if (rightRelative > trackWidth - fadeZone) {
                    // Entering/exiting right edge
                    const remaining = trackWidth - leftRelative;
                    const progress = Math.max(0, remaining / (fadeZone + cardWidth * 0.5));
                    const clampedProgress = Math.min(1, progress);
                    opacity = 0.5 + 0.5 * clampedProgress;
                    scale = 0.94 + 0.06 * clampedProgress;
                }

                card.style.opacity = opacity.toFixed(3);
                card.style.transform = `scale(${scale.toFixed(3)})`;
            });

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateCardStates);
                ticking = true;
            }
        };

        track.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', () => {
            updateDynamicGap();
            onScroll();
        }, { passive: true });

        // Initial trigger
        updateCardStates();
    });
}
