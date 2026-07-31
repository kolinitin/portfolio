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

    // If multiple lines or size/landscape tag present in lang, delegate to renderScreens
    const langLower = (lang || '').toLowerCase();
    if (rawLines.length > 1 || (lang && (lang.includes(':') || lang.includes('small') || lang.includes('big') || lang.includes('landscape')))) {
        return renderScreens(text, lang);
    }

    let rawLine = rawLines[0];
    if (!rawLine) return '';

    let isLandscape = langLower.includes('landscape');
    let aspectW = isLandscape ? 892 : 412;
    let aspectH = isLandscape ? 412 : 892;

    // Check ONLY for explicit resolution tag at line start (e.g. `892x412 :`) or in brackets (e.g. `[892x412]`)
    const resMatch = rawLine.match(/^(?:aspect|ratio|size|resolution)?[:=]?\s*(\d+(?:\.\d+)?)\s*[:x\/]\s*(\d+(?:\.\d+)?)\s*:/i) ||
                     rawLine.match(/\[(?:aspect|ratio|size|resolution)?[:=]?\s*(\d+(?:\.\d+)?)\s*[:x\/]\s*(\d+(?:\.\d+)?)[\]]/i);
    if (resMatch) {
        const w = parseFloat(resMatch[1]);
        const h = parseFloat(resMatch[2]);
        if (w > 0 && h > 0) {
            aspectW = w;
            aspectH = h;
            if (w > h) isLandscape = true;
        }
    }

    // Check ONLY for explicit `landscape :` line prefix, `[landscape]` tag, or filename matching `-_landscape.`
    if (rawLine.match(/^landscape\s*:/i) || rawLine.match(/\[landscape\]/i) || rawLine.match(/[-_]landscape\.(png|jpg|jpeg|webp|mp4|webm)/i)) {
        isLandscape = true;
        if (aspectW < aspectH) {
            aspectW = 892;
            aspectH = 412;
        }
    }

    rawLine = rawLine
        .replace(/^landscape\s*:\s*/i, '')
        .replace(/\[landscape\]/gi, '')
        .replace(/\[?(?:aspect|ratio|size|resolution)?[:=]?\s*\d+(?:\.\d+)?\s*[:x\/]\s*\d+(?:\.\d+)?\]?/gi, '')
        .trim();

    const parts = rawLine.split(/\s+:\s+/).map(p => p.trim()).filter(Boolean);

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
        ? `<div class="custom-video-player absolute inset-0 w-full h-full group overflow-hidden rounded-[1.75rem]">
            <video src="${mediaUrl}" autoplay loop muted playsinline class="w-full h-full rounded-[1.75rem] block object-cover pointer-events-auto cursor-pointer"></video>
            
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
        : `<img src="${mediaUrl}" alt="${caption || title || 'Screen preview'}" loading="eager" decoding="async" class="absolute inset-0 w-full h-full rounded-[1.75rem] block object-cover" />`;

    const titleHtml = title
        ? `<div class="mt-4"><span class="font-display px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">${title}</span></div>`
        : '';

    const captionHtml = caption
        ? `<p class="font-body text-xs sm:text-sm text-white/70 text-center px-4 leading-relaxed mt-2">${caption}</p>`
        : '';

    const cardWidthClass = isLandscape
        ? 'max-w-[480px] sm:max-w-[580px]'
        : 'max-w-[340px] sm:max-w-[380px]';

    const dynamicIslandClass = isLandscape
        ? 'left-3.5 top-1/2 -translate-y-1/2 h-16 w-3.5 flex-col gap-1.5'
        : 'top-4 left-1/2 -translate-x-1/2 w-20 h-4 gap-1.5';

    return `
    <div class="w-full ${cardWidthClass} mx-auto my-12 flex flex-col items-center select-none">
        <!-- CSS Mobile Device Frame -->
        <div class="relative w-full rounded-[2.25rem] bg-[#1a1b1e] border-[6px] border-[#2b2c30] shadow-2xl p-2 ghost-border">
            <!-- Dynamic Island / Top Speaker Bar -->
            <div class="absolute ${dynamicIslandClass} bg-black rounded-full z-20 flex items-center justify-center opacity-90">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0d0d0e]"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-[#16171a]"></span>
            </div>
            <!-- Screen Media Container -->
            <div class="screen-media-frame relative w-full overflow-hidden rounded-[1.75rem] bg-[#16171a]" style="aspect-ratio: ${aspectW} / ${aspectH};">
                ${mediaHtml}
            </div>
        </div>
        ${titleHtml}
        ${captionHtml}
    </div>
    `;
}
