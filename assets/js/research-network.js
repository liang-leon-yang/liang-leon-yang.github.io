/* Links and all four research perspectives remain available without JavaScript. */
for (const network of document.querySelectorAll('[data-research-network]')) {
  if (typeof window.matchMedia !== 'function' || typeof window.IntersectionObserver !== 'function') continue;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const steps = [...network.querySelectorAll('.path-step')];
  const panels = [...network.querySelectorAll('.path-panel')];
  const edges = [...network.querySelectorAll('[data-loop-edge]')];
  const toggle = network.querySelector('.network-toggle');
  const panelGroup = network.querySelector('.path-panels');
  const duration = 8000;
  let active = 0, userPaused = false, visible = false, printing = false;
  let hovering = false, focusPaused = false, timer = null, started = 0, remaining = duration;

  function stopTimer() {
    if (timer === null) return;
    remaining = Math.max(0, remaining - (performance.now() - started));
    window.clearTimeout(timer);
    timer = null;
  }
  function updateMotion() {
    const running = visible && !userPaused && !preference.matches && !document.hidden && !printing && !hovering && !focusPaused;
    network.classList.toggle('path-running', running);
    toggle.hidden = preference.matches;
    toggle.setAttribute('aria-pressed', String(userPaused));
    toggle.querySelector('.network-toggle-label').textContent = userPaused ? toggle.dataset.playLabel : toggle.dataset.pauseLabel;
    toggle.querySelector('.network-toggle-icon').textContent = userPaused ? '▷' : 'Ⅱ';
    if (!running) stopTimer();
    else if (timer === null) {
      started = performance.now();
      timer = window.setTimeout(() => { timer = null; select((active + 1) % steps.length); }, remaining);
    }
  }
  function select(index, manual = false) {
    stopTimer();
    active = index;
    remaining = duration;
    if (manual) userPaused = true;
    steps.forEach((step, i) => {
      step.setAttribute('aria-selected', String(i === active));
      step.tabIndex = i === active ? 0 : -1;
      panels[i].classList.toggle('is-active', i === active);
      panels[i].setAttribute('aria-hidden', String(i !== active));
      panels[i].inert = i !== active;
    });
    edges.forEach(edge => edge.classList.toggle('is-current', Number(edge.dataset.loopEdge) === active));
    updateMotion();
  }
  network.querySelector('.path-steps').setAttribute('role', 'tablist');
  steps.forEach((step, index) => {
    step.setAttribute('role', 'tab');
    step.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].tabIndex = 0;
    panels[index].setAttribute('aria-labelledby', step.id);
    step.addEventListener('click', event => { event.preventDefault(); select(index, true); });
    step.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (active + 1) % steps.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (active + steps.length - 1) % steps.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = steps.length - 1;
      else if (event.key === ' ') next = index;
      else return;
      event.preventDefault();
      select(next, true);
      steps[next].focus();
    });
  });
  toggle.addEventListener('click', () => { userPaused = !userPaused; if (!userPaused) focusPaused = false; updateMotion(); });
  panelGroup.addEventListener('pointerdown', () => { userPaused = true; updateMotion(); }, { passive: true });
  panelGroup.addEventListener('mouseenter', () => { hovering = true; updateMotion(); });
  panelGroup.addEventListener('mouseleave', () => { hovering = false; updateMotion(); });
  network.addEventListener('focusin', event => { if (!event.target.closest('.network-toggle')) { focusPaused = true; updateMotion(); } });
  network.addEventListener('focusout', event => { if (!network.contains(event.relatedTarget)) { focusPaused = false; updateMotion(); } });
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.12);
    updateMotion();
  }, { threshold: [0, 0.12] });
  observer.observe(network);
  if (typeof preference.addEventListener === 'function') preference.addEventListener('change', updateMotion);
  else if (typeof preference.addListener === 'function') preference.addListener(updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  window.addEventListener('pageshow', updateMotion);
  window.addEventListener('beforeprint', () => { printing = true; updateMotion(); });
  window.addEventListener('afterprint', () => { printing = false; updateMotion(); });
  network.classList.add('path-ready');
  select(0);
}
