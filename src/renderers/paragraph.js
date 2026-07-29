/**
 * Custom marked renderer for paragraphs.
 *
 * Passes image-only and raw-HTML paragraphs through without extra wrapper styling,
 * and applies the standard body text classes to all other paragraphs.
 *
 * @returns {Function} A marked renderer function for paragraphs.
 */
export function createParagraphRenderer() {
    return function (token) {
        const parsedText = this.parser.parseInline(token.tokens);
        const isImageOnly = token.tokens && token.tokens.length === 1 && token.tokens[0].type === 'image';
        const isRawHtml = parsedText.trim().startsWith('<img') || parsedText.trim().startsWith('<div');

        if (isImageOnly || isRawHtml) {
            return `<div class="mb-12">${parsedText}</div>`;
        }

        return `<p class="text-lg text-white/70 leading-relaxed mb-6 max-w-[640px] px-6 mx-auto">${parsedText}</p>`;
    };
}
