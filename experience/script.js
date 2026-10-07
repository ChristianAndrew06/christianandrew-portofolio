/* Category controls enhance the static list. All entries remain readable
 * when JavaScript is unavailable. Edit entries in experience.html.
 */
const experienceFilters = [...document.querySelectorAll('.experience-filter')];
const experienceCards = [...document.querySelectorAll('.experience-card')];
const experienceCount = document.querySelector('#experience-count');

function filterExperiences(category) {
  let visible = 0;
  experienceCards.forEach(card => {
    const show = category === 'all' || card.dataset.category === category;
    card.hidden = !show;
    if (show) visible += 1;
  });
  experienceFilters.forEach(button => {
    const selected = button.dataset.filter === category;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  if (experienceCount) experienceCount.textContent = `${visible} Experience`;
}

experienceFilters.forEach(button => {
  button.addEventListener('click', () => filterExperiences(button.dataset.filter));
});
filterExperiences('all');
