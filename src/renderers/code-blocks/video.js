/**
 * Renders a ```video code block.
 *
 * Format: A single URL on its own line.
 * Renders an autoplaying, looped, muted video player in a rounded container.
 *
 * @param {string} text - Raw block content (a video URL).
 * @returns {string} HTML string.
 */
export function renderVideo(text) {
    const url = text.trim();
    return `
    <div class="max-w-[640px] px-6 mx-auto w-full my-12">
        <div class="bg-surface-container rounded-[2.5rem] overflow-hidden ghost-border relative w-full">
            <video src="${url}" controls class="w-full h-auto" autoplay loop muted playsinline></video>
        </div>
    </div>`;
}
