/*
 * PERSONALIZATION
 * Fill in only verified personal links. An empty string keeps a link unavailable.
 * Project links are optional. Project content lives in project/project-*.html.
 */
const portfolio = {
  profilePhoto: '', // Opsional: 'assets/profile/andrew.png'; kosong memakai monogram CA.
  social: {
    linkedin: 'https://www.linkedin.com/in/christian-andrew06/',
    whatsapp: 'https://wa.me/08132091499', // Nomor internasional (628...) atau tautan https://wa.me/...
    instagram: 'https://www.instagram.com/christianandrw_',
    email: 'christianandrewwork@gmail.com', // Alamat email kamu; awalan mailto: tidak wajib.
    cv: 'https://drive.google.com/file/d/1rG5XYuwk1eM_FE4DwGtsRD_S-iAun_uC/view?usp=sharing', // Tautan berbagi CV dari Google Drive.
  },
  certificates: {
    juara1: {
      image: 'assets/cert/11.png', // Contoh: 'assets/cert/sertifikat-islab.jpg'
    },
    juara1it: {
      image: 'assets/cert/.jpg', // Contoh: 'assets/cert/sertifikat-islab.jpg'
    },
    juara2: {
      image: 'assets/cert/12.png', // Contoh: 'assets/cert/sertifikat-islab.jpg'
    },
    islab: {
      image: 'assets/cert/Aslab.jpg', // Contoh: 'assets/cert/sertifikat-islab.jpg'
    },
    sisappre: {
      image: 'assets/cert/sisappre.jpg', // Contoh: 'assets/cert/sertifikat-pwc.png'
    },
    dean: {
      image: 'assets/cert/dean.jpg', // Gambar untuk kartu Sertifikat 03.
    },
    pembicara: {
      image: 'assets/cert/pembicara.jpeg', // Gambar untuk kartu Sertifikat 04.
    },
    finalist: {
      image: 'assets/cert/13.png', // Gambar untuk kartu Sertifikat 04.
    },
    stat: {
      image: 'assets/cert/stat.jpg', // Gambar untuk kartu Sertifikat 04.
    },
    ksn: {
      image: 'assets/cert/ksn.jpg', // Gambar untuk kartu Sertifikat 04.
    },
  },
  /*
   * DIRECT PROJECT LINKS
   * Isi URL yang sudah kamu publish. Tombol akan muncul otomatis
   * di halaman detail project.
   *
   * Contoh:
   * nurture: {
   *   figma: 'https://www.figma.com/design/xxxxx/...',
   *   caseStudy: ''
   * }
   */
  projectLinks: {
    nurture: {
      figma: 'https://www.figma.com/design/mKQNG02gWd7HUdoWvnCSRU/Nurture?node-id=1616-2222&t=dM3oMPRMw9odpeZt-1',
      caseStudy: '',
    },
    pause: {
      figma: 'https://www.figma.com/design/FirIQy2k7T1r7m1OBfak7J/UI-UX_Hackfest-2026_Raja-Gukguk-KMG_SkillFuel_Figma?node-id=0-1&t=QJDgDLNmcRwCuivA-1',
      caseStudy: '',
    },
    tropinata: {
      figma: 'https://www.figma.com/design/LMWD7ZlI5A7LHMt3RlPoJI/Growey-?node-id=2412-2872&t=mRg4lrVlLzlf5zYR-1',
      caseStudy: '',
    },
    project04: {
      figma: 'https://www.figma.com/design/YoWL52UdHKwUhlBni21FG5/SAUL?node-id=2-2&t=IzSv389q7cFDZkFw-1',
      caseStudy: '',
    },
  },
};


/* First-visit portfolio intro */
const portfolioIntro = document.querySelector('#portfolio-intro');
if (portfolioIntro) {
  const introSeenKey = 'andrewPortfolioIntroSeen_v2';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let hasSeenIntro = false;
  try {
    hasSeenIntro = sessionStorage.getItem(introSeenKey) === '1';
  } catch { /* Continue without persistence. */ }

  if (hasSeenIntro || reducedMotion) {
    portfolioIntro.remove();
  } else {
    try { sessionStorage.setItem(introSeenKey, '1'); } catch { /* Non-persistent mode. */ }
    window.setTimeout(() => {
      portfolioIntro.classList.add('is-hidden');
      document.body.classList.add('portfolio-entered');
      window.setTimeout(() => portfolioIntro.remove(), 1000);
    }, 2250);
  }
}
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];

function closeMenu() {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Buka menu navigasi');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  nav.classList.toggle('is-open', !isOpen);
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Buka menu navigasi' : 'Tutup menu navigasi');
});
navLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 701px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const sections = [...document.querySelectorAll('.section-anchor')];
let scrollFrame = false;
function updateActiveNav() {
  if (!sections.length) return;
  const offset = window.innerHeight * 0.3;
  const current = [...sections].reverse().find(section => section.getBoundingClientRect().top <= offset) || sections[0];
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollFrame = false;
}
if (sections.length) window.addEventListener('scroll', () => {
  if (!scrollFrame) {
    scrollFrame = true;
    window.requestAnimationFrame(updateActiveNav);
  }
}, { passive: true });
updateActiveNav();

function safeExternalUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : null;
  } catch { return null; }
}

