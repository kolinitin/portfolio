import { renderScreens } from './screens.js';

/**
 * Custom marked renderer for `screen` code blocks.
 *
 * Renders a single standalone screen or delegates to horizontal scroll for multiple items.
 *
 * @param {string} text - Raw code block text.
 * @param {string} lang - Language tag (e.g. `screen`, `screen:small`, `screen:big`).
 * @returns {string} HTML string.
 */
export function renderScreen(text, lang = '') {
    const rawLines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (rawLines.length === 0) return '';

    // If multiple lines or size tag present in lang, delegate to renderScreens
    if (rawLines.length > 1 || (lang && (lang.includes(':') || lang.includes('small') || lang.includes('big')))) {
        return renderScreens(text, lang);
    }

    const rawLine = rawLines[0];
    if (!rawLine) return '';

    const parts = rawLine.split(/\s+:\s+/).map(p => p.trim());

    let title = '';
    let mediaUrl = '';
    let caption = '';

    if (parts.length === 1) {
        mediaUrl = parts[0];
    } else if (parts.length === 2) {
        if (parts[0].match(/^(https?:\/\/|\/|\.\/)/i)) {
            mediaUrl = parts[0];
            caption = parts[1];
        } else {
            title = parts[0];
            mediaUrl = parts[1];
        }
    } else if (parts.length >= 3) {
        title = parts[0];
        mediaUrl = parts[1];
        caption = parts.slice(2).join(' : ');
    }

    if (!mediaUrl) return '';

    const isVideo = Boolean(mediaUrl.match(/\.(mp4|webm|mov)(\?.*)?$/i));

    const mediaHtml = isVideo
        ? `<div class="custom-video-player relative w-full h-full group overflow-hidden rounded-[1.75rem]">
            <video src="${mediaUrl}" autoplay loop muted playsinline class="w-full h-auto rounded-[1.75rem] block object-cover pointer-events-auto cursor-pointer"></video>
            
            <!-- Hover Video Overlay Controls -->
            <div class="custom-video-controls absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none select-none">
                <!-- Center Play/Pause Badge Button -->
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button type="button" class="video-play-btn w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-black/85 transition-all pointer-events-auto cursor-pointer focus:outline-none" aria-label="Pause video">
                        <svg class="icon-play w-6 h-6 sm:w-7 sm:h-7 hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M9 5v14l11-7z"/></svg>
                        <svg class="icon-pause w-6 h-6 sm:w-7 sm:h-7 block" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    </button>
                </div>

                <!-- Bottom Seek Bar Track -->
                <div class="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-auto">
                    <div class="video-seek-track relative w-full h-4 sm:h-5 flex items-center cursor-pointer touch-none group/seek py-1">
                        <div class="video-seek-bg w-full h-1.5 sm:h-2 bg-white/30 rounded-full overflow-hidden relative backdrop-blur-sm">
                            <div class="video-seek-fill h-full bg-amber-400 rounded-full w-0"></div>
                        </div>
                        <div class="video-seek-handle absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full shadow border border-black/20 pointer-events-none -ml-1.75 sm:-ml-2 transform transition-transform group-hover/seek:scale-125" style="left: 0%;"></div>
                    </div>
                </div>
            </div>
        </div>`
        : `<img src="${mediaUrl}" alt="${caption || title || 'Screen preview'}" class="w-full h-auto rounded-[1.75rem] block object-cover" />`;

    const titleHtml = title
        ? `<div class="mt-4"><span class="font-display px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">${title}</span></div>`
        : '';

    const captionHtml = caption
        ? `<p class="font-body text-xs sm:text-sm text-white/70 text-center px-4 leading-relaxed mt-2">${caption}</p>`
        : '';

    return `
    <div class="gsap-reveal w-full max-w-[340px] sm:max-w-[380px] mx-auto my-12 flex flex-col items-center select-none">
        <!-- CSS Mobile Device Frame -->
        <div class="relative w-full rounded-[2.25rem] bg-[#1a1b1e] border-[6px] border-[#2b2c30] shadow-2xl p-2 ghost-border">
            <!-- Dynamic Island / Top Speaker Bar -->
            <div class="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center gap-1.5 opacity-90">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0d0d0e]"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-[#16171a]"></span>
            </div>
            <!-- Screen Media Container -->
            <div class="relative w-full overflow-hidden rounded-[1.75rem] bg-black">
                ${mediaHtml}
            </div>
        </div>
        ${titleHtml}
        ${captionHtml}
    </div>
    `;
}
