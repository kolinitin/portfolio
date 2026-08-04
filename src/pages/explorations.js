import { initAnimations } from '../animations.js';

/**
 * Builds the HTML string for a single exploration card.
 *
 * @param {object} item - An exploration entry from explorations.json.
 * @param {boolean} isLast - Whether this card is the last item in the list.
 * @returns {string} HTML string.
 */
function renderExplorationCard(item, isLast) {
    const borderClass = isLast ? '' : 'border-b border-white/10 pb-12 sm:pb-16';
    const targetAttr = item.isExternal !== false ? 'target="_blank" rel="noopener noreferrer"' : '';
    const linkText = item.linkText || 'View Prototype';
    const imageAlt = item.imageAlt || `${item.title} Preview`;
    const imageHtml = item.imageUrl
        ? `<img src="${item.imageUrl}" alt="${imageAlt}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">`
        : `<div class="absolute inset-0 bg-outline-variant/50 flex items-center justify-center text-white/20 uppercase tracking-widest text-xs transition-colors group-hover:bg-outline-variant/70">${imageAlt}</div>`;

    return `
    <div class="gsap-reveal ${borderClass}">
        <a href="${item.linkUrl}" ${targetAttr} class="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 group focus-visible:outline-none">
            <!-- Left Thumbnail Space -->
            <div class="w-full sm:w-[200px] md:w-[240px] shrink-0 aspect-[16/10] sm:aspect-[4/3] rounded-xl bg-surface-container ghost-border overflow-hidden relative group-hover:border-white/20 transition-colors">
                ${imageHtml}
            </div>

            <!-- Right Content -->
            <div class="flex-1 flex flex-col justify-between w-full">
                <div>
                    <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-accent transition-colors mb-3">
                        ${item.title}
                    </h2>
                    <p class="text-sm sm:text-base text-white/70 leading-relaxed">
                        ${item.description}
                    </p>
                </div>
                <div class="mt-6 flex items-center gap-1.5 text-xs font-medium text-white/60 group-hover:text-accent transition-colors">
                    <span class="border-b border-transparent group-hover:border-accent transition-colors">${linkText}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                    </svg>
                </div>
            </div>
        </a>
    </div>`;
}

/**
 * Initialises the explorations list container.
 *
 * Fetches explorations.json, renders all exploration cards into the container,
 * and initialises scroll-reveal animations on the new elements.
 *
 * @param {Element} container - The `#explorations-container` DOM element.
 */
export async function initExplorationsList(container) {
    try {
        const explorations = await fetch('./content/explorations.json').then(res => res.json());
        const total = explorations.length;
        container.innerHTML = explorations.map((item, index) => renderExplorationCard(item, index === total - 1)).join('');
        initAnimations(container);
    } catch (err) {
        console.error('Error loading explorations:', err);
        container.innerHTML = `<div class="text-white/50 text-center py-20">Could not load explorations.</div>`;
    }
}
