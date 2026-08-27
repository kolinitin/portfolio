import { marked } from 'marked';

/**
 * Single source of truth for rendering quote callout blocks with a rounded vertical line.
 *
 * @param {string} content - HTML or parsed inline markdown to display inside the quote.
 * @returns {string} HTML string.
 */
export function renderQuoteBlock(content) {
    return `
    <blockquote class="my-10 max-w-[640px] px-6 mx-auto">
        <div class="flex gap-5 md:gap-6 items-stretch">
            <div class="w-[4px] bg-white/40 rounded-full shrink-0"></div>
            <div class="py-1 text-lg md:text-xl font-normal text-white/90 leading-relaxed [&>p]:mb-0 [&>p]:max-w-none [&>p]:px-0 [&>p]:mx-0 [&>p]:text-lg [&>p]:md:text-xl [&>p]:font-normal [&>p]:text-white/90 [&>p]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-white">
                ${content}
            </div>
        </div>
    </blockquote>`;
}

/**
 * Custom marked renderer for standard markdown blockquotes (`> text`).
 *
 * @returns {Function} A marked renderer function for blockquotes.
 */
export function createBlockquoteRenderer() {
    return function (token) {
        const parsedContent = this.parser.parse(token.tokens);
        return renderQuoteBlock(parsedContent);
    };
}
