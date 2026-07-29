import { renderMetadata } from './metadata.js';
import { renderSummary } from './summary.js';
import { renderPointers } from './pointers.js';
import { renderResults } from './results.js';
import { renderVideo } from './video.js';
import { renderEvolution } from './evolution.js';
import { renderScreen } from './screen.js';

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
        switch (token.lang) {
            case 'metadata':  return renderMetadata(token.text);
            case 'summary':   return renderSummary(token.text);
            case 'pointers':  return renderPointers(token.text);
            case 'results':   return renderResults(token.text);
            case 'video':     return renderVideo(token.text);
            case 'evolution': return renderEvolution(token.text);
            case 'screen':    return renderScreen(token.text);
            default:
                return `<pre class="max-w-[640px] px-6 mx-auto"><code>${token.text}</code></pre>`;
        }
    };
}
