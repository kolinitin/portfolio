/**
 * Subtle & Aesthetic Asset Loader Module.
 *
 * Automatically monitors all <img> and <video> elements across the page.
 * Shows a subtle dark shimmer skeleton background and smoothly fades in
 * media once downloaded/decoded with zero layout shifts.
 *
 * @param {Element|Document} [container=document] - Root element to observe.
 */
export function initAssetLoader(container = document) {
    const images = container.querySelectorAll('img');
    const videos = container.querySelectorAll('video');

    // Handle Image Loading
    images.forEach(img => {
        // Skip small inline icons/SVGs
        if (img.classList.contains('icon-play') || img.classList.contains('icon-pause')) return;

        const parent = img.closest('.screen-media-frame, .custom-video-player, .evolution-card, .horizontal-screen-card, .aspect-container') || img.parentElement;

        const revealImage = () => {
            img.classList.add('media-fade-in', 'is-loaded');
            if (parent) parent.classList.remove('asset-loading-skeleton');
        };

        // 1. Immediate check: if image is complete (cached, fast network, or ready)
        if (img.complete) {
            revealImage();
            if (typeof img.decode === 'function') {
                img.decode().then(revealImage).catch(revealImage);
            }
            return;
        }

        // 2. Image is actively downloading: add fade-in class and skeleton
        img.classList.add('media-fade-in');
        if (parent) parent.classList.add('asset-loading-skeleton');

        const onLoaded = () => {
            revealImage();
            img.removeEventListener('load', onLoaded);
            img.removeEventListener('error', onLoaded);
        };

        img.addEventListener('load', onLoaded);
        img.addEventListener('error', onLoaded);

        // 3. Fallback safety timers to catch missed load events, decoding delays, or CDN race conditions
        const checkFallback = () => {
            if (img.complete || img.naturalWidth > 0) {
                revealImage();
            }
        };

        setTimeout(checkFallback, 150);
        setTimeout(checkFallback, 600);
        setTimeout(checkFallback, 1500);
    });

    // Handle Video Loading
    videos.forEach(video => {
        const parent = video.closest('.custom-video-player') || video.parentElement;

        const revealVideo = () => {
            video.classList.add('media-fade-in', 'is-loaded');
            if (parent) parent.classList.remove('asset-loading-skeleton');
        };

        // 1. Immediate check if video metadata is ready
        if (video.readyState >= 2) {
            revealVideo();
            return;
        }

        // 2. Video downloading: add fade-in class and skeleton
        video.classList.add('media-fade-in');
        if (parent) parent.classList.add('asset-loading-skeleton');

        const onVideoLoaded = () => {
            revealVideo();
            video.removeEventListener('loadeddata', onVideoLoaded);
            video.removeEventListener('canplay', onVideoLoaded);
            video.removeEventListener('error', onVideoLoaded);
        };

        video.addEventListener('loadeddata', onVideoLoaded);
        video.addEventListener('canplay', onVideoLoaded);
        video.addEventListener('error', onVideoLoaded);

        // 3. Fallback safety timers for video readyState
        const checkVideoFallback = () => {
            if (video.readyState >= 1) {
                revealVideo();
            }
        };

        setTimeout(checkVideoFallback, 300);
        setTimeout(checkVideoFallback, 1000);
        setTimeout(checkVideoFallback, 2500);
    });
}
