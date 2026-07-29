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
        const altLower = (token.text || '').toLowerCase();
        const isFullWidth = altLower.includes('banner') || altLower.includes('cover') || altLower.includes('placeholder') || token.href === 'placeholder';
        const widthClass = isFullWidth ? 'max-w-[840px] px-6 mx-auto w-full' : 'max-w-[640px] px-6 mx-auto w-full';

        if (token.href === 'placeholder') {
            if (projectMeta && projectMeta.imageUrl) {
                return `<div class="${widthClass} my-12"><img src="${projectMeta.imageUrl}" alt="${projectMeta.imageText || token.text}" class="w-full h-auto rounded-[2.5rem] ghost-border block object-cover"></div>`;
            }
            // Styled placeholder block
            return `<div class="${widthClass} my-12">
                <div class="w-full aspect-[16/9] bg-surface-container rounded-[2.5rem] overflow-hidden ghost-border relative">
                    <div class="absolute inset-0 bg-outline-variant/50 flex items-center justify-center text-white/20 uppercase tracking-widest text-xs">${token.text}</div>
                </div>
            </div>`;
        }

        return `<div class="${widthClass} my-12"><img src="${token.href}" alt="${token.text}" class="w-full h-auto rounded-[2.5rem] ghost-border block"></div>`;
    };
}
