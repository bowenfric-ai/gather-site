/* Gather — ambient motion runtime
   Wires up: hero parallax, section background swap on IntersectionObserver. */
(function () {
  if (window.__gatherMotionLoaded) return;
  window.__gatherMotionLoaded = true;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----- Motion 1: hero parallax ----- */
  function initParallax() {
    const layers = document.querySelectorAll('[data-parallax="hero"]');
    if (!layers.length || prefersReduced) return;
    let lastY = -1;
    function tick() {
      const y = window.scrollY;
      if (y !== lastY) {
        lastY = y;
        layers.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const top = rect.top + y;                // absolute top of hero
          // Only parallax while hero can be seen (roughly)
          if (y + window.innerHeight < top) return;
          const offset = (y - top) * 0.4;           // 0.4x scroll speed
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        });
      }
      window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  /* ----- Motion 4: section background fade-in ----- */
  function initSectionBg() {
    const sections = document.querySelectorAll('[data-section-bg]');
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target.getAttribute('data-section-bg');
            if (target) e.target.style.backgroundColor = target;
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* ----- Motion 2/3 helper: intersection-based reveal for non-React markup ----- */
  function initReveal() {
    const targets = document.querySelectorAll('.reveal:not(.in)');
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 } // triggers at 20% into viewport per spec
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ----- Image break: scale from 1.08 → 1.0 on scroll-in ----- */
  function initImageBreak() {
    const targets = document.querySelectorAll('.gather-image-break');
    if (!targets.length || prefersReduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.transform = 'scale(1)';
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    targets.forEach((t) => io.observe(t));
  }

  function init() {
    initParallax();
    initSectionBg();
    initReveal();
    initImageBreak();
    setTimeout(initImageBreak, 400);
    // re-run reveal after React mounts (React renders after DOMContentLoaded)
    setTimeout(initReveal, 200);
    setTimeout(initReveal, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
