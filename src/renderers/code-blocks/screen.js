/**
 * Custom marked renderer for `screen` code blocks.
 *
 * Renders a single standalone screen (image or video) inside a sleek CSS mobile device frame.
 *
 * Line syntax options:
 * 1) URL
 * 2) URL : CAPTION
 * 3) TITLE : URL : CAPTION
 *
 * Examples:
 * ```screen
 * https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/d11-leaderboard-16-17.png : Leaderboard screen with live mini-scorecard
 * ```
 *
 * @param {string} text - Raw code block text.
 * @returns {string} HTML string.
 */
export function renderScreen(text) {
    const rawLine = text.trim().split('\n')[0] || '';
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
