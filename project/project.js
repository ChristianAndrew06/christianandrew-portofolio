/* Add Figma / repository / document URLs to projectLinks in ../script.js.
 * Each project-*.html file owns its content and can be opened directly.
 */
const projectSlug = document.body.dataset.project;
const workLink = document.querySelector('#project-work-link');
if (workLink && projectSlug) {
  const destination = safeExternalUrl(portfolio.projectLinks[projectSlug]);
  if (destination) {
    workLink.href = destination;
    workLink.hidden = false;
    workLink.setAttribute('aria-label', `Buka proyek ${document.querySelector('#project-title').textContent.replace(/\.$/, '')} di tab baru`);
  }
}
