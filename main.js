import './styles.css';
import { initNav } from './src/components/nav.js';
import { initAnimations } from './src/animations.js';
import { initProjectsGrid } from './src/pages/home.js';
import { initCaseStudy } from './src/pages/case-study.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inject shared header and footer on every page
    initNav();

    // Animate any static .gsap-reveal elements present in the initial HTML
    initAnimations();

    // Route to page-specific initialisation based on known DOM elements
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        initProjectsGrid(projectsContainer);
    }

    const caseStudyContainer = document.getElementById('markdown-content');
    if (caseStudyContainer) {
        initCaseStudy(caseStudyContainer);
    }
});
