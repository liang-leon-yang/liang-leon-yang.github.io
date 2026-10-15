/* Content and paper links remain readable without JavaScript. */
const printButton = document.querySelector('.print-button');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}

for (const map of document.querySelectorAll('[data-research-map]')) {
  const branches = [...map.querySelectorAll('.agenda-branch')];
  const reset = map.querySelector('.agenda-reset');

  function focusDirection(direction) {
    if (direction) map.dataset.focused = direction;
    else delete map.dataset.focused;
    reset.setAttribute('aria-pressed', String(!direction));
    for (const branch of branches) {
      const selected = branch.dataset.direction === direction;
      branch.classList.toggle('is-selected', selected);
      branch.querySelector('.agenda-select').setAttribute('aria-pressed', String(selected));
    }
  }

  for (const button of map.querySelectorAll('.agenda-select')) {
    button.hidden = false;
    button.closest('h3').querySelector('.agenda-static-title').hidden = true;
    button.addEventListener('click', () => {
      const direction = button.closest('.agenda-branch').dataset.direction;
      focusDirection(map.dataset.focused === direction ? null : direction);
    });
  }
  reset.hidden = false;
  reset.addEventListener('click', () => focusDirection(null));

  /* The SVGs are complete static illustrations until motion can be managed. */
  if (typeof window.matchMedia !== 'function' || typeof window.IntersectionObserver !== 'function') continue;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const diagrams = [...map.querySelectorAll('.theme-illustration')];
  const toggle = map.querySelector('.illustration-toggle');
  const visible = new Set();
  let userPaused = false;
  let printing = false;

  function updateMotion() {
    for (const diagram of diagrams) {
      diagram.classList.toggle('is-animating', visible.has(diagram) && !userPaused && !preference.matches && !document.hidden && !printing);
    }
    toggle.hidden = preference.matches;
    toggle.dataset.paused = String(userPaused);
    toggle.querySelector('span').textContent = userPaused ? toggle.dataset.playLabel : toggle.dataset.pauseLabel;
  }

  toggle.addEventListener('click', () => { userPaused = !userPaused; updateMotion(); });
  // Each scene is observed independently, including on narrow mobile screens.
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.2) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    updateMotion();
  }, { threshold: [0, 0.2] });
  diagrams.forEach(diagram => observer.observe(diagram));
  preference.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  window.addEventListener('pageshow', updateMotion);
  window.addEventListener('beforeprint', () => { printing = true; updateMotion(); });
  window.addEventListener('afterprint', () => { printing = false; updateMotion(); });
  map.classList.add('illustrations-ready');
  updateMotion();
}
