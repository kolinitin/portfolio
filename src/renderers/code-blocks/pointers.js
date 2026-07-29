/**
 * Renders a ```pointers code block.
 *
 * Format per line: `Title : Description`
 * Renders as a 2-column card grid with styled title (Rubik/display font) and body text.
 *
 * @param {string} text - Raw block content.
 * @returns {string} HTML string.
 */
export function renderPointers(text) {
    const lines = text.split('\n').filter(l => l.trim());
    let html = `<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 mt-8 max-w-[640px] px-6 mx-auto">`;

    lines.forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return;
        const title = line.slice(0, colonIdx).trim();
        const desc = line.slice(colonIdx + 1).trim();

        html += `
        <div class="bg-surface-container p-8 rounded-[2rem] ghost-border flex flex-col gap-6">
            <div class="text-2xl font-display font-medium text-white">${title}</div>
            <div class="text-white/70 leading-relaxed">${desc}</div>
        </div>`;
    });

    html += `</div>`;
    return html;
}
