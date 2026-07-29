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
export function renderEvolution(text) {
    const lines = text.trim().split('\n').filter(line => line.trim().length > 0);
    const items = lines.map(line => {
        // Split by ` : ` (space-colon-space) so `https://...` URLs with colons aren't broken apart
        const parts = line.split(/\s+:\s+/).map(p => p.trim());
        return {
            year: parts[0] || '',
            image: parts[1] || '',
            caption: parts.slice(2).join(' : ') || '',
        };
    });

    if (items.length === 0) return '';

    const slidesHtml = items.map((item, index) => {
        const isVideo = Boolean(item.image.match(/\.(mp4|webm|mov)(\?.*)?$/i));
        const mediaHtml = isVideo
            ? `<video src="${item.image}" autoplay loop muted playsinline class="w-full h-full object-cover object-top rounded-xl pointer-events-none" draggable="false"></video>`
            : `<img src="${item.image}" alt="${item.year} - ${item.caption}" class="w-full h-full object-cover object-top rounded-xl pointer-events-none" draggable="false" />`;

        return `
        <div class="evolution-card absolute top-0 flex flex-col items-center justify-start transition-none will-change-transform w-[220px] xs:w-[240px] sm:w-[300px] md:w-[330px] pointer-events-none" data-index="${index}">
            <div class="relative w-full h-[420px] xs:h-[450px] sm:h-[640px] rounded-2xl overflow-hidden bg-[#1a1b1e] border border-white/10 p-2 shadow-2xl mb-2 sm:mb-3 flex items-center justify-center">
                ${mediaHtml}
            </div>
            <span class="font-display px-3 py-1 sm:py-2 text-[15px] sm:text-[18px] font-bold tracking-tight text-neutral-100">
                ${item.year}
            </span>
            <p class="font-body text-[11px] sm:text-sm text-white/70 text-center px-1 sm:px-2 line-clamp-3 leading-relaxed">
                ${item.caption}
            </p>
        </div>
        `;
    }).join('\n');

    const dotsHtml = items.map((item, index) => `
        <button type="button" class="evolution-dot w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20 hover:bg-white/50 transition-all duration-300" data-dot-index="${index}" title="${item.year}"></button>
    `).join('\n');

    return `
    <div class="evolution-container relative w-full my-6 sm:my-8 select-none overflow-hidden cursor-grab active:cursor-grabbing" data-num-items="${items.length}">
        <!-- Slides Track Stage -->
        <div class="evolution-track relative w-full h-[560px] xs:h-[600px] sm:h-[780px] flex items-start justify-center overflow-hidden pt-2">
            ${slidesHtml}
        </div>

        <!-- Controls Bar: Prev Button, Step Dots, Next Button -->
        <div class="flex items-center justify-center gap-4 mt-2">
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
