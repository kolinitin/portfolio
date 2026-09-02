/**
 * Shared navigation component.
 *
 * Injects the global header and footer into every page.
 * The active nav link is highlighted based on `data-page` attribute on <body>.
 *
 * Usage: add `data-page="about"` (or "work", "index", "case-study") to <body>.
 */

const NAV_LINKS = [
    { href: 'work.html', label: 'Work', page: 'work' },
    // { href: 'explorations.html', label: 'Explorations', page: 'explorations' },
    { href: 'about.html', label: 'About', page: 'about' },
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
    <div id="final-cta-wrapper" class="relative overflow-hidden border-t border-white/10 bg-transparent">
        <!-- Particle Canvas (Spans both CTA and Footer) -->
        <canvas id="cta-particle-canvas" class="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-75" aria-hidden="true"></canvas>

        <!-- Seamless Ambient Horizon Glow (Radiates from the very bottom of the page) -->
        <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_75%_at_50%_100%,rgba(37,99,235,0.18),transparent_80%)]" aria-hidden="true"></div>

        <!-- Final CTA Section -->
        <section id="final-cta" class="pt-20 pb-20 md:pt-28 md:pb-24 min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center items-center text-center gsap-reveal relative z-10">
            <div class="max-w-[840px] w-full mx-auto px-6 flex flex-col items-center">
                <!-- Small Title (Sentence Case) -->
                <span class="font-display text-sm sm:text-base font-medium text-accent mb-3 block tracking-wide">
                    Let’s build something meaningful.
                </span>

                <!-- Prominent Email ID -->
                <a href="mailto:kolinitin89@gmail.com" class="font-display text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium tracking-tight text-white hover:text-accent transition-colors duration-300 mb-4 break-all sm:break-normal inline-block leading-tight">
                    kolinitin89@gmail.com
                </a>

                <!-- Subtle Supporting Text -->
                <p class="font-body text-sm sm:text-base text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
                    Have a complex product problem worth solving? Let’s talk.
                </p>

                <!-- Primary LinkedIn CTA -->
            <div>
                <a href="https://www.linkedin.com/in/nitinkoli/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] text-white font-medium text-sm transition-all duration-300 shadow-[0_0_24px_rgba(37,99,235,0.4)] hover:shadow-[0_0_36px_rgba(37,99,235,0.65)] hover:scale-[1.04] active:scale-[0.98]">
                    <span class="leading-none">LinkedIn</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M7 7h10v10"/><path d="M17 7 7 17"/></svg>
                </a>
            </div>
            </div>
        </section>

        <!-- Footer Nav (Transparent background letting gradient & particles pass through to very bottom) -->
        <footer class="py-12 border-t border-white/5 bg-transparent relative z-10">
            <div class="max-w-[840px] w-full mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="flex gap-6 text-white/70 font-medium text-sm">
                    <a href="https://pub-74f51145ab1c46dcabc851a4cda5d6a0.r2.dev/Resume-Nitin-Koli.pdf" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
                        Download CV
                    </a>
                </div>
                <div class="text-xs uppercase tracking-widest text-white/50">
                    &copy; ${new Date().getFullYear()} Nitin Koli
                </div>
            </div>
        </footer>
    </div>`;
}

function initCtaParticles() {
    const canvas = document.getElementById('cta-particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    let animationFrameId = null;
    let width = 0;
    let height = 0;
    let particles = [];
    const PARTICLE_COUNT = 50;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        // Reset transform matrix before scaling to prevent compounding scale growth on resize
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticle() {
        return {
            x: Math.random() * (width || 800),
            y: Math.random() * (height || 400),
            radius: Math.random() * 0.9 + 0.3, // Strictly capped micro star-dust radius (0.3px - 1.2px)
            baseAlpha: Math.random() * 0.35 + 0.15,
            alpha: Math.random() * 0.35 + 0.15,
            alphaSpeed: (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
            vx: (Math.random() - 0.5) * 0.15,
            vy: -Math.random() * 0.2 - 0.05,
            color: Math.random() > 0.35 ? '255, 255, 255' : (Math.random() > 0.5 ? '147, 197, 253' : '210, 159, 34')
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }
    }

    function draw() {
        if (!width || !height) return;
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;

            p.alpha += p.alphaSpeed;
            if (p.alpha > p.baseAlpha + 0.2 || p.alpha < 0.05) {
                p.alphaSpeed = -p.alphaSpeed;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, Math.min(1, p.alpha))})`;
            ctx.fill();
        }

        animationFrameId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();

    const section = document.getElementById('final-cta-wrapper') || document.getElementById('final-cta');
    if (section && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationFrameId) {
                        animationFrameId = requestAnimationFrame(draw);
                    }
                } else {
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                }
            });
        }, { threshold: 0.05 });
        observer.observe(section);
    } else {
        animationFrameId = requestAnimationFrame(draw);
    }

    if (section && 'ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(() => {
            resize();
        });
        resizeObserver.observe(section);
    } else {
        window.addEventListener('resize', resize, { passive: true });
    }
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
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = buildFooter();
        initCtaParticles();
    }

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