function contactDestination(network, value) {
  const input = String(value || '').trim();
  if (!input) return null;
  if (network === 'email') {
    const address = input.replace(/^mailto:/i, '');
    if (!/^[^\s@?#&]+@[^\s@?#&]+\.[^\s@?#&]+$/.test(address)) return null;
    return `mailto:${encodeURIComponent(address).replace('%40', '@')}`;
  }
  if (network === 'whatsapp') {
    const linked = safeExternalUrl(input);
    if (linked) {
      const hostname = new URL(linked).hostname;
      return ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com', 'www.whatsapp.com', 'whatsapp.com'].includes(hostname) ? linked : null;
    }
    let number = input.replace(/[\s()+-]/g, '');
    if (number.startsWith('0')) number = `62${number.slice(1)}`;
    return /^[1-9]\d{8,14}$/.test(number) ? `https://wa.me/${number}` : null;
  }
  return safeExternalUrl(input);
}

const contactLabels = {
  linkedin: { name: 'LinkedIn', action: 'Lihat profil ↗' },
  whatsapp: { name: 'WhatsApp', action: 'Kirim pesan ↗' },
  instagram: { name: 'Instagram', action: 'Lihat profil ↗' },
  email: { name: 'email', action: 'Kirim email ↗' },
  cv: { name: 'CV di Google Drive', action: 'Lihat CV ↗' },
};

Object.entries(portfolio.social).forEach(([network, value]) => {
  const url = contactDestination(network, value);
  if (!url || !contactLabels[network]) return;
  const label = contactLabels[network];
  const configureLink = link => {
    link.href = url;
    link.setAttribute('aria-label', `Buka ${label.name} Christian Andrew`);
    if (network !== 'email') {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  };
  document.querySelectorAll(`[data-contact="${network}"]`).forEach(configureLink);
  const oldCard = document.querySelector(`[data-social="${network}"]`);
  if (!oldCard) return;
  const card = document.createElement('a');
  card.className = oldCard.className;
  if (oldCard.id) card.id = oldCard.id;
  card.dataset.social = network;
  configureLink(card);
  while (oldCard.firstChild) card.appendChild(oldCard.firstChild);
  card.querySelector('.social-status').textContent = label.action;
  oldCard.replaceWith(card);
});

// Certificate thumbnails keep the complete image visible (no cropping).
// A thumbnail becomes interactive only after its configured image loads.
const certificateDialog = document.querySelector('#certificate-dialog');
const certificateDialogImage = document.querySelector('#certificate-dialog-image');
let lastCertificateTrigger;

document.querySelectorAll('[data-certificate]').forEach(card => {
  const configured = portfolio.certificates[card.dataset.certificate];
  if (!configured?.image) return;
  let source;
  try {
    source = new URL(configured.image, document.baseURI);
    if (!['https:', 'http:', 'file:'].includes(source.protocol)) return;
  } catch { return; }
  const preview = card.querySelector('.certificate-preview');
  const thumbnail = card.querySelector('.certificate-image');
  const emptyState = card.querySelector('.certificate-empty');
  const zoom = card.querySelector('.certificate-zoom');
  const title = card.querySelector('h3').textContent;
  thumbnail.addEventListener('load', () => {
    thumbnail.hidden = false;
    emptyState.hidden = true;
    zoom.hidden = false;
    preview.disabled = false;
    preview.classList.add('has-image');
    preview.setAttribute('aria-label', `Perbesar sertifikat ${title}`);
  }, { once: true });
  thumbnail.addEventListener('error', () => {
    thumbnail.hidden = true;
    emptyState.hidden = false;
    emptyState.querySelector('small').textContent = 'Gambar belum tersedia';
    preview.disabled = true;
    zoom.hidden = true;
  });
  thumbnail.src = source.href;
  preview.addEventListener('click', () => {
    if (!certificateDialog || preview.disabled) return;
    certificateDialogImage.src = thumbnail.src;
    certificateDialogImage.alt = thumbnail.alt;
    document.querySelector('#certificate-dialog-title').textContent = title;
    lastCertificateTrigger = preview;
    certificateDialog.showModal();
    document.body.classList.add('is-viewing-certificate');
  });
});

if (certificateDialog) {
  certificateDialog.querySelector('.certificate-close').addEventListener('click', () => certificateDialog.close());
  certificateDialog.addEventListener('click', event => {
    const box = certificateDialog.getBoundingClientRect();
    if (event.target === certificateDialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) certificateDialog.close();
  });
  certificateDialog.addEventListener('close', () => {
    document.body.classList.remove('is-viewing-certificate');
    lastCertificateTrigger?.focus({ preventScroll: true });
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();

// Optional personal portrait. The existing image remains if the file is absent
// or cannot be loaded, so the hero never shows a broken image.
const heroImage = document.querySelector('.hero-art');
if (heroImage && portfolio.profilePhoto) {
  try {
    const portraitUrl = new URL(portfolio.profilePhoto, document.baseURI);
    if (['https:', 'http:', 'file:'].includes(portraitUrl.protocol)) {
      const portrait = new Image();
      portrait.addEventListener('load', () => {
        heroImage.src = portrait.src;
        heroImage.alt = 'Foto Christian Andrew';
        heroImage.width = portrait.naturalWidth;
        heroImage.height = portrait.naturalHeight;
        heroImage.closest('.hero-visual').classList.add('has-portrait');
      }, { once: true });
      portrait.src = portraitUrl.href;
    }
  } catch { /* Keep the existing monogram when the path is invalid. */ }
}
