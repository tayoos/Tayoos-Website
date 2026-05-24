/** Centre point of an element (e.g. taskbar icon) for modal minimise animation */
export function captureAnchor(el) {
    if (!el?.getBoundingClientRect) return null;
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
    };
}

/** Active taskbar icon for minimise target when no anchor was passed on open */
export function getActiveTaskbarAnchor() {
    const el = document.querySelector('.taskbar-item.active, .taskbar-item-mobile.active');
    return captureAnchor(el);
}

/** Sets CSS variables on the panel for modalMinimizeToOrigin keyframes */
export function applyMinimizeVars(panelEl, anchor, { iconSize = 52 } = {}) {
    if (!panelEl || !anchor) return;

    const rect = panelEl.getBoundingClientRect();
    const panelCenterX = rect.left + rect.width / 2;
    const panelCenterY = rect.top + rect.height / 2;

    const tx = anchor.x - panelCenterX;
    const ty = anchor.y - panelCenterY;
    const scale = Math.min(iconSize / rect.width, iconSize / rect.height, 0.14);

    panelEl.style.setProperty('--minimize-tx', `${tx}px`);
    panelEl.style.setProperty('--minimize-ty', `${ty}px`);
    panelEl.style.setProperty('--minimize-scale', String(scale));
}

export function clearMinimizeVars(panelEl) {
    if (!panelEl) return;
    panelEl.style.removeProperty('--minimize-tx');
    panelEl.style.removeProperty('--minimize-ty');
    panelEl.style.removeProperty('--minimize-scale');
}
