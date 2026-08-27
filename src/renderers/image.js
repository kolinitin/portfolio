import { parseAnnotation, renderAnnotation } from './annotation.js';

/**
 * Custom marked renderer for images.
 *
 * Supports layout size prefixes in alt text or brackets:
 * - Wide / Banner (840px): `![wide: Caption](url)` or `![wide](url)`
 * - Standard (640px): Default when no size prefix is specified
 * - Medium / Compact (480px): `![medium: Caption](url)` or `![compact: Caption](url)`
 * - Small / Narrow (380px): `![small: Caption](url)` or `![narrow: Caption](url)`
 * - Extra Small (280px): `![xs: Caption](url)` or `![tiny: Caption](url)`
 * - Custom pixel width: `![380: Caption](url)` or `![420px: Caption](url)` or `![small:400: Caption](url)`
 * - Annotations: `![small: Marquee player [annotate: right, 140px, Callout text]](url)`
 *
 * @param {object|null} projectMeta - The current project's metadata from projects.json.
 * @returns {Function} A marked renderer function for images.
 */
export function createImageRenderer(projectMeta) {
    return function (token) {
        const rawAlt = (token.text || '').trim();

        // 0. Parse annotation from alt text or title
        const annotation = parseAnnotation(rawAlt) || parseAnnotation(token.title || '');

        // 1. Check for explicit custom pixel width in alt text (e.g. 400: Caption, small:380, width:420, 360px, etc.)
        let customWidth = null;
        const numMatch = rawAlt.match(/^(?:w|width|size|small|medium|narrow|compact|wide|sm|md|lg)?[:=]?\s*(\d{3,4})\s*(?:px)?\b/i) ||
            rawAlt.match(/\[(?:w|width|size|small|medium|narrow|compact|wide|sm|md|lg)?[:=]?\s*(\d{3,4})\s*(?:px)?[\]]/i);
        if (numMatch) {
            const parsedVal = parseInt(numMatch[1], 10);
            if (parsedVal >= 150 && parsedVal <= 1200) {
                customWidth = parsedVal;
            }
        }

        // 2. Determine size category
        let sizeCategory = 'standard'; // default max-w-[640px]
        if (customWidth) {
            sizeCategory = 'custom';
        } else if (/^(wide|big|large|full|banner|cover)\b/i.test(rawAlt) || /\[(wide|big|large|full|banner|cover)\]/i.test(rawAlt) || token.href === 'placeholder') {
            sizeCategory = 'wide';
        } else if (/^(medium|compact|md)\b/i.test(rawAlt) || /\[(medium|compact|md)\]/i.test(rawAlt)) {
            sizeCategory = 'medium';
        } else if (/^(small|narrow|sm)\b/i.test(rawAlt) || /\[(small|narrow|sm)\]/i.test(rawAlt)) {
            sizeCategory = 'small';
        } else if (/^(xs|tiny|mini)\b/i.test(rawAlt) || /\[(xs|tiny|mini)\]/i.test(rawAlt)) {
            sizeCategory = 'xs';
        }

        // Determine width class
        let widthClass = 'max-w-[640px] px-6 mx-auto w-full';
        if (sizeCategory === 'custom') {
            widthClass = `max-w-[${customWidth}px] px-6 mx-auto w-full`;
        } else if (sizeCategory === 'wide') {
            widthClass = 'max-w-[840px] px-6 mx-auto w-full';
        } else if (sizeCategory === 'medium') {
            widthClass = 'max-w-[480px] px-6 mx-auto w-full';
        } else if (sizeCategory === 'small') {
            widthClass = 'max-w-[380px] px-6 mx-auto w-full';
        } else if (sizeCategory === 'xs') {
            widthClass = 'max-w-[280px] px-6 mx-auto w-full';
        }

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

        // Extract caption text from markdown title attribute OR clean alt text
        let captionText = token.title || '';
        if (!captionText && rawAlt) {
            const cleanAlt = rawAlt
                .replace(/\[(?:annotation|annotate|callout)\s*[:=]?\s*[^\]]+\]/gi, '')
                .replace(/(?:annotation|annotate|callout)\s*[:=]\s*[^:\n]+/gi, '')
                .replace(/^\[.*?\]\s*/, '')
                .replace(/^(?:wide|big|large|full|banner|cover|medium|compact|md|small|narrow|sm|xs|tiny|mini|w|width|size)?[:=]?\s*\d*(?:px)?\b\s*:\s*/i, '')
                .trim();

            const cleanAltLower = cleanAlt.toLowerCase();
            const layoutKeywords = ['wide', 'big', 'large', 'full', 'banner', 'cover', 'medium', 'compact', 'md', 'small', 'narrow', 'sm', 'xs', 'tiny', 'mini', 'placeholder'];

            if (cleanAlt && !layoutKeywords.includes(cleanAltLower)) {
                captionText = cleanAlt;
            }
        }

        const captionHtml = captionText ? `<p class="font-body text-xs sm:text-sm text-white/60 text-center mt-2.5 sm:mt-3 leading-relaxed px-2">${captionText}</p>` : '';

        const annotationHtml = renderAnnotation(annotation);
        const annotationPaddingClass = annotation
            ? (annotation.side === 'left' ? 'sm:pl-[340px]' : 'sm:pr-[340px]')
            : '';

        return `
        <div class="${widthClass} my-2 sm:my-4 flex flex-col items-center ${annotationPaddingClass}">
            <div class="relative w-full overflow-visible">
                <img src="${token.href}" alt="${captionText || rawAlt}" class="w-full h-auto rounded-xl sm:rounded-[1.5rem] ghost-border block">
                ${annotationHtml}
            </div>
            ${captionHtml}
        </div>`;
    };
}
