import { renderScreens } from './screens.js';

/**
 * Custom marked renderer for `screen` code blocks.
 *
 * Renders a single standalone screen or delegates to horizontal scroll for multiple items.
 *
 * @param {string} text - Raw code block text.
 * @param {string} lang - Language tag (e.g. `screen`, `screen:small`, `screen:big`).
 * @returns {string} HTML string.
 */
export function renderScreen(text, lang = '') {
    const rawLines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (rawLines.length === 0) return '';

    // If multiple lines or size tag present in lang, delegate to renderScreens
    if (rawLines.length > 1 || (lang && (lang.includes(':') || lang.includes('small') || lang.includes('big')))) {
        return renderScreens(text, lang);
    }

    const rawLine = rawLines[0];
    if (!rawLine) return '';

    const parts = rawLine.split(/\s+:\s+/).map(p => p.trim());

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

    if (!mediaUrl) return '';

    const isVideo = Boolean(mediaUrl.match(/\.(mp4|webm|mov)(\?.*)?$/i));

    const mediaHtml = isVideo
        ? `<video src="${mediaUrl}" autoplay loop muted playsinline class="w-full h-auto rounded-[1.75rem] block object-cover"></video>`
        : `<img src="${mediaUrl}" alt="${caption || title || 'Screen preview'}" class="w-full h-auto rounded-[1.75rem] block object-cover" />`;

    const titleHtml = title
        ? `<div class="mt-4"><span class="font-display px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">${title}</span></div>`
        : '';

    const captionHtml = caption
        ? `<p class="font-body text-xs sm:text-sm text-white/70 text-center px-4 leading-relaxed mt-2">${caption}</p>`
        : '';

    return `
    <div class="gsap-reveal w-full max-w-[340px] sm:max-w-[380px] mx-auto my-12 flex flex-col items-center select-none">
        <!-- CSS Mobile Device Frame -->
        <div class="relative w-full rounded-[2.25rem] bg-[#1a1b1e] border-[6px] border-[#2b2c30] shadow-2xl p-2 ghost-border">
            <!-- Dynamic Island / Top Speaker Bar -->
            <div class="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center gap-1.5 opacity-90">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0d0d0e]"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-[#16171a]"></span>
            </div>
            <!-- Screen Media Container -->
            <div class="relative w-full overflow-hidden rounded-[1.75rem] bg-black">
                ${mediaHtml}
            </div>
        </div>
        ${titleHtml}
        ${captionHtml}
    </div>
    `;
}
