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
            ? `<video src="${item.mediaUrl}" autoplay loop muted playsinline class="w-full h-auto ${mediaRounded} block object-cover"></video>`
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
