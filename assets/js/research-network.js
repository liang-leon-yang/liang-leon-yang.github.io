/* Complete static content is the default; motion is an optional enhancement. */
for (const network of document.querySelectorAll('[data-research-network]')) {
  if (typeof window.matchMedia !== 'function' || typeof window.IntersectionObserver !== 'function') continue;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = network.querySelector('.network-toggle');
  let userPaused = false;
  let visible = false;
  let printing = false;

  function updateMotion() {
    network.classList.toggle('network-running', visible && !userPaused && !preference.matches && !document.hidden && !printing);
    toggle.hidden = preference.matches;
    toggle.setAttribute('aria-pressed', String(userPaused));
    toggle.querySelector('.network-toggle-label').textContent = userPaused ? toggle.dataset.playLabel : toggle.dataset.pauseLabel;
    toggle.querySelector('.network-toggle-icon').textContent = userPaused ? '▷' : 'Ⅱ';
  }

  toggle.addEventListener('click', () => { userPaused = !userPaused; updateMotion(); });
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.15);
    updateMotion();
  }, { threshold: [0, 0.15] });
  observer.observe(network);
  if (typeof preference.addEventListener === 'function') preference.addEventListener('change', updateMotion);
  else if (typeof preference.addListener === 'function') preference.addListener(updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  window.addEventListener('pageshow', updateMotion);
  window.addEventListener('beforeprint', () => { printing = true; updateMotion(); });
  window.addEventListener('afterprint', () => { printing = false; updateMotion(); });
  network.classList.add('network-ready');
  updateMotion();
}
