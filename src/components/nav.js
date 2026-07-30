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
    { href: 'https://www.linkedin.com/in/nitinkoli/', label: 'Linkedin', page: null, target: '_blank' },
];

const EXTERNAL_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block -mt-0.5"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`;

function buildNavLinks(activePage) {
    return NAV_LINKS.map(({ href, label, page, target }) => {
        const isActive = page && page === activePage;
        const activeClass = isActive ? 'text-white' : '';
        const icon = target === '_blank' ? EXTERNAL_ICON : '';
        return `<a href="${href}" class="font-medium hover:text-white transition-colors inline-flex items-center gap-1 ${activeClass}" ${target ? `target="${target}"` : ''}>${label}${icon}</a>`;
    }).join('');
}

function buildHeader(activePage) {
    const isCaseStudy = activePage === 'case-study';
    const navRight = isCaseStudy
        ? `<a href="work.html" class="font-display text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-2">&larr; Back to Work</a>`
        : `<nav class="hidden md:flex gap-8 text-[14px] font-medium text-white/60">${buildNavLinks(activePage)}</nav>`;

    return `
    <header class="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5 h-20 flex items-center">
        <div class="max-w-[840px] w-full mx-auto px-6 flex justify-between items-center">
            <a href="/" class="font-display text-xl font-semibold tracking-tight text-white/90 hover:text-white transition-colors flex items-center gap-3">
                <img src="https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/dp-clean-front%201.png" alt="Nitin Koli" class="w-10 h-10 rounded-full object-cover ghost-border">
                Nitin Koli
            </a>
            ${navRight}
        </div>
    </header>`;
}

function buildFooter() {
    return `
    <footer class="border-t border-white/5 py-12">
        <div class="max-w-[840px] w-full mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex gap-6 text-white/50">
                <a href="#" class="hover:text-white transition-colors">LinkedIn</a>
            </div>
            <div class="text-[10px] uppercase tracking-widest text-white/30">
                &copy; 2026 Nitin Koli
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
}
