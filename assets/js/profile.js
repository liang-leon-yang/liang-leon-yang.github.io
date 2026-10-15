/* All research content and paper links are readable without JavaScript. */
const printButton = document.querySelector('.print-button');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}

for (const map of document.querySelectorAll('[data-research-map]')) {
  const branches = [...map.querySelectorAll('.agenda-branch')];
  const reset = map.querySelector('.agenda-reset');
  const buttons = [...map.querySelectorAll('.agenda-select')];
  let updatePaths = () => {};

  function focusDirection(direction) {
    if (direction) map.dataset.focused = direction;
    else delete map.dataset.focused;
    reset.setAttribute('aria-pressed', String(!direction));
    for (const branch of branches) {
      const selected = branch.dataset.direction === direction;
      branch.classList.toggle('is-selected', selected);
      branch.querySelector('.agenda-select').setAttribute('aria-pressed', String(selected));
    }
    updatePaths();
  }

  for (const button of buttons) {
    button.hidden = false;
    button.closest('h3').querySelector('.agenda-static-title').hidden = true;
    button.addEventListener('click', () => {
      const direction = button.closest('.agenda-branch').dataset.direction;
      focusDirection(map.dataset.focused === direction ? null : direction);
    });
  }
  reset.hidden = false;
  reset.addEventListener('click', () => focusDirection(null));

  /* Static layout is the fallback. Enhancements never hide research content. */
  if (
    typeof window.matchMedia !== 'function' ||
    typeof window.IntersectionObserver !== 'function' ||
    typeof Element.prototype.animate !== 'function'
  ) continue;

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const layout = map.querySelector('.agenda-layout');
  const origin = map.querySelector('.agenda-origin');
  const svg = map.querySelector('.agenda-flow');
  const animations = new Set();
  const traces = new Map();
  let visible = false;
  let entered = false;
  let printing = false;
  let hovered = null;
  let focused = null;
  let previousDirection = null;

  for (const branch of branches) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'agenda-route');
    path.setAttribute('pathLength', '1');
    svg.append(path);
    traces.set(branch.dataset.direction, path);
  }

  function cancelMotion() {
    for (const animation of animations) animation.cancel();
    animations.clear();
  }

  function canMove() {
    return visible && !preference.matches && !document.hidden && !printing;
  }

  function animate(element, frames, options) {
    const animation = element.animate(frames, options);
    animations.add(animation);
    const release = () => animations.delete(animation);
    animation.addEventListener('finish', release, { once: true });
    animation.addEventListener('cancel', release, { once: true });
  }

  function drawTrace(path, delay = 0, persistent = false) {
    if (!canMove() || getComputedStyle(svg).display === 'none') return;
    for (const animation of path.getAnimations()) animation.cancel();
    animate(path, [
      { strokeDashoffset: 1, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.7, offset: 0.75 },
      { strokeDashoffset: 0, opacity: persistent ? 0.65 : 0 }
    ], { duration: 850, delay, easing: 'cubic-bezier(.22,.61,.36,1)' });
  }

  function measurePaths() {
    const box = layout.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const source = origin.getBoundingClientRect();
    const x = source.right - box.left;
    const y = source.top + source.height / 2 - box.top;
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    for (const branch of branches) {
      const target = branch.getBoundingClientRect();
      const evidence = branch.querySelector('.agenda-evidence');
      const left = target.left - box.left;
      const middle = target.top + target.height / 2 - box.top;
      const evidenceX = target.left - box.left + branch.clientLeft + evidence.offsetLeft;
      const evidenceTop = target.top - box.top + branch.clientTop + evidence.offsetTop;
      const evidenceY = evidenceTop + evidence.offsetHeight / 2;
      traces.get(branch.dataset.direction).setAttribute('d',
        `M${x} ${y}H${left - 20}V${middle}H${left - 6}` +
        `M${evidenceX - 16} ${evidenceY}H${evidenceX}` +
        `M${evidenceX} ${evidenceTop}V${evidenceTop + evidence.offsetHeight}`
      );
    }
  }

  updatePaths = () => {
    const direction = hovered || focused || map.dataset.focused || null;
    for (const [id, path] of traces) path.classList.toggle('is-active', id === direction);
    if (direction !== previousDirection) {
      cancelMotion();
      if (direction) drawTrace(traces.get(direction), 0, true);
      previousDirection = direction;
    }
  };

  for (const branch of branches) {
    const direction = branch.dataset.direction;
    branch.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      hovered = direction;
      updatePaths();
    });
    branch.addEventListener('pointerleave', () => { hovered = null; updatePaths(); });
    branch.addEventListener('focusin', () => { focused = direction; updatePaths(); });
    branch.addEventListener('focusout', event => {
      if (branch.contains(event.relatedTarget)) return;
      focused = null;
      updatePaths();
    });
  }

  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.12;
    if (!visible) { cancelMotion(); return; }
    if (entered || document.hidden || printing) return;
    entered = true;
    if (preference.matches) return;
    measurePaths();
    branches.forEach((branch, index) => {
      for (const [part, delay] of [['.agenda-question', 0], ['.agenda-evidence', 70]]) {
        animate(branch.querySelector(part), [
          { opacity: 0.72, transform: 'translateY(4px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 560, delay: index * 85 + delay, easing: 'cubic-bezier(.22,.61,.36,1)' });
      }
      const path = traces.get(branch.dataset.direction);
      drawTrace(path, index * 100, path.classList.contains('is-active'));
    });
  }, { threshold: [0, 0.12] }).observe(map);

  if (typeof window.ResizeObserver === 'function') new ResizeObserver(measurePaths).observe(layout);
  window.addEventListener('resize', measurePaths, { passive: true });
  if (document.fonts) document.fonts.ready.then(measurePaths);
  preference.addEventListener('change', cancelMotion);
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelMotion(); });
  window.addEventListener('beforeprint', () => { printing = true; cancelMotion(); });
  window.addEventListener('afterprint', () => { printing = false; measurePaths(); });
  measurePaths();
}
