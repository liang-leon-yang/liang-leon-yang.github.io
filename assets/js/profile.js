/* Navigation, paper links, and research content work without JavaScript. */
const printButton = document.querySelector('.print-button');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}

/* A direction can be emphasized without hiding the rest of the research. */
for (const map of document.querySelectorAll('[data-research-map]')) {
  const branches = [...map.querySelectorAll('.agenda-branch')];
  const reset = map.querySelector('.agenda-reset');
  const buttons = [...map.querySelectorAll('.agenda-select')];

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
}
