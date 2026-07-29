/**
 * Custom marked renderer for headings.
 *
 * Features:
 * - Applies Tailwind size/weight/spacing classes per heading level.
 * - Supports `::` overline syntax: `## LABEL :: Title Text`
 * - On H1, automatically prepends category + read time from projectMeta
 *   when no `::` overline is present.
 *
 * @param {object|null} projectMeta - The current project's metadata from projects.json.
 * @returns {Function} A marked renderer function for headings.
 */
export function createHeadingRenderer(projectMeta) {
    return function (token) {
        let parsedText = this.parser.parseInline(token.tokens);
        const level = token.depth;

        const sizes = {
            1: { class: 'text-4xl md:text-5xl font-medium mb-8 text-white leading-tight', mt: 'mt-16', maxW: 'max-w-[840px]' },
            2: { class: 'text-3xl md:text-4xl font-medium mb-6 text-white', mt: 'mt-12', maxW: 'max-w-[640px]' },
            3: { class: 'text-2xl font-medium mb-4 text-white', mt: 'mt-8', maxW: 'max-w-[640px]' },
            4: { class: 'text-xl font-medium mb-4 text-white', mt: 'mt-6', maxW: 'max-w-[640px]' },
        };
        const style = sizes[level] || sizes[4];

        let overlineHtml = '';
        let headingMt = style.mt;

        if (parsedText.includes('::')) {
            // Explicit overline via :: syntax
            const parts = parsedText.split('::');
            const overline = parts[0].trim();
            parsedText = parts.slice(1).join('::').trim();

            overlineHtml = `<div class="text-[12px] font-medium uppercase tracking-[0.1em] text-white/50 mb-2 ${style.mt} ${style.maxW} px-6 mx-auto">${overline}</div>`;
            headingMt = 'mt-0';
        } else if (level === 1 && projectMeta) {
            // Auto-inject category + read time above the page title
            const cat = projectMeta.category || '';
            const readTime = projectMeta.readTime || '';
            const metaText = [cat, readTime].filter(Boolean).join(' &bull; ');

            if (metaText) {
                overlineHtml = `<div class="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.1em] text-white/50 mb-4 ${style.mt} ${style.maxW} px-6 mx-auto">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#ff5b00]"></span>
                    <span>${metaText}</span>
                </div>`;
                headingMt = 'mt-0';
            }
            
            // Override markdown H1 text with the source-of-truth title from projects.json
            if (projectMeta.title) {
                parsedText = projectMeta.title;
            }
        }

        return `${overlineHtml}<h${level} class="${style.class} ${headingMt} ${style.maxW} px-6 mx-auto">${parsedText}</h${level}>`;
    };
}
