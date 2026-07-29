import { marked } from 'marked';
import { createHeadingRenderer } from './heading.js';
import { createParagraphRenderer } from './paragraph.js';
import { createListRenderer } from './list.js';
import { createImageRenderer } from './image.js';
import { createCodeBlockRenderer } from './code-blocks/index.js';

/**
 * Builds and registers a complete custom marked renderer.
 *
 * Must be called once per case study page load with the correct projectMeta,
 * as the heading and image renderers depend on it to inject dynamic content.
 *
 * @param {object|null} projectMeta - The current project's metadata from projects.json.
 */
export function buildRenderer(projectMeta) {
    marked.setOptions({ breaks: true, gfm: true });

    const renderer = new marked.Renderer();

    renderer.heading   = createHeadingRenderer(projectMeta);
    renderer.paragraph = createParagraphRenderer();
    renderer.list      = createListRenderer();
    renderer.image     = createImageRenderer(projectMeta);
    renderer.code      = createCodeBlockRenderer();

    renderer.hr = function () {
        return '<div class="w-full border-t border-white/10 my-24"></div>';
    };

    marked.use({ renderer });
}
