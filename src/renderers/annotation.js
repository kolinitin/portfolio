/**
 * Utility to parse annotation parameters from text lines or bracket tags.
 *
 * Supported formats:
 * 1) Positional: `annotation: side, y, x, text`
 *    e.g. `annotation: left, y=600px, x=68px, Dedicated my matches page entry point.`
 *    e.g. `annotation: left, 220px, Carousel occupies vertical real estate...`
 *
 * 2) Key-value: `annotation: side, y=600px, x=35%, text`
 *    e.g. `annotation: left, y: 600px, x: 35%, Dedicated my matches page entry point.`
 *
 * @param {string} text - Raw input text or line string.
 * @returns {object|null} { side: 'left'|'right', y: string, x: string, text: string }
 */
export function parseAnnotation(text) {
    if (!text) return null;

    const match = text.match(/(?:annotation|annotate|callout)\s*[:=]\s*([^\]\n]+)/i) ||
        text.match(/\[(?:annotation|annotate|callout)\s*[:=]?\s*([^\]]+)\]/i);

    if (!match) return null;

    const rawStr = match[1].trim();
    const parts = rawStr.split(/[,|]/).map(p => p.trim()).filter(Boolean);

    let side = 'right';
    let y = '120px';
    let x = null;
    let caption = '';

    parts.forEach(part => {
        const lower = part.toLowerCase();
        if (lower === 'left' || lower === 'right') {
            side = lower;
        } else if (lower.match(/^side[:=]/i)) {
            side = part.replace(/^side[:=]/i, '').trim().toLowerCase() === 'left' ? 'left' : 'right';
        } else if (lower.match(/^(y|top)[:=]/i)) {
            const val = part.replace(/^(y|top)[:=]/i, '').trim();
            y = val.endsWith('%') || val.endsWith('px') ? val : `${val}px`;
        } else if (lower.match(/^(x|left)[:=]/i) && !lower.match(/^left$/i)) {
            const val = part.replace(/^(x|left)[:=]/i, '').trim();
            x = val.endsWith('%') || val.endsWith('px') ? val : `${val}px`;
        } else if (part.match(/^\d+(?:\.\d+)?(px|%|\b)$/)) {
            const numVal = part.endsWith('%') || part.endsWith('px') ? part : `${part}px`;
            if (y === '120px' && !x) {
                y = numVal;
            } else {
                x = numVal;
            }
        } else if (lower !== 'light' && lower !== 'dark' && !lower.match(/^(surface|bg|theme)[:=]/i)) {
            caption = caption ? `${caption}, ${part}` : part;
        }
    });

    if (!caption) return null;
    if (!x) {
        x = side === 'left' ? '25%' : '75%';
    }

    return { side, y, x, text: caption };
}

/**
 * Renders a sleek, solid node-connector annotation overlay (based on node flow diagrams).
 * Uses a solid filled circle and clean line start offset to prevent any line bleed behind the dot.
 *
 * @param {object} annotation - { side: 'left'|'right', y: string, x: string, text: string }
 * @returns {string} HTML string.
 */
export function renderAnnotation(annotation) {
    if (!annotation) return '';

    const isLeft = annotation.side === 'left';
    const yVal = annotation.y;
    const xVal = annotation.x;

    const cardPositionClass = isLeft
        ? 'right-[calc(100%+28px)] text-left'
        : 'left-[calc(100%+28px)] text-left';

    // 100% solid opaque line and dot color (medium silver-slate)
    const lineColor = '#a5a0b9';

    // Offset line start by 4px so it connects to the outer edge of the dot rather than extending under its center
    const lineStyle = isLeft
        ? `top: ${yVal}; right: calc(100% - ${xVal} + 4px); left: -28px; border-top: 1.5px solid ${lineColor}; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5)); transform: translateY(-50%);`
        : `top: ${yVal}; left: calc(${xVal} + 4px); right: -28px; border-top: 1.5px solid ${lineColor}; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5)); transform: translateY(-50%);`;

    return `
    <!-- Annotation Component Overlay -->
    <div class="annotation-overlay absolute inset-0 pointer-events-none z-30 select-none">
        <!-- Target Dot (Solid Filled Circle Matching Line Color) -->
        <div class="annotation-dot absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
             style="left: ${xVal}; top: ${yVal};">
            <div class="w-2.5 h-2.5 rounded-full bg-[#a5a0b9] shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            </div>
        </div>

        <!-- Solid Connector Line (Offset to connect to outer edge of dot) -->
        <div class="annotation-line absolute pointer-events-none z-20"
             style="${lineStyle}">
        </div>

        <!-- Outer Annotation Text Card -->
        <div class="annotation-card absolute ${cardPositionClass} w-[160px] sm:w-[220px] max-w-[calc(100vw-32px)] bg-[#181620]/95 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.75)] z-30 pointer-events-auto"
             style="top: ${yVal}; transform: translateY(-50%);">
            <p class="font-body text-[12px] sm:text-[13px] text-white/90 leading-relaxed font-normal tracking-normal">${annotation.text}</p>
        </div>
    </div>`;
}
