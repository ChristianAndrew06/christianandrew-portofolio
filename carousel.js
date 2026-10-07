/* Native touch scrolling, arrow buttons, keyboard navigation, and mouse dragging. */
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const cards = [...track.children];
  const previous = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const counter = carousel.querySelector('[data-carousel-position]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const format = number => String(number).padStart(2, '0');
  const limit = () => Math.max(0, track.scrollWidth - track.clientWidth);
  const positions = () => {
    const left = track.getBoundingClientRect().left;
    return cards.map(card => card.getBoundingClientRect().left - left + track.scrollLeft);
  };
  cards.forEach((card, index) => {
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `${index + 1} dari ${cards.length}`);
  });

  function update() {
    const max = limit();
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
    const viewport = track.getBoundingClientRect();
    const visible = cards.flatMap((card, index) => {
      const box = card.getBoundingClientRect();
      const overlap = Math.min(box.right, viewport.right) - Math.max(box.left, viewport.left);
      return overlap >= Math.min(box.width, viewport.width) / 2 ? [index + 1] : [];
    });
    const first = visible[0] || 1;
    const last = visible[visible.length - 1] || first;
    const range = first === last ? format(first) : `${format(first)}–${format(last)}`;
    counter.textContent = `${range} / ${format(cards.length)}`;
    counter.setAttribute('aria-label', `${carousel.dataset.carouselName} ${first === last ? first : `${first} sampai ${last}`} dari ${cards.length}`);
  }

  let frame = 0;
  function scheduleUpdate() {
    if (frame) return;
    frame = window.requestAnimationFrame(() => { frame = 0; update(); });
  }
  function goTo(left) {
    track.scrollTo({ left: Math.max(0, Math.min(left, limit())), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }
  function move(direction) {
    const stops = positions();
    const destination = direction > 0
      ? stops.find(left => left > track.scrollLeft + 2) ?? limit()
      : stops.reverse().find(left => left < track.scrollLeft - 2) ?? 0;
    goTo(destination);
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', scheduleUpdate, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') goTo(0);
    else if (event.key === 'End') goTo(limit());
    else move(event.key === 'ArrowRight' ? 1 : -1);
  });

  // Touch uses the browser's native swipe behavior. Only mouse drags are handled here.
  let drag = null;
  let suppressClick = false;
  track.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || limit() <= 2) return;
    suppressClick = false;
    drag = { id: event.pointerId, x: event.clientX, left: track.scrollLeft, moved: false };
  });
  track.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const delta = event.clientX - drag.x;
    if (!drag.moved && Math.abs(delta) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      track.setPointerCapture(event.pointerId);
      track.classList.add('is-dragging');
    }
    event.preventDefault();
    track.scrollLeft = Math.max(0, Math.min(drag.left - delta, limit()));
  });
  function endDrag(event) {
    if (!drag || event.pointerId !== drag.id) return;
    const moved = drag.moved;
    drag = null;
    suppressClick = moved;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.classList.remove('is-dragging');
    if (moved) {
      const stops = [...positions(), limit()];
      const nearest = stops.reduce((best, left) => Math.abs(left - track.scrollLeft) < Math.abs(best - track.scrollLeft) ? left : best, 0);
      goTo(nearest);
      window.setTimeout(() => { suppressClick = false; }, 0);
    }
  }
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('lostpointercapture', endDrag);
  track.addEventListener('pointerleave', event => { if (drag && !drag.moved) endDrag(event); });
  track.addEventListener('dragstart', event => { if (drag) event.preventDefault(); });
  track.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); event.stopPropagation(); }
  }, true);

  if ('ResizeObserver' in window) new ResizeObserver(scheduleUpdate).observe(track);
  else window.addEventListener('resize', scheduleUpdate, { passive: true });
  update();
});
