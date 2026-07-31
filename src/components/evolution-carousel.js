/**
 * Evolution Carousel — Horizontal gesture-driven UI iteration viewer.
 *
 * Provides horizontal drag, swipe, trackpad deltaX, and arrow/dot controls,
 * while allowing natural vertical page scrolling through the section.
 */

export function initEvolutionCarousels(container = document) {
    const containers = container.querySelectorAll('.evolution-container');
    if (!containers.length) return;

    containers.forEach(el => {
        setupCarouselInstance(el);
    });
}

function setupCarouselInstance(container) {
    const cards = Array.from(container.querySelectorAll('.evolution-card'));
    const dots = Array.from(container.querySelectorAll('.evolution-dot'));
    const prevBtn = container.querySelector('.evolution-prev-btn');
    const nextBtn = container.querySelector('.evolution-next-btn');

    if (!cards.length) return;

    const numItems = cards.length;
    let targetIndex = 0;
    let currentIndex = 0;
    let animFrameId = null;
    let isVisible = false;

    // Drag state
    let isDragging = false;
    let startX = 0;
    let startIndex = 0;
    let wheelSnapTimeout = null;
    let lastActiveIndex = -1;

    function updateCardPositions() {
        const viewportWidth = window.innerWidth;
        const cardWidth = cards[0]?.offsetWidth || 300;
        const spacing = viewportWidth < 640 ? cardWidth * 1.05 : cardWidth * 1.15;

        cards.forEach((card, i) => {
            const dist = i - currentIndex;
            const absDist = Math.abs(dist);

            // Position & scale math
            const translateX = dist * spacing;
            const scale = Math.max(0.65, 1 - absDist * 0.16);
            const opacity = Math.max(0, 1 - absDist * 0.55);
            const zIndex = Math.round(30 - absDist * 5);

            card.style.transform = `translate3d(${translateX.toFixed(2)}px, 0, 0) scale(${scale.toFixed(4)})`;
            card.style.opacity = opacity.toFixed(4);
            card.style.zIndex = zIndex;
        });

        // Update step dots
        const roundedIndex = Math.round(currentIndex);
        dots.forEach((dot, i) => {
            if (i === roundedIndex) {
                dot.classList.add('bg-amber-400', 'w-5', 'scale-110');
                dot.classList.remove('bg-white/20', 'w-2.5');
            } else {
                dot.classList.remove('bg-amber-400', 'w-5', 'scale-110');
                dot.classList.add('bg-white/20', 'w-2.5');
            }
        });

        // Update prev/next button states
        if (prevBtn) prevBtn.disabled = roundedIndex <= 0;
        if (nextBtn) nextBtn.disabled = roundedIndex >= numItems - 1;

        // Manage video focus when active card index changes
        if (roundedIndex !== lastActiveIndex) {
            lastActiveIndex = roundedIndex;
            updateVideoFocus(roundedIndex);
        }
    }

    // Manage video play/pause/reset based on card focus state
    function updateVideoFocus(activeIndex) {
        cards.forEach((card, i) => {
            const video = card.querySelector('video');
            if (!video) return;

            if (i === activeIndex && isVisible) {
                // Focused card: play if paused
                if (video.paused) {
                    video.play().catch(() => { });
                }
            } else {
                // Non-focused card: pause and reset to start
                if (!video.paused || video.currentTime > 0) {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }

    function tick() {
        if (!isVisible) return;

        // Smooth Damped Interpolation (Lerp)
        currentIndex += (targetIndex - currentIndex) * 0.12;

        if (Math.abs(targetIndex - currentIndex) < 0.0005) {
            currentIndex = targetIndex;
        }

        updateCardPositions();

        animFrameId = requestAnimationFrame(tick);
    }

    // IntersectionObserver to start/pause rAF loop when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (isVisible) {
                if (!animFrameId) {
                    animFrameId = requestAnimationFrame(tick);
                }
                updateVideoFocus(Math.round(currentIndex));
            } else {
                if (animFrameId) {
                    cancelAnimationFrame(animFrameId);
                    animFrameId = null;
                }
                updateVideoFocus(-1); // Pause & reset all videos when off-screen
            }
        });
    }, { threshold: 0.05 });

    observer.observe(container);

    // --- Drag & Swipe Handlers ---
    function onPointerDown(e) {
        if (e.target.closest('button, .custom-video-controls, .video-seek-track')) return; // Ignore button and video control clicks
        isDragging = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        startIndex = targetIndex;
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const deltaX = currentX - startX;
        const cardWidth = cards[0]?.offsetWidth || 300;
        const dragDistancePerCard = cardWidth * 0.9;

        const indexShift = -deltaX / dragDistancePerCard;
        targetIndex = Math.max(0, Math.min(numItems - 1, startIndex + indexShift));
    }

    function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        // Snap to nearest card on release
        targetIndex = Math.round(targetIndex);
    }

    // Mouse events
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Touch events
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // --- Trackpad / Mouse Wheel Horizontal Delta Handler ---
    container.addEventListener('wheel', (e) => {
        const absX = Math.abs(e.deltaX);
        const absY = Math.abs(e.deltaY);

        // Require intentional horizontal scroll threshold (> 12px) to prevent trackpad vertical drift hijacking
        if ((absX > 12 && absX > absY * 1.5) || (e.shiftKey && absY > 12)) {
            e.preventDefault();
            const delta = e.shiftKey ? e.deltaY : e.deltaX;
            targetIndex = Math.max(0, Math.min(numItems - 1, targetIndex + delta * 0.0025));

            clearTimeout(wheelSnapTimeout);
            wheelSnapTimeout = setTimeout(() => {
                targetIndex = Math.round(targetIndex);
            }, 150);
        }
    }, { passive: false });

    // --- Button Navigation ---
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            targetIndex = Math.max(0, Math.round(targetIndex) - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            targetIndex = Math.min(numItems - 1, Math.round(targetIndex) + 1);
        });
    }

    // --- Dots Navigation ---
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            targetIndex = i;
        });
    });

    // Resize handler
    window.addEventListener('resize', () => {
        updateCardPositions();
    });

    // Initial render positioning
    updateCardPositions();
}
