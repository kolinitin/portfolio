import { marked } from 'marked';
import { renderQuoteBlock } from '../blockquote.js';
import { renderMetadata } from './metadata.js';
import { renderSummary } from './summary.js';
import { renderPointers } from './pointers.js';
import { renderTimeline } from './timeline.js';
import { renderPipeline } from './pipeline.js';
import { renderResults } from './results.js';
import { renderVideo } from './video.js';
import { renderEvolution } from './evolution.js';
import { renderScreen } from './screen.js';
import { renderScreens } from './screens.js';

/**
 * Dispatcher for all custom fenced code block types.
 *
 * Dispatches to the appropriate renderer based on `token.lang`.
 * Falls back to a plain `<pre><code>` block for unknown languages.
 *
 * @param {object} token - The marked code token.
 * @returns {string} HTML string.
 */
export function createCodeBlockRenderer() {
    return function (token) {
        const lang = (token.lang || '').toLowerCase().trim();

        if (lang === 'quote' || lang === 'highlight' || lang === 'callout') {
            return renderQuoteBlock(marked.parseInline(token.text.trim()));
        }

        if (lang === 'metadata') return renderMetadata(token.text);
        if (lang === 'summary') return renderSummary(token.text);
        if (lang === 'pointers') return renderPointers(token.text);
        if (lang.startsWith('timeline')) return renderTimeline(token.text);
        if (lang.startsWith('pipeline') || lang.startsWith('flow')) return renderPipeline(token.text);
        if (lang === 'results') return renderResults(token.text);
        if (lang === 'video') return renderVideo(token.text);
        if (lang.startsWith('evolution')) return renderEvolution(token.text, token.lang || lang);

        if (lang.startsWith('screens') || lang.startsWith('screen-scroll') || lang.startsWith('screens-scroll')) {
            return renderScreens(token.text, lang);
        }

        if (lang.startsWith('screen')) {
            return renderScreen(token.text, lang);
        }

        return `<pre class="max-w-[640px] px-6 mx-auto"><code>${token.text}</code></pre>`;
    };
}
