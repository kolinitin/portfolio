/**
 * Shared navigation component.
 *
 * Injects the global header and footer into every page.
 * The active nav link is highlighted based on `data-page` attribute on <body>.
 *
 * Usage: add `data-page="about"` (or "work", "index", "case-study") to <body>.
 */

const NAV_LINKS = [
    { href: 'about.html', label: 'About', page: 'about' },
    { href: 'work.html', label: 'Work', page: 'work' },
    // { href: 'index.html#leadership', label: 'Leadership', page: null },
    { href: 'https://www.linkedin.com/in/nitinkoli/', label: 'LinkedIn', page: null, target: '_blank' },
];

const EXTERNAL_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block -mt-0.5"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`;

function buildNavLinks(activePage, isMobile = false) {
    return NAV_LINKS.map(({ href, label, page, target }) => {
        const isActive = page && page === activePage;
        const activeClass = isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white';
        const icon = target === '_blank' ? EXTERNAL_ICON : '';
        const paddingClass = isMobile ? 'py-3 text-base border-b border-white/5' : 'text-[14px] font-medium';
        return `<a href="${href}" class="${paddingClass} transition-colors inline-flex items-center gap-1.5 ${activeClass}" ${target ? `target="${target}" rel="noopener noreferrer"` : ''}>${label}${icon}</a>`;
    }).join('');
}

function buildHeader(activePage) {
    const isCaseStudy = activePage === 'case-study';
    const desktopNavRight = isCaseStudy
        ? `<a href="work.html" class="font-display text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2">&larr; Back to Work</a>`
        : `<nav class="hidden md:flex gap-8 items-center" aria-label="Desktop Navigation">${buildNavLinks(activePage)}</nav>`;

    const mobileNavRight = isCaseStudy
        ? `<a href="work.html" class="md:hidden font-display text-sm font-medium text-white/70 hover:text-white transition-colors">&larr; Back</a>`
        : `<button id="mobile-menu-toggle" class="md:hidden p-2 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg" aria-label="Toggle navigation menu" aria-expanded="false">
                <svg id="menu-icon-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="block"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                <svg id="menu-icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
           </button>`;

    return `
    <header class="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5 h-20 flex items-center">
        <div class="max-w-[840px] w-full mx-auto px-6 flex justify-between items-center">
            <a href="/" class="font-display text-xl font-semibold tracking-tight text-white/90 hover:text-white transition-colors flex items-center gap-3">
                <img src="https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/dp-clean-front%201.png" alt="Nitin Koli" class="w-10 h-10 rounded-full object-cover ghost-border" width="40" height="40" loading="eager">
                Nitin Koli
            </a>
            ${desktopNavRight}
            ${mobileNavRight}
        </div>
        <!-- Mobile Dropdown Navigation Drawer -->
        ${!isCaseStudy ? `
        <div id="mobile-menu-drawer" class="hidden md:hidden fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all duration-200">
            <nav class="flex flex-col gap-2" aria-label="Mobile Navigation">
                ${buildNavLinks(activePage, true)}
            </nav>
        </div>` : ''}
    </header>`;
}

function buildFooter() {
    return `
    <footer class="border-t border-white/10 py-12">
        <div class="max-w-[840px] w-full mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex gap-6 text-white/70 font-medium text-sm">
                <a href="https://www.linkedin.com/in/nitinkoli/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors flex items-center gap-1">
                    LinkedIn ${EXTERNAL_ICON}
                </a>
                <a href="https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/Resume-Nitin-Koli.pdf" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
                    Download CV
                </a>
            </div>
            <div class="text-xs uppercase tracking-widest text-white/50">
                &copy; ${new Date().getFullYear()} Nitin Koli
            </div>
        </div>
    </footer>`;
}

/**
 * Injects the shared header and footer into the document.
 * Call this once on DOMContentLoaded.
 */
export function initNav() {
    const activePage = document.body.dataset.page || '';

    const headerPlaceholder = document.getElementById('site-header');
    const footerPlaceholder = document.getElementById('site-footer');

    if (headerPlaceholder) headerPlaceholder.outerHTML = buildHeader(activePage);
    if (footerPlaceholder) footerPlaceholder.outerHTML = buildFooter();

    // Attach mobile menu toggle event listener
    const menuToggleBtn = document.getElementById('mobile-menu-toggle');
    const menuDrawer = document.getElementById('mobile-menu-drawer');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');

    if (menuToggleBtn && menuDrawer) {
        menuToggleBtn.addEventListener('click', () => {
            const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
            menuToggleBtn.setAttribute('aria-expanded', !isExpanded);
            menuDrawer.classList.toggle('hidden');
            if (iconOpen && iconClose) {
                iconOpen.classList.toggle('hidden');
                iconClose.classList.toggle('hidden');
            }
        });
    }
}
