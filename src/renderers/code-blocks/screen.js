import { renderScreens } from './screens.js';
import { parseAnnotation, renderAnnotation } from '../annotation.js';

/**
 * Custom marked renderer for `screen` code blocks.
 *
 * Renders a single standalone screen or delegates to horizontal scroll for multiple items.
 *
 * Supports options in lang or line parameters:
 * - Resolution/Aspect ratio: e.g. `720x2086`, `360x720`, `390x844`, `ratio: 720/2086`
 * - Fit mode / alignment: `contain`, `top`, `cover`
 * - Notch toggle: `no-notch` / `notch:false`
 * - Annotations: `annotation: right, 120px, Carousel occupies vertical real estate when match is far away.`
 *
 * @param {string} text - Raw code block text.
 * @param {string} lang - Language tag (e.g. `screen`, `screen 720x2086`, `screen:720x2086`).
 * @returns {string} HTML string.
 */
export function renderScreen(text, lang = '') {
    const rawLines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (rawLines.length === 0) return '';

    const isUrl = (str) => {
        if (!str) return false;
        const s = str.trim();
        return s.startsWith('http://') || s.startsWith('https://') || s.startsWith('/') || s.startsWith('./') || Boolean(s.match(/\.(mp4|webm|mov|png|jpg|jpeg|svg|webp)(\?.*)?$/i));
    };

    const langLower = (lang || '').toLowerCase();

    // Check how many actual media lines exist in the input
    const mediaLines = rawLines.filter(line => {
        const parts = line.split(/\s+:\s+/).map(p => p.trim());
        return parts.some(isUrl);
    });

    // Delegate to renderScreens if explicitly requested or if multiple screen items are present
    if (mediaLines.length > 1 || langLower.startsWith('screens') || langLower.includes('scroll')) {
        return renderScreens(text, lang);
    }

    let aspectW = 0;
    let aspectH = 0;
    let isLandscape = false;
    let fitMode = 'cover';
    let showNotch = true;
    let annotation = null;

    // Check raw lines for annotation parameter
    rawLines.forEach(line => {
        const ann = parseAnnotation(line);
        if (ann) annotation = ann;
    });

    const parseParams = (str) => {
        if (!str) return;
        const s = str.toLowerCase().trim();

        // 1. Resolution / Aspect ratio (e.g. 720x2086, 360x720, 390x844, ratio: 720/2086)
        const resMatch = s.match(/(?:aspect|ratio|size|resolution)?[:=]?\s*(\d+(?:\.\d+)?)\s*[:x\/]\s*(\d+(?:\.\d+)?)/i);
        if (resMatch) {
            const w = parseFloat(resMatch[1]);
            const h = parseFloat(resMatch[2]);
            if (w > 0 && h > 0) {
                aspectW = w;
                aspectH = h;
                if (w > h) isLandscape = true;
            }
        }

        // 2. Landscape check
        if (s.includes('landscape')) {
            isLandscape = true;
        }

        // 3. Fit mode / alignment
        if (s.includes('contain')) fitMode = 'contain';
        else if (s.includes('top') || s.includes('fit-top') || s.includes('object-top')) fitMode = 'top';

        // 4. Notch toggle
        if (s.includes('no-notch') || s.includes('nonotch') || s.includes('notch:false') || s.includes('notch=false') || s.includes('no_notch')) {
            showNotch = false;
        }

        // 5. Annotation in string
        if (!annotation) {
            annotation = parseAnnotation(str);
        }
    };

    // 1. Parse params from language tag (e.g. `screen 720x2086`, `screen:720x2086 no-notch`)
    parseParams(lang);

    // 2. Parse params from lines before the media URL line
    while (rawLines.length > 0) {
        const firstLine = rawLines[0];
        const parts = firstLine.split(/\s+:\s+/).map(p => p.trim());
        const containsUrl = parts.some(isUrl);
        if (!containsUrl) {
            parseParams(firstLine);
            rawLines.shift();
        } else {
            break;
        }
    }

    if (rawLines.length === 0) return '';

    let rawLine = rawLines[0];

    // Check inline bracket tags on the media line (e.g. `[720x2086] [no-notch]`)
    const bracketMatches = rawLine.match(/\[(.*?)\]/g);
    if (bracketMatches) {
        bracketMatches.forEach(b => parseParams(b));
    }

    // Clean inline bracket tags and leading parameter prefixes from the media line
    rawLine = rawLine
        .replace(/^landscape\s*:\s*/i, '')
        .replace(/\[.*?\]/g, '')
        .replace(/^(?:aspect|ratio|size|resolution)?[:=]?\s*\d+(?:\.\d+)?\s*[:x\/]\s*\d+(?:\.\d+)?\s*:\s*/i, '')
        .replace(/(?:annotation|annotate|callout)\s*[:=]\s*[^:\n]+/i, '')
        .trim();

    const parts = rawLine.split(/\s+:\s+/).map(p => p.trim()).filter(Boolean);

    let title = '';
    let mediaUrl = '';
    let caption = '';

    if (parts.length === 1) {
        mediaUrl = parts[0];
    } else if (parts.length === 2) {
        if (isUrl(parts[0])) {
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

    // Set default aspect ratio if not explicitly specified
    if (aspectW === 0 || aspectH === 0) {
        aspectW = isLandscape ? 892 : 412;
        aspectH = isLandscape ? 412 : 892;
    }

    const isVideo = Boolean(mediaUrl.match(/\.(mp4|webm|mov)(\?.*)?$/i));

    // Choose object fit/position class
    let imgObjectFitClass = 'object-cover object-top';
    if (fitMode === 'contain') {
        imgObjectFitClass = 'object-contain object-top';
    } else if (fitMode === 'top') {
        imgObjectFitClass = 'object-cover object-top';
    }

    const mediaHtml = isVideo
        ? `<div class="custom-video-player absolute inset-0 w-full h-full group overflow-hidden rounded-[1.75rem]">
            <video src="${mediaUrl}" autoplay loop muted playsinline class="absolute inset-0 w-full h-full rounded-[1.75rem] block ${imgObjectFitClass} pointer-events-auto cursor-pointer"></video>
            
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
        : `<img src="${mediaUrl}" alt="${caption || title || 'Screen preview'}" loading="eager" decoding="async" class="absolute inset-0 w-full h-full rounded-[1.75rem] block ${imgObjectFitClass}" />`;

    const titleHtml = title
        ? `<div class="mt-3 sm:mt-4"><span class="font-display text-center text-[16px] sm:text-[18px] font-bold tracking-tight text-neutral-100 leading-snug">${title}</span></div>`
        : '';

    const captionMarginClass = title ? 'mt-1' : 'mt-2.5 sm:mt-3';
    const captionHtml = caption
        ? `<p class="font-body text-xs sm:text-sm text-white/70 text-center px-4 leading-relaxed ${captionMarginClass}">${caption}</p>`
        : '';

    const cardWidthClass = isLandscape
        ? 'max-w-[480px] sm:max-w-[580px]'
        : 'max-w-[340px] sm:max-w-[380px]';

    const dynamicIslandClass = isLandscape
        ? 'left-3.5 top-1/2 -translate-y-1/2 h-16 w-3.5 flex-col gap-1.5'
        : 'top-4 left-1/2 -translate-x-1/2 w-20 h-4 gap-1.5';

    const notchHtml = showNotch
        ? `<div class="absolute ${dynamicIslandClass} bg-black rounded-full z-20 flex items-center justify-center opacity-90">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0d0d0e]"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-[#16171a]"></span>
        </div>`
        : '';

    const annotationHtml = renderAnnotation(annotation);

    const annotationPaddingClass = annotation
        ? (annotation.side === 'left' ? 'sm:pl-[340px]' : 'sm:pr-[340px]')
        : '';

    return `
    <div class="w-full ${cardWidthClass} mx-auto my-12 flex flex-col items-center select-none ${annotationPaddingClass}">
        <!-- CSS Mobile Device Frame -->
        <div class="relative w-full rounded-[2.25rem] bg-[#1a1b1e] border-[6px] border-[#2b2c30] shadow-2xl p-2 ghost-border">
            ${notchHtml}
            <!-- Screen Media Container -->
            <div class="screen-media-frame relative w-full overflow-visible rounded-[1.75rem] bg-[#16171a]" style="aspect-ratio: ${aspectW} / ${aspectH};">
                ${mediaHtml}
                ${annotationHtml}
            </div>
        </div>
        ${titleHtml}
        ${captionHtml}
    </div>
    `;
}
