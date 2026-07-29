/**
 * Renders a ```results code block.
 *
 * Format per line: `LABEL : Value : Description`
 * Renders as a 3-column transparent card grid with a large display-font metric value.
 *
 * @param {string} text - Raw block content.
 * @returns {string} HTML string.
 */
export function renderResults(text) {
    const lines = text.split('\n').filter(l => l.trim());
    let html = `<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-12 mt-8 max-w-[640px] px-6 mx-auto">`;

    lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length < 3) return;
        const label = parts[0].trim();
        const val = parts[1].trim();
        const desc = parts.slice(2).join(':').trim();

        html += `
        <div class="p-8 md:p-6 rounded-[2rem] ghost-border flex flex-col">
            <div class="text-[12px] font-medium uppercase tracking-widest text-white/50 mb-6">${label}</div>
            <div class="text-3xl font-display font-medium text-white mb-4">${val}</div>
            <div class="text-sm text-white/70 leading-relaxed">${desc}</div>
        </div>`;
    });

    html += `</div>`;
    return html;
}
