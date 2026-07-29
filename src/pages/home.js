import { initAnimations } from '../animations.js';

/**
 * Renders the dot indicator for a project card.
 * Uses `dotColor` from the project data if provided, otherwise defaults to orange.
 *
 * @param {object} project - A project entry from projects.json.
 * @returns {string} A Tailwind bg-color class.
 */
function getDotColor(project) {
    if (project.dotColor) return project.dotColor;
    // Sensible default: all categories get an orange dot
    return 'bg-orange-500';
}

/**
 * Builds the HTML for a single project card.
 *
 * @param {object} p - A project entry from projects.json.
 * @returns {string} HTML string.
 */
function renderProjectCard(p) {
    const dotColor = getDotColor(p);
    const imageHtml = p.imageUrl
        ? `<img src="${p.imageUrl}" alt="${p.imageText || p.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">`
        : `<div class="absolute inset-0 bg-outline-variant/50 flex items-center justify-center text-white/20 uppercase tracking-widest text-xs transition-colors group-hover:bg-outline-variant/70">${p.imageText || 'Project Image Placeholder'}</div>`;

    return `
    <div class="gsap-reveal">
        <a href="case-study.html?id=${p.id}" class="block group">
            <div class="w-full aspect-[16/9] bg-surface-container rounded-[2.5rem] overflow-hidden ghost-border mb-6 relative">
                ${imageHtml}
            </div>
            <div class="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/50 mb-3">
                <span class="w-2 h-2 rounded-full ${dotColor}"></span>
                ${p.category} &bull; ${p.readTime}
            </div>
            <h3 class="text-3xl font-medium mb-2 group-hover:text-accent transition-colors">${p.title}</h3>
        </a>
    </div>`;
}

/**
 * Initialises a projects grid container.
 *
 * Fetches projects.json, renders all project cards into the container,
 * and initialises scroll-reveal animations on the new elements.
 *
 * @param {Element} container - The `#projects-container` DOM element.
 */
export async function initProjectsGrid(container) {
    try {
        const projects = await fetch('/content/projects.json').then(res => res.json());
        container.innerHTML = projects.map(renderProjectCard).join('');
        initAnimations(container);
    } catch (err) {
        console.error('Error loading projects:', err);
        container.innerHTML = `<div class="text-white/50 text-center py-20">Could not load projects.</div>`;
    }
}
