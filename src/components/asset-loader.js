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

        const parent = img.closest('.custom-video-player, .evolution-card, .aspect-container, div') || img.parentElement;

        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('media-fade-in', 'is-loaded');
        } else {
            img.classList.add('media-fade-in');
            if (parent) parent.classList.add('asset-loading-skeleton');

            const onLoaded = () => {
                img.classList.add('is-loaded');
                if (parent) parent.classList.remove('asset-loading-skeleton');
                img.removeEventListener('load', onLoaded);
                img.removeEventListener('error', onLoaded);
            };

            img.addEventListener('load', onLoaded);
            img.addEventListener('error', onLoaded);
        }
    });

    // Handle Video Loading
    videos.forEach(video => {
        const parent = video.closest('.custom-video-player') || video.parentElement;

        if (video.readyState >= 2) {
            video.classList.add('media-fade-in', 'is-loaded');
        } else {
            video.classList.add('media-fade-in');
            if (parent) parent.classList.add('asset-loading-skeleton');

            const onVideoLoaded = () => {
                video.classList.add('is-loaded');
                if (parent) parent.classList.remove('asset-loading-skeleton');
                video.removeEventListener('loadeddata', onVideoLoaded);
                video.removeEventListener('canplay', onVideoLoaded);
                video.removeEventListener('error', onVideoLoaded);
            };

            video.addEventListener('loadeddata', onVideoLoaded);
            video.addEventListener('canplay', onVideoLoaded);
            video.addEventListener('error', onVideoLoaded);
        }
    });
}
