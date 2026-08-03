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
    let isVisible = false;    // Gesture & drag state
    let isDragging = false;
    let isDirectionLocked = false;
    let isHorizontalSwipe = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocityX = 0;
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

        // While dragging, stick 1-to-1 to finger/mouse (tight lerp 0.35).
        // On release, smoothly damp to targetIndex (lerp 0.14).
        const lerpFactor = isDragging ? 0.35 : 0.14;
        currentIndex += (targetIndex - currentIndex) * lerpFactor;

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

    // --- Unified Touch & Pointer Drag Handlers ---
    function onStart(e) {
        // Ignore clicks on buttons, video controls, or seek bars
        if (e.target.closest('button, .custom-video-controls, .video-seek-track')) return;

        isDragging = true;
        isDirectionLocked = false;
        isHorizontalSwipe = false;

        const touch = e.touches ? e.touches[0] : e;
        startX = touch.clientX;
        startY = touch.clientY;
        lastX = startX;
        lastTime = performance.now();
        velocityX = 0;
        startIndex = targetIndex;

        // Prevent native desktop text selection / ghost drag
        if (e.type === 'mousedown') {
            e.preventDefault();
        }
    }

    function onMove(e) {
        if (!isDragging) return;

        const touch = e.touches ? e.touches[0] : e;
        const currentX = touch.clientX;
        const currentY = touch.clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // Touch Directional Lock (Prevents page scroll during horizontal swipe)
        if (!isDirectionLocked && e.touches) {
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);

            // Require 6px threshold to establish gesture intent
            if (absX > 6 || absY > 6) {
                isDirectionLocked = true;
                if (absX > absY) {
                    isHorizontalSwipe = true;
                } else {
                    // Vertical intent -> release drag so page scrolls naturally
                    isHorizontalSwipe = false;
                    isDragging = false;
                    return;
                }
            }
        }

        // Prevent vertical page scroll if user is swiping horizontally
        if (isHorizontalSwipe && e.cancelable) {
            e.preventDefault();
        }

        // Track swipe velocity (px per ms)
        const now = performance.now();
        const dt = now - lastTime;
        if (dt > 0) {
            velocityX = (currentX - lastX) / dt;
            lastX = currentX;
            lastTime = now;
        }

        const cardWidth = cards[0]?.offsetWidth || 300;
        const dragDistancePerCard = cardWidth * 0.9;
        const indexShift = -deltaX / dragDistancePerCard;

        targetIndex = Math.max(-0.2, Math.min(numItems - 0.8, startIndex + indexShift));
    }

    function onEnd() {
        if (!isDragging) return;
        isDragging = false;

        // Flick Velocity Momentum: if flicked fast (|velocityX| > 0.3), slide to next/prev card
        if (Math.abs(velocityX) > 0.3) {
            if (velocityX < 0) {
                targetIndex = Math.min(numItems - 1, Math.floor(targetIndex) + 1);
            } else {
                targetIndex = Math.max(0, Math.ceil(targetIndex) - 1);
            }
        } else {
            targetIndex = Math.max(0, Math.min(numItems - 1, Math.round(targetIndex)));
        }
    }

    // Desktop Mouse events
    container.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    // Mobile Touch events (non-passive touchmove for direction lock preventDefault)
    container.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);

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
