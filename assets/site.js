// Beachhead site: nav, time-of-day viewer, gallery tabs, lightbox, reveal on scroll.
(() => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 40 || nav.classList.contains('is-open'));
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    onScroll();
  });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  // Time of day: buttons crossfade the frames; arrow keys step through them.
  document.querySelectorAll('[data-clock]').forEach(clock => {
    const frames = [...clock.querySelectorAll('.clock-frames img')];
    const buttons = [...clock.querySelectorAll('.clock-bar button')];
    const show = i => {
      frames.forEach((f, j) => f.classList.toggle('is-on', j === i));
      buttons.forEach((b, j) => b.setAttribute('aria-selected', String(j === i)));
    };
    buttons.forEach((b, i) => {
      b.addEventListener('click', () => show(i));
      b.addEventListener('keydown', e => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        const n = (i + d + buttons.length) % buttons.length;
        buttons[n].focus();
        show(n);
      });
    });
  });

  // Gallery tabs.
  const tabs = [...document.querySelectorAll('.tabs button')];
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(o => o.setAttribute('aria-selected', String(o === t)));
    document.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== t.dataset.tab; });
  }));

  // Lightbox over the visible panel's tiles.
  const box = document.querySelector('.lightbox');
  const img = box.querySelector('img');
  const cap = box.querySelector('figcaption');
  let items = [], at = 0;
  const open = i => {
    at = (i + items.length) % items.length;
    const a = items[at];
    img.src = a.getAttribute('href');
    img.alt = a.querySelector('img').alt;
    cap.textContent = a.dataset.caption || '';
    box.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const close = () => { box.hidden = true; document.body.style.overflow = ''; };
  document.querySelectorAll('.tile').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    items = [...a.closest('[data-panel]').querySelectorAll('.tile')];
    open(items.indexOf(a));
  }));
  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', () => open(at - 1));
  box.querySelector('.lb-next').addEventListener('click', () => open(at + 1));
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') open(at - 1);
    if (e.key === 'ArrowRight') open(at + 1);
  });

  // Reveal sections as they scroll in.
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const targets = document.querySelectorAll('.pillar, .era, .mode, .clock, .grid, .feature, .stats, .road li, details');
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(t => { t.classList.add('reveal'); io.observe(t); });
  }
})();
