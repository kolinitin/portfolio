import { initAnimations, ScrollTrigger } from '../animations.js';
import { buildRenderer } from '../renderers/index.js';
import { initEvolutionCarousels } from '../components/evolution-carousel.js';
import { initHorizontalScrollReveals } from '../components/horizontal-scroll.js';
import { initVideoPlayers } from '../components/video-player.js';
import { initAssetLoader } from '../components/asset-loader.js';
import { marked } from 'marked';

/**
 * Initialises the case study page.
 *
 * Reads the `?id=` query param, fetches the matching markdown file and the
 * project metadata in parallel, builds the marked renderer (with metadata
 * injected), renders the markdown into the DOM, then refreshes scroll triggers.
 *
 * @param {Element} container - The `#markdown-content` DOM element.
 */
export async function initCaseStudy(container) {
    const urlParams = new URLSearchParams(window.location.search);
    const caseStudyId = urlParams.get('id');

    if (!caseStudyId) {
        container.innerHTML = `<div class="text-white/50 text-center py-20">No case study specified.</div>`;
        return;
    }

    try {
        const [mdText, projects] = await Promise.all([
            fetch(`./content/${caseStudyId}.md`).then(res => {
                if (!res.ok) throw new Error(`Case study "${caseStudyId}" not found.`);
                return res.text();
            }),
            fetch('./content/projects.json').then(res => res.json()).catch(() => []),
        ]);

        const projectMeta = projects.find(p => p.id === caseStudyId) || null;

        // Build renderer with the resolved projectMeta — fixes the hoisting bug
        // from the original code where currentProjectMeta was referenced before
        // it was assigned.
        buildRenderer(projectMeta);

        container.innerHTML = marked.parse(mdText);

        // Initialize scroll-pinned evolution carousels
        initEvolutionCarousels(container);

        // Initialize horizontal scroll reveals
        initHorizontalScrollReveals(container);

        // Initialize hover video player controls & seek bars
        initVideoPlayers(container);

        // Initialize asset loader for rendered markdown images and videos
        initAssetLoader(container);

        // Animate newly rendered content and refresh scroll trigger positions
        initAnimations(container);
        ScrollTrigger.refresh();
    } catch (error) {
        container.innerHTML = `
        <div class="text-white/50 text-center py-20">
            <h2 class="text-2xl mb-4">Error loading case study.</h2>
            <p>${error.message}</p>
            <a href="/" class="text-accent hover:underline mt-4 inline-block">Return home</a>
        </div>`;
    }
}
