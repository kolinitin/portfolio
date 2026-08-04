/**
 * Renders a ```pipeline code block.
 *
 * Format per line: `Title : Description`
 * Displays a connected horizontal pipeline flow of cards linked by vector arrows (→).
 * Fits up to 4 boxes in a single row, and gracefully wraps to the next line for 5+ boxes.
 *
 * @param {string} text - Raw block content.
 * @returns {string} HTML string.
 */
export function renderPipeline(text) {
    if (!text || !text.trim()) return '';

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return '';

    const items = lines.map(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return { title: line.trim(), desc: '' };
        return {
            title: line.slice(0, colonIdx).trim(),
            desc: line.slice(colonIdx + 1).trim()
        };
    });

    const itemsHtml = items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return `
        <div class="flex items-center gap-2 sm:gap-3 my-1 flex-1 min-w-[130px] sm:min-w-[145px] max-w-[175px]">
            <!-- Pipeline Step Card Box -->
            <div class="w-full bg-surface-container/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-4 ghost-border flex flex-col justify-center min-h-[72px] sm:min-h-[82px]">
                <h4 class="font-display font-medium text-white text-xs sm:text-sm leading-snug mb-0.5 text-left">${item.title}</h4>
                ${item.desc ? `<p class="font-body text-[11px] sm:text-xs text-white/60 leading-relaxed text-left">${item.desc}</p>` : ''}
            </div>

            <!-- Sharp Vector Connecting Arrow -->
            ${!isLast ? `
            <div class="shrink-0 flex items-center justify-center text-white/40">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 sm:w-4.5 sm:h-4.5">
                    <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </div>
            ` : ''}
        </div>
        `;
    }).join('\n');

    return `
    <div class="w-full max-w-[780px] mx-auto my-8 sm:my-4 px-4 sm:px-6">
        <div class="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3">
            ${itemsHtml}
        </div>
    </div>
    `;
}
