import { marked } from 'marked';

/**
 * Renders a ```summary code block.
 *
 * Format per line: `LABEL: Content text`
 * Labels must be all-uppercase. Content can span multiple lines and supports
 * inline markdown (bold, italic, etc.).
 *
 * Renders as a 3-column editorial row: Label | Divider | Content
 *
 * @param {string} text - Raw block content.
 * @returns {string} HTML string.
 */
export function renderSummary(text) {
    const lines = text.split('\n').filter(l => l.trim());

    let html = `<div class="flex flex-col gap-16 my-16 mt-24 max-w-[640px] px-6 mx-auto">`;

    const ROW_HTML = (label, content) => `
    <div class="grid grid-cols-1 md:grid-cols-[140px_40px_1fr] md:gap-6 items-start">
        <div class="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/50 mt-2 mb-4 md:mb-0">${label}</div>
        <div class="hidden md:block w-full px-2 mt-3.5"><div class="w-full h-[1px] bg-white/20"></div></div>
        <div class="block md:hidden w-8 h-[1px] bg-white/20 mb-4"></div>
        <div class="text-l text-white/90 leading-relaxed font-light [&>strong]:font-semibold [&>strong]:text-white">${marked.parseInline(content)}</div>
    </div>`;

    let currentLabel = '';
    let currentText = '';

    lines.forEach(line => {
        const colonIdx = line.indexOf(':');
        const potentialLabel = colonIdx !== -1 ? line.slice(0, colonIdx).trim() : '';
        const isNewLabel = potentialLabel && potentialLabel === potentialLabel.toUpperCase() && potentialLabel.length > 0;

        if (isNewLabel) {
            if (currentLabel) html += ROW_HTML(currentLabel, currentText.trim());
            currentLabel = potentialLabel;
            currentText = line.slice(colonIdx + 1).trim();
        } else if (currentLabel) {
            currentText += ' ' + line.trim();
        }
    });

    // Flush the final row
    if (currentLabel) html += ROW_HTML(currentLabel, currentText.trim());

    html += `</div>`;
    return html;
}
