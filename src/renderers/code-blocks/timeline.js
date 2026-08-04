/**
 * Renders a ```timeline code block.
 *
 * Format per line: `Title : Description` or `Step : Title : Description`
 * Displays a clean vertical connected timeline flow with step node circles vertically centered next to content boxes.
 *
 * @param {string} text - Raw block content.
 * @returns {string} HTML string.
 */
export function renderTimeline(text) {
    if (!text || !text.trim()) return '';

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return '';

    const items = lines.map((line, idx) => {
        const parts = line.split(/\s+:\s+/).map(p => p.trim());
        let number = String(idx + 1).padStart(2, '0');
        let title = '';
        let desc = '';

        if (parts.length >= 3) {
            number = parts[0];
            title = parts[1];
            desc = parts.slice(2).join(' : ');
        } else if (parts.length === 2) {
            title = parts[0];
            desc = parts[1];
        } else if (parts.length === 1) {
            title = parts[0];
        }

        return { number, title, desc };
    });

    const total = items.length;

    const stepsHtml = items.map((item, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === total - 1;

        let lineHtml = '';
        if (total > 1) {
            if (isFirst) {
                // First item: line starts at top-1/2 (center of circle 01) and extends to bottom of row + gap
                lineHtml = `<div class="absolute top-1/2 bottom-[-1.5rem] sm:bottom-[-2rem] left-[15px] sm:left-[19px] w-[2px] border-l-2 border-dashed border-white/20 z-0 pointer-events-none"></div>`;
            } else if (isLast) {
                // Last item: line starts at top-0 of row and terminates at top-1/2 (center of last circle)
                lineHtml = `<div class="absolute top-0 bottom-1/2 left-[15px] sm:left-[19px] w-[2px] border-l-2 border-dashed border-white/20 z-0 pointer-events-none"></div>`;
            } else {
                // Middle items: line runs continuously from top-0 of row to bottom of row + gap
                lineHtml = `<div class="absolute top-0 bottom-[-1.5rem] sm:bottom-[-2rem] left-[15px] sm:left-[19px] w-[2px] border-l-2 border-dashed border-white/20 z-0 pointer-events-none"></div>`;
            }
        }

        return `
        <div class="relative flex items-center gap-4 sm:gap-6">
            <!-- Dashed Line Segment for this row -->
            ${lineHtml}

            <!-- Step Node Circle (Z-10 solid background conceals connecting line ends) -->
            <div class="relative z-10 shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#18151f] border-2 border-amber-500/80 text-amber-400 font-display text-xs sm:text-sm font-bold flex items-center justify-center shadow-md">
                ${item.number}
            </div>

            <!-- Content Card Box -->
            <div class="grow bg-surface-container/70 rounded-2xl p-5 sm:p-6 ghost-border">
                <h4 class="font-display font-medium text-white text-base sm:text-lg leading-snug mb-1">${item.title}</h4>
                ${item.desc ? `<p class="font-body text-xs sm:text-sm text-white/70 leading-relaxed">${item.desc}</p>` : ''}
            </div>
        </div>
        `;
    }).join('\n');

    return `
    <div class="w-full max-w-[640px] mx-auto my-10 sm:my-14 px-4 sm:px-6">
        <div class="relative flex flex-col gap-6 sm:gap-8">
            ${stepsHtml}
        </div>
    </div>
    `;
}
