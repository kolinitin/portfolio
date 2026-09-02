import './styles.css';
import { initNav } from './src/components/nav.js';
import { initAnimations } from './src/animations.js';
import { initProjectsGrid } from './src/pages/home.js';
import { initCaseStudy } from './src/pages/case-study.js';
import { initExplorationsList } from './src/pages/explorations.js';
import { initVideoPlayers } from './src/components/video-player.js';
import { initAssetLoader } from './src/components/asset-loader.js';
import { initTextGenerateEffect } from './src/components/text-generate-effect.js';

// Disable automatic browser scroll restoration immediately on script evaluation
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

    // Inject shared header and footer on every page
    initNav();

    // Text Generate Effect for hero title on home page
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        initTextGenerateEffect(heroTitle, {
            duration: 0.5,
            stagger: 0.08,
            blur: 10,
            delay: 0.1,
        });
    }

    // Animate any static .gsap-reveal elements present in the initial HTML
    initAnimations();

    // Initialize custom video players on static DOM
    initVideoPlayers();

    // Initialize asset loader for static page images and videos
    initAssetLoader();

    // Route to page-specific initialisation based on known DOM elements
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        initProjectsGrid(projectsContainer);
    }

    const explorationsContainer = document.getElementById('explorations-container');
    if (explorationsContainer) {
        initExplorationsList(explorationsContainer);
    }

    const caseStudyContainer = document.getElementById('markdown-content');
    if (caseStudyContainer) {
        initCaseStudy(caseStudyContainer);
    }
});

window.addEventListener('load', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});

window.addEventListener('pageshow', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});
