/* Project detail direct links */
const projectSlug = document.body.dataset.project;
const workLinks = document.querySelector('#project-work-links');

const projectLinkLabels = {
  figma: 'Open Project',
  caseStudy: 'View Case Study',
};

if (workLinks && projectSlug) {
  const configuredLinks = portfolio.projectLinks?.[projectSlug] || {};
  Object.entries(projectLinkLabels).forEach(([key, label]) => {
    const destination = safeExternalUrl(configuredLinks[key]);
    if (!destination) return;

    const link = document.createElement('a');
    link.className = `button ${key === 'figma' ? 'button-primary' : 'button-secondary'}`;
    link.href = destination;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${label} for ${document.querySelector('#project-title')?.textContent.replace(/\.$/, '') || 'project'}`);
    link.innerHTML = `${label} <svg class="icon" aria-hidden="true"><use href="#i-diagonal" /></svg>`;
    workLinks.appendChild(link);
  });

  workLinks.hidden = workLinks.children.length === 0;
}
