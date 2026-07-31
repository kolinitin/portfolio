/**
 * Custom Video Player Controller.
 *
 * Provides a minimal, elegant video player interface:
 * - Center play/pause button on hover
 * - Bottom seek bar with ultra-smooth frame-accurate pointer scrubbing
 *
 * Prevents event propagation so seek bar dragging and clicks never interfere
 * with parent horizontal scrolling or carousel gesture dragging.
 *
 * @param {Element|Document} [container=document] - Container element to search within.
 */
export function initVideoPlayers(container = document) {
    const players = container.querySelectorAll('.custom-video-player');
    if (!players.length) return;

    players.forEach(player => {
        const video = player.querySelector('video');
        const controls = player.querySelector('.custom-video-controls');
        const playBtn = player.querySelector('.video-play-btn');
        const seekTrack = player.querySelector('.video-seek-track');
        const seekFill = player.querySelector('.video-seek-fill');
        const seekHandle = player.querySelector('.video-seek-handle');
        const iconPlay = player.querySelector('.icon-play');
        const iconPause = player.querySelector('.icon-pause');

        if (!video) return;

        // Prevent pointer events from bubbling up to parent carousel/scroll drag listeners
        const stopEvents = ['mousedown', 'mousemove', 'mouseup', 'click', 'pointerdown', 'pointermove', 'pointerup', 'touchstart', 'touchmove', 'touchend'];
        if (controls) {
            stopEvents.forEach(evtName => {
                controls.addEventListener(evtName, (e) => {
                    e.stopPropagation();
                });
            });
        }

        // Update Play/Pause UI state
        const updatePlayState = () => {
            if (video.paused) {
                if (iconPlay) iconPlay.classList.remove('hidden');
                if (iconPause) iconPause.classList.add('hidden');
                if (playBtn) playBtn.setAttribute('aria-label', 'Play video');
            } else {
                if (iconPlay) iconPlay.classList.add('hidden');
                if (iconPause) iconPause.classList.remove('hidden');
                if (playBtn) playBtn.setAttribute('aria-label', 'Pause video');
            }
        };

        const updateSeekUI = (percent) => {
            const clamped = Math.max(0, Math.min(100, percent));
            if (seekFill) seekFill.style.width = `${clamped}%`;
            if (seekHandle) seekHandle.style.left = `${clamped}%`;
        };

        const updateProgress = () => {
            if (isScrubbing) return;
            const current = video.currentTime || 0;
            const duration = video.duration || 0;
            const percent = duration > 0 ? (current / duration) * 100 : 0;
            updateSeekUI(percent);
        };

        // Play/Pause toggle
        const togglePlay = (e) => {
            if (e) e.stopPropagation();
            if (video.paused) {
                video.play().catch(() => { });
            } else {
                video.pause();
            }
            updatePlayState();
        };

        if (playBtn) playBtn.addEventListener('click', togglePlay);

        // Click anywhere on video element to toggle play/pause
        video.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlay(e);
        });

        // --- Ultra-Smooth Frame Scrubbing Engine ---
        let isScrubbing = false;
        let wasPlayingBeforeScrub = false;

        const scrubToPointer = (e) => {
            if (!seekTrack || !video.duration) return;
            const rect = seekTrack.getBoundingClientRect();
            const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const pos = Math.max(0, Math.min(rect.width, clientX - rect.left));
            const percentage = rect.width > 0 ? pos / rect.width : 0;

            // Instantly update visual fill bar and handle position (60fps)
            updateSeekUI(percentage * 100);

            // Frame-accurate video seek
            const targetTime = percentage * video.duration;
            if (isFinite(targetTime)) {
                video.currentTime = targetTime;
            }
        };

        if (seekTrack) {
            seekTrack.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                e.stopPropagation();

                isScrubbing = true;
                wasPlayingBeforeScrub = !video.paused;

                // Pause playback during drag to eliminate audio stutter & maximize decoding performance
                video.pause();

                try {
                    seekTrack.setPointerCapture(e.pointerId);
                } catch (err) { }

                scrubToPointer(e);
            });

            seekTrack.addEventListener('pointermove', (e) => {
                if (!isScrubbing) return;
                e.preventDefault();
                e.stopPropagation();
                scrubToPointer(e);
            });

            const endScrub = (e) => {
                if (!isScrubbing) return;
                if (e) {
                    e.stopPropagation();
                    try {
                        seekTrack.releasePointerCapture(e.pointerId);
                    } catch (err) { }
                }
                isScrubbing = false;

                // Resume playback if it was playing before drag started
                if (wasPlayingBeforeScrub) {
                    video.play().catch(() => { });
                }
            };

            seekTrack.addEventListener('pointerup', endScrub);
            seekTrack.addEventListener('pointercancel', endScrub);
        }

        // Listen for standard video progress events
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('loadedmetadata', updateProgress);
        video.addEventListener('play', updatePlayState);
        video.addEventListener('pause', updatePlayState);

        // Initial state sync
        updatePlayState();
        updateProgress();
    });
}
