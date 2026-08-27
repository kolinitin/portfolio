import { marked } from 'marked';
import { renderQuoteBlock } from '../blockquote.js';

/**
 * Renders a ```metadata code block.
 *
 * Format per line: `Label : Value`
 * Renders as a horizontal grid of key-value pairs with a border separator.
 * If no colons exist, falls back to a highlighted quote block.
 *
 * @param {string} text - Raw block content.
 * @returns {string} HTML string.
 */
export function renderMetadata(text) {
    const lines = text.split('\n').filter(l => l.trim());
    const validLines = lines.filter(l => l.indexOf(':') !== -1);

    if (validLines.length === 0 && lines.length > 0) {
        // Fallback for single text block without key-value colons
        return renderQuoteBlock(marked.parseInline(text.trim()));
    }

    let html = `<div class="grid grid-cols-3 gap-8 py-8 border-y border-white/10 my-12 text-sm w-full max-w-[640px] px-6 mx-auto">`;

    lines.forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return;
        const label = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim();
        html += `
        <div>
            <div class="text-white/50 uppercase tracking-widest text-[10px] mb-2">${label}</div>
            <div class="font-medium">${val}</div>
        </div>`;
    });

    html += `</div>`;
    return html;
}
