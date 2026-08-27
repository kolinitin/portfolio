/**
 * Custom marked renderer for `evolution` code blocks.
 *
 * Line syntax:
 * YEAR : IMAGE_PATH : CAPTION
 *
 * Example:
 * 2016–17 : /public/d11-22-23.png : Initial single-sport match cards layout
 *
 * @param {string} text - Raw code block text.
 * @returns {string} HTML string.
 */
/**
 * Custom marked renderer for `evolution` code blocks.
 *
 * Supports flexible device screen resolutions (e.g. 412x892, 360x720, 390x844).
 * Resolution can be set via language tag (`evolution:412x892`, `evolution 412x892`),
 * first line parameter (`resolution: 412x892`, `ratio: 412/892`, `size: 412x892`),
 * or defaults to `412x892`.
 *
 * Line syntax:
 * YEAR : IMAGE_PATH : CAPTION
 *
 * Example:
 * ```evolution 412x892
 * 2022–23 : /public/d11-22-23.png : Initial layout
 * ```
 *
 * @param {string} text - Raw code block text.
 * @param {string} [lang=''] - Language identifier tag.
 * @returns {string} HTML string.
 */
export function renderEvolution(text, lang = '') {
    const rawLines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (rawLines.length === 0) return '';

    let aspectWidth = 412;
    let aspectHeight = 892;
    let widthOverride = null;

    const parseParams = (str) => {
        if (!str) return;
        const s = str.toLowerCase().trim();

        // Parse resolution (e.g. 412x892, ratio: 412/892, size: 360x720)
        const resMatch = s.match(/(?:aspect|ratio|size|resolution)?[:=]?\s*(\d+(?:\.\d+)?)\s*[:x\/]\s*(\d+(?:\.\d+)?)/);
        if (resMatch) {
            const w = parseFloat(resMatch[1]);
            const h = parseFloat(resMatch[2]);
            if (w > 0 && h > 0) {
                aspectWidth = w;
                aspectHeight = h;
            }
        }

        // Parse custom width override (e.g. width=260, w: 260, card-width: 270)
        const wMatch = s.match(/(?:width|card-width|w)[:=]?\s*(\d+)/);
        if (wMatch) {
            const parsedW = parseInt(wMatch[1], 10);
            if (parsedW > 100 && parsedW <= 500) {
                widthOverride = parsedW;
            }
        }
    };

    // 1. Check language tag (e.g., `evolution 412x892 width=260`)
    parseParams(lang);

    // 2. Check first line for params (e.g. `size: 412x892`, `width: 260`)
    if (rawLines.length > 0) {
        const firstLine = rawLines[0].toLowerCase();
        if (firstLine.includes('x') || firstLine.includes('ratio') || firstLine.includes('size') || firstLine.includes('width') || firstLine.includes('w:')) {
            parseParams(rawLines[0]);
            // If the first line was purely a parameter line (no URL separator), remove it
            if (!rawLines[0].includes('http') && !rawLines[0].includes('.png') && !rawLines[0].includes('.mp4') && !rawLines[0].includes('.mov')) {
                rawLines.shift();
            }
        }
    }

    const isUrl = (str) => {
        if (!str) return false;
        const s = str.trim();
        return s.startsWith('http://') || s.startsWith('https://') || s.startsWith('/') || s.startsWith('./') || Boolean(s.match(/\.(mp4|webm|mov|png|jpg|jpeg|svg|webp)(\?.*)?$/i));
    };

    const items = rawLines.map(line => {
        const parts = line.split(/\s+:\s+/).map(p => p.trim());
        let year = '';
        let image = '';
        let caption = '';

        if (parts.length >= 3) {
            year = parts[0];
            image = parts[1];
            caption = parts.slice(2).join(' : ');
        } else if (parts.length === 2) {
            if (isUrl(parts[0])) {
                // Format: URL : CAPTION
                year = '';
                image = parts[0];
                caption = parts[1];
            } else {
                // Format: TITLE : URL
                year = parts[0];
                image = parts[1];
                caption = '';
            }
        } else if (parts.length === 1 && isUrl(parts[0])) {
            // Format: URL
            year = '';
            image = parts[0];
            caption = '';
        }

        return { year, image, caption };
    }).filter(item => Boolean(item.image));

    if (items.length === 0) return '';

    const ratio = aspectHeight / aspectWidth;

    // Determine target card desktop width (default 330, scaled down by 90% for tall aspect ratios > 2.05, or custom widthOverride)
    let cardMd = widthOverride || (ratio > 2.05 ? Math.round(330 * 0.90) : 330);
    cardMd = Math.max(180, Math.min(500, cardMd));

    let cardSm = Math.round(cardMd * 0.88);
    let cardBase = Math.round(cardMd * 0.70);

    const getCardHeight = (cardW, isMobile = false) => {
        const bezelPadding = isMobile ? 12 : 16;
        const bezelMargin = isMobile ? 8 : 12;
        const screenW = cardW - bezelPadding;
        const screenH = Math.round(screenW * ratio);
        const bezelH = screenH + bezelPadding;

        let maxTitleH = 0;
        if (items.some(i => Boolean(i.year))) {
            const maxTitleLen = Math.max(...items.map(i => (i.year || '').length));
            maxTitleH = maxTitleLen > 18 ? 48 : 30;
        }

        let maxCapH = 0;
        if (items.some(i => Boolean(i.caption))) {
            const maxCapLen = Math.max(...items.map(i => (i.caption || '').length));
            if (maxCapLen > 75) maxCapH = 60;
            else if (maxCapLen > 35) maxCapH = 40;
            else maxCapH = 20;
        }

        // Include 16px safety buffer for line-height and font rendering variances
        return bezelH + bezelMargin + maxTitleH + maxCapH + 12;
    };

    const trackBase = getCardHeight(cardBase, true);
    const trackSm = getCardHeight(cardSm, false);
    const trackMd = getCardHeight(cardMd, false);

    const slidesHtml = items.map((item, index) => {
        const isVideo = Boolean(item.image.match(/\.(mp4|webm|mov)(\?.*)?$/i));
        const mediaHtml = isVideo
            ? `<div class="custom-video-player absolute inset-0 w-full h-full group overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]">
                <video src="${item.image}" loop muted playsinline class="absolute inset-0 w-full h-full block object-cover object-top rounded-[1.1rem] sm:rounded-[1.4rem] pointer-events-auto cursor-pointer" draggable="false"></video>
                
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
                    <div class="absolute inset-x-0 bottom-0 px-3 pb-3 pt-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-auto">
                        <div class="video-seek-track relative w-full h-4 flex items-center cursor-pointer touch-none group/seek">
                            <div class="video-seek-bg w-full h-1 group-hover/seek:h-1.5 bg-white/25 rounded-full overflow-hidden relative transition-[height] duration-150 backdrop-blur-sm">
                                <div class="video-seek-fill absolute inset-0 bg-amber-400 rounded-full origin-left transform-gpu" style="transform: scaleX(0);"></div>
                            </div>
                            <div class="video-seek-handle absolute top-1/2 left-0 w-2.5 h-2.5 group-hover/seek:w-3.5 group-hover/seek:h-3.5 bg-white rounded-full shadow-md pointer-events-none transform-gpu transition-[width,height] duration-150 -ml-1.25 sm:-ml-1.75" style="transform: translate3d(0px, -50%, 0);"></div>
                        </div>
                    </div>
                </div>
            </div>`
            : `<img src="${item.image}" alt="${item.caption || 'Evolution screen'}" class="absolute inset-0 w-full h-full object-cover object-top rounded-[1.1rem] sm:rounded-[1.4rem] pointer-events-none" draggable="false" />`;

        return `
        <div class="evolution-card absolute top-0 flex flex-col items-center justify-start transition-none will-change-transform pointer-events-none" style="--card-w-base: ${cardBase}px; --card-w-sm: ${cardSm}px; --card-w-md: ${cardMd}px;" data-index="${index}">
            <!-- Device Frame Outer Bezel -->
            <div class="relative w-full bg-[#1a1b1e] border border-white/10 p-1.5 sm:p-2 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl mb-3 sm:mb-4">
                <!-- Dynamic Island / Speaker notch -->
                <div class="absolute top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-2.5 sm:h-3.5 bg-black rounded-full z-20 flex items-center justify-center opacity-80 pointer-events-none">
                    <span class="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#0d0d0e]"></span>
                    <span class="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#16171a] ml-1"></span>
                </div>
                <!-- Inner Screen Media Container -->
                <div class="relative w-full overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem] bg-black" style="aspect-ratio: ${aspectWidth} / ${aspectHeight};">
                    ${mediaHtml}
                </div>
            </div>
            ${item.year ? `<span class="font-display px-2 text-center text-[15px] sm:text-[17px] font-bold tracking-tight text-neutral-100 leading-snug mt-2.5 sm:mt-3 block">${item.year}</span>` : ''}
            ${item.caption ? `<p class="font-body text-[11px] sm:text-xs text-white/70 text-center px-1 sm:px-2 line-clamp-3 leading-relaxed ${item.year ? 'mt-1' : 'mt-2.5 sm:mt-3'}">${item.caption}</p>` : ''}
        </div>
        `;
    }).join('\n');

    const dotsHtml = items.map((item, index) => `
        <button type="button" class="evolution-dot w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20 hover:bg-white/50 transition-all duration-300" data-dot-index="${index}" title="${item.year}"></button>
    `).join('\n');

    return `
    <div class="evolution-container relative w-full my-6 sm:my-8 select-none overflow-hidden cursor-grab active:cursor-grabbing" data-num-items="${items.length}">
        <!-- Slides Track Stage -->
        <div class="evolution-track relative w-full flex items-start justify-center overflow-hidden pt-2" style="--track-h-base: ${trackBase}px; --track-h-sm: ${trackSm}px; --track-h-md: ${trackMd}px;">
            ${slidesHtml}
        </div>

        <!-- Controls Bar: Prev Button, Step Dots, Next Button -->
        <div class="flex items-center justify-center gap-4 mt-4 sm:mt-5">
            <button type="button" class="evolution-prev-btn p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-all disabled:opacity-30 disabled:pointer-events-none" aria-label="Previous version">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <div class="evolution-dots-bar flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                ${dotsHtml}
            </div>

            <button type="button" class="evolution-next-btn p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-all disabled:opacity-30 disabled:pointer-events-none" aria-label="Next version">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
    </div>
    `;
}
