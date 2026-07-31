/**
 * Custom marked renderer for `screens` code blocks (free-flowing horizontal scroll).
 *
 * Syntax:
 * ```screens [size=small|big]
 * [size: small|big]
 * URL : CAPTION
 * TITLE : URL : CAPTION
 * ```
 *
 * Line syntax options:
 * 1) URL
 * 2) URL : CAPTION
 * 3) TITLE : URL : CAPTION
 *
 * Size can be set via language tag (`screens:small`, `screens:big`, `screens-small`),
 * first line parameter (`size: small`), or defaults to `big`.
 *
 * @param {string} text - Raw code block text.
 * @param {string} lang - Language identifier (e.g. `screens`, `screens:small`).
 * @returns {string} HTML string.
 */
export function renderScreens(text, lang = '') {
    const rawLines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (rawLines.length === 0) return '';

    let size = 'big';

    // 1. Check language tag for size keyword
    const langLower = (lang || '').toLowerCase();
    if (langLower.includes('small')) {
        size = 'small';
    } else if (langLower.includes('big') || langLower.includes('large')) {
        size = 'big';
    }

    // 2. Check first line for `size: small` / `size: big` or `small` / `big`
    if (rawLines.length > 0) {
        const firstLineLower = rawLines[0].toLowerCase();
        if (firstLineLower.startsWith('size:') || firstLineLower.startsWith('size=')) {
            const val = firstLineLower.replace(/^size[:=]\s*/, '').trim();
            if (val === 'small') size = 'small';
            if (val === 'big' || val === 'large') size = 'big';
            rawLines.shift();
        } else if (firstLineLower === 'small' || firstLineLower === 'big' || firstLineLower === 'large') {
            size = firstLineLower === 'small' ? 'small' : 'big';
            rawLines.shift();
        }
    }

    const items = rawLines.map(line => {
        const parts = line.split(/\s+:\s+/).map(p => p.trim());
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

        return { title, mediaUrl, caption };
    }).filter(item => Boolean(item.mediaUrl));

    if (items.length === 0) return '';

    const isSmall = size === 'small';

    const itemWidthClass = isSmall
        ? 'w-[180px] xs:w-[200px] sm:w-[230px]'
        : 'w-[260px] xs:w-[300px] sm:w-[340px]';

    const framePadding = isSmall
        ? 'p-1.5 border-[4px] rounded-[1.75rem]'
        : 'p-2 border-[6px] rounded-[2.25rem]';

    const mediaRounded = isSmall
        ? 'rounded-[1.35rem]'
        : 'rounded-[1.75rem]';

    const dynamicIslandClass = isSmall
        ? 'top-2.5 w-12 h-2.5 gap-1'
        : 'top-4 w-20 h-4 gap-1.5';

    const dot1Class = isSmall ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5';
    const dot2Class = isSmall ? 'w-1 h-1' : 'w-1.5 h-1.5';

    const titleClass = isSmall
        ? 'px-2.5 py-0.5 text-[10px]'
        : 'px-3 py-1 text-xs';

    const captionClass = isSmall
        ? 'text-[11px] sm:text-xs text-white/70 text-center leading-normal mt-3 px-1'
        : 'text-xs sm:text-sm text-white/70 text-center leading-relaxed mt-3 px-2';

    const screensHtml = items.map(item => {
        const isVideo = Boolean(item.mediaUrl.match(/\.(mp4|webm|mov)(\?.*)?$/i));
        const mediaHtml = isVideo
            ? `<div class="custom-video-player relative w-full h-full group overflow-hidden ${mediaRounded}">
                <video src="${item.mediaUrl}" autoplay loop muted playsinline class="w-full h-auto ${mediaRounded} block object-cover pointer-events-auto cursor-pointer"></video>
                
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
                    <div class="absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-auto">
                        <div class="video-seek-track relative w-full h-4 flex items-center cursor-pointer touch-none group/seek py-1">
                            <div class="video-seek-bg w-full h-1 sm:h-1.5 bg-white/30 rounded-full overflow-hidden relative backdrop-blur-sm">
                                <div class="video-seek-fill h-full bg-amber-400 rounded-full w-0"></div>
                            </div>
                            <div class="video-seek-handle absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow border border-black/20 pointer-events-none -ml-1.5 transform transition-transform group-hover/seek:scale-125" style="left: 0%;"></div>
                        </div>
                    </div>
                </div>
            </div>`
            : `<img src="${item.mediaUrl}" alt="${item.caption || item.title || 'Screen preview'}" class="w-full h-auto ${mediaRounded} block object-cover" />`;

        const titleHtml = item.title
            ? `<div class="mt-3"><span class="font-display ${titleClass} font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">${item.title}</span></div>`
            : '';

        const captionHtml = item.caption
            ? `<p class="font-body ${captionClass}">${item.caption}</p>`
            : '';

        return `
        <div class="horizontal-screen-card flex-none ${itemWidthClass} flex flex-col items-center select-none">
            <!-- CSS Mobile Device Frame -->
            <div class="relative w-full bg-[#1a1b1e] border-[#2b2c30] shadow-2xl ${framePadding} ghost-border">
                <!-- Dynamic Island -->
                <div class="absolute ${dynamicIslandClass} left-1/2 -translate-x-1/2 bg-black rounded-full z-20 flex items-center justify-center opacity-90">
                    <span class="${dot1Class} rounded-full bg-[#0d0d0e]"></span>
                    <span class="${dot2Class} rounded-full bg-[#16171a]"></span>
                </div>
                <!-- Screen Media Container -->
                <div class="relative w-full overflow-hidden ${mediaRounded} bg-black">
                    ${mediaHtml}
                </div>
            </div>
            ${titleHtml}
            ${captionHtml}
        </div>
        `;
    }).join('\n');

    return `
    <div class="gsap-reveal w-full max-w-none my-8 sm:my-12">
        <div class="w-full overflow-x-auto custom-horizontal-scroll pb-5 pt-2 px-4 sm:px-12 items-start gap-6 sm:gap-16 before:content-[''] before:shrink-0 before:w-4 sm:before:w-8 after:content-[''] after:shrink-0 after:w-4 sm:after:w-8">
            ${screensHtml}
        </div>
    </div>
    `;
}
