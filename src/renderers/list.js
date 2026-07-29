/**
 * Custom marked renderer for ordered and unordered lists.
 *
 * Uses `list-outside` so multi-line list items align under the first letter,
 * not under the bullet point.
 *
 * @returns {Function} A marked renderer function for lists.
 */
export function createListRenderer() {
    return function (token) {
        const type = token.ordered ? 'ol' : 'ul';
        const listStyle = token.ordered ? 'list-decimal' : 'list-disc';
        const classes = `${listStyle} list-outside text-lg text-white/70 space-y-2 mb-8 max-w-[640px] pl-12 pr-6 mx-auto`;

        let body = '';
        for (let i = 0; i < token.items.length; i++) {
            body += this.listitem(token.items[i]);
        }

        return `<${type} class="${classes}">\n${body}</${type}>\n`;
    };
}
