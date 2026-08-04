/**
 * Custom marked renderer for images.
 *
 * Handles two cases:
 * 1. `![text](placeholder)` — Renders the project's cover image from projectMeta,
 *    or a styled placeholder div if no image URL is available.
 * 2. All other images — Rendered as full-bleed styled images.
 *
 * Banner/cover/placeholder images use the wider max-w-[840px] container;
 * all others use the standard max-w-[640px].
 *
 * @param {object|null} projectMeta - The current project's metadata from projects.json.
 * @returns {Function} A marked renderer function for images.
 */
export function createImageRenderer(projectMeta) {
    return function (token) {
        const rawAlt = token.text || '';
        const layoutPrefixRegex = /^(wide|big|large|full|banner|cover)\b\s*:|^\[(wide|big|large|full|banner|cover)\]/i;
        const isFullWidth = layoutPrefixRegex.test(rawAlt.trim()) || token.href === 'placeholder';

        const widthClass = isFullWidth ? 'max-w-[840px] px-6 mx-auto w-full' : 'max-w-[640px] px-6 mx-auto w-full';

        if (token.href === 'placeholder') {
            if (projectMeta && projectMeta.imageUrl) {
                return `<div class="${widthClass} my-12"><img src="${projectMeta.imageUrl}" alt="${projectMeta.imageText || rawAlt}" class="w-full h-auto rounded-2xl sm:rounded-[2.5rem] ghost-border block object-cover"></div>`;
            }
            // Styled placeholder block
            return `<div class="${widthClass} my-12">
                <div class="w-full aspect-[16/9] bg-surface-container rounded-2xl sm:rounded-[2.5rem] overflow-hidden ghost-border relative">
                    <div class="absolute inset-0 bg-outline-variant/50 flex items-center justify-center text-white/20 uppercase tracking-widest text-xs">${rawAlt}</div>
                </div>
            </div>`;
        }

        // Extract caption text from markdown title attribute OR alt text
        let captionText = token.title || '';
        if (!captionText && rawAlt) {
            // Strip layout keywords if prefix (e.g., "wide : Caption text" or "[wide] Caption text")
            const cleanAlt = rawAlt.replace(/^\[(wide|big|large|full|banner|cover)\]\s*|^(wide|big|large|full|banner|cover)\s*:\s*/i, '').trim();
            const cleanAltLower = cleanAlt.toLowerCase();
            const layoutKeywords = ['wide', 'big', 'large', 'full', 'banner', 'cover', 'placeholder'];

            if (cleanAlt && !layoutKeywords.includes(cleanAltLower)) {
                captionText = cleanAlt;
            }
        }

        const captionHtml = captionText ? `<p class="font-body text-xs sm:text-sm text-white/60 text-center mt-2.5 sm:mt-3 leading-relaxed px-2">${captionText}</p>` : '';

        return `
        <div class="${widthClass} my-2 sm:my-4 flex flex-col items-center">
            <img src="${token.href}" alt="${captionText || rawAlt}" class="w-full h-auto rounded-2xl sm:rounded-[2.5rem] ghost-border block">
            ${captionHtml}
        </div>`;
    };
}
