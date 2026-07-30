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

                // Threshold zones for reveal (first 12% and last 12% of track width)
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
        window.addEventListener('resize', onScroll, { passive: true });

        // Initial trigger
        updateCardStates();
    });
}
