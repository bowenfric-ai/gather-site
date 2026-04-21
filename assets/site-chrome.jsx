// Shared site chrome — nav, footer, hero, sections, benefits, FAQ, CTA
const { useState, useEffect, useRef } = React;

function ConvergenceMark({ size = 7, gap = 4, color = '#c8a96e' }) {
  const s = size;
  const triangleW = s * 2 + gap * 2;
  const triangleH = s * 2 + gap;
  const dot = (extraClass, style) => (
    <span
      className={`gather-dot ${extraClass}`}
      style={{ position:'absolute', width: s, height: s, borderRadius: '50%', background: color, ...style }}
    />
  );
  return (
    <span className="inline-block relative" style={{ width: triangleW, height: triangleH }}>
      {dot('gather-dot-1', { left: 0, bottom: 0 })}
      {dot('gather-dot-2', { right: 0, bottom: 0 })}
      {dot('gather-dot-3', { left: '50%', top: 0, transform: 'translateX(-50%)' })}
    </span>
  );
}

function SiteNav({ current, overHero = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const compute = () => {
      const threshold = overHero ? Math.round(window.innerHeight * 0.75) : 20;
      setScrolled(window.scrollY > threshold);
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [overHero]);

  const links = [
    { href: 'members.html', label: 'Members' },
    { href: 'founders.html', label: 'Founders' },
    { href: 'teachers.html', label: 'Teachers' },
    { href: 'venues.html', label: 'Venues' },
    { href: 'about.html', label: 'About' },
  ];

  const onDark = overHero && !scrolled;
  const textColor = onDark ? '#f5f2ec' : '#0f0e0c';
  const activeColor = '#c8a96e';
  const textShadow = onDark ? '0 1px 3px rgba(0,0,0,0.25)' : 'none';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(245, 242, 236, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #e4ddcf' : '1px solid transparent',
        transition: 'background 400ms ease, backdrop-filter 400ms ease, border-color 400ms ease',
      }}
    >
      {/* Top scrim — keeps parchment nav text legible over bright hero images. Fades out once nav transitions to scrolled state. */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '160px',
          pointerEvents: 'none',
          zIndex: 0,
          background: 'linear-gradient(to bottom, rgba(15, 14, 12, 0.52) 0%, rgba(15, 14, 12, 0.35) 40%, rgba(15, 14, 12, 0) 100%)',
          opacity: onDark ? 1 : 0,
          transition: 'opacity 400ms ease',
        }}
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between" style={{position:'relative', zIndex: 1}}>
        <a href="Gather Homepage.html" className="inline-flex items-center" style={{gap: '14px'}}>
          <ConvergenceMark size={7} gap={4} />
          <span className="font-serif" style={{fontSize:'28px', fontWeight: 400, letterSpacing: '-0.01em', color: textColor, textShadow, transition: 'color 400ms ease'}}>Gather</span>
        </a>
        <div className="flex items-center" style={{gap: '20px'}}>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link text-[13px] tracking-wide"
                style={{
                  color: current === l.href ? activeColor : textColor,
                  fontWeight: current === l.href ? 500 : 300,
                  textShadow: current === l.href ? 'none' : textShadow,
                  whiteSpace: 'nowrap',
                  transition: 'color 400ms ease',
                }}
              >
                {l.label}
              </a>
            ))}
            <a href="contact.html" className="text-[13px] tracking-wide nav-link"
               style={{
                 fontWeight: current === 'contact.html' ? 500 : 300,
                 color: current === 'contact.html' ? activeColor : textColor,
                 textShadow: current === 'contact.html' ? 'none' : textShadow,
                 whiteSpace: 'nowrap',
                 transition: 'color 400ms ease',
               }}>Contact</a>
          </div>
          <a
            href="Gather Homepage.html#waitlist"
            className="hidden md:inline-block cta cta-amber nav-waitlist-cta"
            style={{ padding: '10px 20px', fontSize: 13, whiteSpace: 'nowrap' }}
          >
            Join waitlist
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="1.2" style={{transition:'stroke 400ms ease'}}>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t hair px-6 py-6 flex flex-col gap-5" style={{background:'rgba(245,242,236,0.98)'}}>
          {[...links, { href: 'contact.html', label: 'Contact' }].map(l => (
            <a key={l.href} href={l.href} className="text-[15px]" style={{color: current === l.href ? '#c8a96e' : '#0f0e0c'}}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function PageHero({ tagline, title, thesis, image }) {
  const shadow = '0 1px 2px rgba(0, 0, 0, 0.25)';
  return (
    <header
      className="relative w-full gather-hero-root"
      style={{
        minHeight: '75vh',
        marginBottom: 0,
        paddingBottom: 0,
        backgroundColor: '#0f0e0c',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <style>{`@media (min-width: 768px) { .gather-hero-root { min-height: 85vh !important; } }`}</style>

      {/* Parallax image layer */}
      {image && (
        <div
          className="gather-hero-image"
          data-parallax="hero"
          style={{ backgroundImage: `url("${image}")` }}
        />
      )}

      {/* Layer 1 — bottom gradient for text protection */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(15, 14, 12, 0.78) 0%, rgba(15, 14, 12, 0.58) 18%, rgba(15, 14, 12, 0.30) 42%, rgba(15, 14, 12, 0) 68%)',
        }}
      />
      {/* Layer 2 — left-side vignette for additional depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(15, 14, 12, 0.32) 0%, rgba(15, 14, 12, 0) 48%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          paddingLeft: 'clamp(32px, 6vw, 64px)',
          paddingRight: 'clamp(24px, 4vw, 64px)',
          paddingBottom: 'clamp(40px, 5vw, 48px)',
          paddingTop: 'clamp(140px, 18vh, 180px)',
          width: '100%',
        }}
      >
        <div
          style={{ color: '#c8a96e', marginBottom: '40px', letterSpacing: '0.22em', fontSize: '11px', textShadow: shadow, textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}
        >
          {tagline}
        </div>
        <h1
          className="font-serif"
          style={{
            color: '#f5f2ec',
            fontWeight: 300,
            fontSize: 'clamp(48px, 6.4vw, 96px)',
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            maxWidth: '16ch',
            textShadow: shadow,
            textWrap: 'balance',
            fontFeatureSettings: '"liga" 1, "kern" 1',
          }}
        >
          {title}
        </h1>
        {thesis && (
          <p
            className="font-serif italic"
            style={{
              color: 'rgba(245, 242, 236, 0.92)',
              fontWeight: 300,
              fontSize: 'clamp(20px, 2vw, 26px)',
              lineHeight: 1.45,
              letterSpacing: '0.002em',
              maxWidth: '44ch',
              marginTop: '40px',
              textShadow: shadow,
            }}
          >
            {thesis}
          </p>
        )}

        {/* Editorial scroll cue — below thesis, left-aligned. */}
        <div
          aria-hidden
          style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c8a96e' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c8a96e' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c8a96e' }} />
          </span>
          <span className="gather-hero-scroll-line" style={{ display: 'block', width: '32px', height: '1px', background: '#c8a96e' }} />
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245, 242, 236, 0.6)' }}>scroll</span>
        </div>
      </div>
    </header>
  );
}

function SectionHead({ eyebrow, title }) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-10">
      <div className="eyebrow mb-8" style={{color:'#7a7670'}}>{eyebrow}</div>
      <h2 className="display text-[44px] md:text-[72px] leading-[1] max-w-[18ch]">{title}</h2>
    </div>
  );
}

function CharacterPullout({ name, children, photo, photoAlt }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${inView?'in':''} max-w-[1400px] mx-auto px-6 md:px-12 py-12`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="eyebrow mb-4" style={{color:'#8a6e3e'}}>Meet</div>
          <div className="font-serif text-[56px] md:text-[80px] leading-none">{name}</div>
          {photo ? (
            <div
              className="mt-8 aspect-[3/4] w-full max-w-[340px] overflow-hidden"
              style={{
                borderRadius: 2,
                boxShadow: '0 1px 0 rgba(15,14,12,0.08), 0 20px 40px -20px rgba(15,14,12,0.35)',
              }}
            >
              <img
                src={photo}
                alt={photoAlt || name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'saturate(0.92) contrast(1.02)',
                }}
              />
            </div>
          ) : (
            <div className="photo-placeholder mt-8 aspect-[3/4] w-full max-w-[340px]" />
          )}
        </div>
        <div className="md:col-span-7 md:col-start-6 scenario-body font-serif" style={{color:'#2a2722'}}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Beat({ eyebrow, title, children, first, numeral, pullQuote }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const autoNumeral = numeral || ({
    'Day One': 'I.',
    'Month Three': 'II.',
    'Year One': 'III.',
  })[eyebrow] || null;
  return (
    <div
      ref={ref}
      className={`reveal ${inView?'in':''} gather-beat max-w-[1400px] mx-auto px-6 md:px-12 py-12 ${first?'':'border-t hair'}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          {autoNumeral && (
            <div className="font-serif italic gather-beat-numeral" style={{color:'#8a6e3e', fontWeight:300, fontSize:'24px', marginBottom:'16px', lineHeight:1}}>{autoNumeral}</div>
          )}
          <div className="eyebrow mb-3" style={{color:'#8a6e3e'}}>{eyebrow}</div>
          <h3 className="display text-[36px] md:text-[48px] leading-[1.05] max-w-[14ch]">{title}</h3>
        </div>
        <div className={`${pullQuote ? 'md:col-span-5' : 'md:col-span-7'} md:col-start-6 scenario-body font-serif`} style={{color:'#2a2722'}}>
          {children}
        </div>
        {pullQuote && (
          <div
            className="hidden md:block md:col-span-3 md:col-start-11 gather-beat-quote"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '28px',
              lineHeight: 1.3,
              maxWidth: '20ch',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 600ms ease-out 300ms, transform 600ms ease-out 300ms, color 400ms ease',
            }}
          >
            “{pullQuote}”
          </div>
        )}
      </div>
    </div>
  );
}

function Benefits({ eyebrow, title, items }) {
  return (
    <section className="border-t hair" style={{background:'#efebe2'}}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="eyebrow mb-8" style={{color:'#7a7670'}}>{eyebrow}</div>
        <h2 className="display text-[44px] md:text-[64px] leading-[1] mb-16 max-w-[18ch]">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {items.map((it, i) => (
            <div key={i} className="flex gap-6 border-t hair pt-8">
              <div className="font-serif text-[22px]" style={{color:'#c8a96e'}}>—</div>
              <div>
                <div className="font-serif mb-3" style={{color:'#0f0e0c', fontStyle:'italic', fontWeight:500, fontSize:'22px', lineHeight:1.2}}>{it.lead}</div>
                <p className="text-[15px] leading-[1.6]" style={{color:'#55514a'}}>{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CuratedInventory — a quiet, editorial index of categorized examples.
   Collapsed by default. Each category is a clickable row that expands
   to reveal its items as comma-separated prose. Multiple categories
   can be open simultaneously. */
function CuratedInventory({ eyebrow, title, intro, categories, bg = '#efebe2' }) {
  const [openSet, setOpenSet] = useState(() => new Set());

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const onKeyDown = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(i);
    }
  };

  return (
    <section className="border-t hair gather-ci" style={{background: bg}}>
      <div className="mx-auto px-6 md:px-12 py-[40px] md:py-[60px]" style={{maxWidth: 720}}>
        <div className="eyebrow mb-8" style={{color:'#8a6e3e'}}>{eyebrow}</div>
        <h2 className="display leading-[1.02] mb-8 max-w-[20ch]"
            style={{fontSize:'clamp(36px, 4.5vw, 56px)', fontWeight:300}}>
          {title}
        </h2>
        {intro ? (
          <p className="max-w-[62ch] mb-10 md:mb-12"
             style={{fontSize:'18px', lineHeight:1.65, color:'rgba(15,14,12,0.7)'}}>
            {intro}
          </p>
        ) : null}

        <div className="gather-ci-list">
          {categories.map((cat, i) => {
            const open = openSet.has(i);
            const panelId = `gather-ci-panel-${i}`;
            const rowId = `gather-ci-row-${i}`;
            return (
              <div key={i} className="gather-ci-item">
                <div
                  id={rowId}
                  role="button"
                  tabIndex={0}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className="gather-ci-row"
                >
                  <span
                    className="gather-ci-header font-serif italic"
                    style={{color:'#8a6e3e', fontWeight:400, fontSize:'20px', lineHeight:1.2}}
                  >
                    {cat.header}
                  </span>
                  <span
                    aria-hidden="true"
                    className="gather-ci-toggle"
                    style={{
                      color: '#8a6e3e',
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 300,
                      fontSize: '20px',
                      lineHeight: 1,
                      transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 300ms ease-out',
                      display: 'inline-block',
                    }}
                  >
                    +
                  </span>
                </div>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={rowId}
                  aria-hidden={!open}
                  className="gather-ci-panel"
                  data-open={open ? 'true' : 'false'}
                >
                  <div className="gather-ci-panel-inner">
                    <p style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 300,
                      fontSize: '15px',
                      lineHeight: 1.7,
                      color: 'rgba(15, 14, 12, 0.85)',
                      margin: 0,
                    }}>
                      {cat.items.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FAQ({ eyebrow, title, items }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="border-t hair">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6" style={{color:'#7a7670'}}>{eyebrow}</div>
            <h2 className="display text-[44px] md:text-[56px] leading-[1.02]">{title}</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {items.map((it, i) => (
              <div key={i} className="border-t hair gather-faq-item" data-open={open === i ? 'true' : 'false'}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full text-left py-7 flex items-start gap-6 transition-colors duration-300"
                  style={{color: open === i ? '#0f0e0c' : '#2a2722'}}
                >
                  <span className="font-serif text-[15px] pt-1" style={{color:'#8a6e3e',fontVariantNumeric:'tabular-nums'}}>0{i+1}</span>
                  <span className="font-serif text-[22px] md:text-[26px] leading-[1.25] flex-1">{it.q}</span>
                  <span className="font-serif text-[28px] pt-0" style={{color:'#8a6e3e', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', transition:'transform 300ms ease', display:'inline-block', lineHeight:1}}>+</span>
                </button>
                {open === i && (
                  <div className="pb-8 pl-14 pr-8 font-serif text-[19px] leading-[1.55] max-w-[62ch]" style={{color:'#3a362f', animation:'fadeIn 400ms ease'}}>
                    {it.a}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t hair" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PageCTA({ headline, prompt, buttonLabel, role }) {
  return (
    <section className="border-t hair" style={{background:'#0f0e0c', color:'#f5f2ec'}}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
        <ConvergenceMark size={9} gap={5} color="#c8a96e" />
        <h2 className="display text-[44px] md:text-[80px] leading-[1.02] mt-10 mx-auto max-w-[16ch]" style={{color:'#f5f2ec'}}>{headline}</h2>
        <p className="font-serif italic text-[20px] md:text-[24px] mt-8 mx-auto max-w-[44ch]" style={{color:'#d8d2c8'}}>{prompt}</p>
        <a href={`contact.html?role=${role}`} className="cta cta-amber mt-12">{buttonLabel} →</a>
      </div>
    </section>
  );
}

function SiteFooter({ pageNumber }) {
  const linkStyle = {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 300,
    fontSize: '12px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(245, 242, 236, 0.6)',
    textDecoration: 'none',
    transition: 'color 300ms ease',
  };
  const waitlistStyle = { ...linkStyle, color: '#c8a96e' };
  const metaStyle = {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 300,
    fontSize: '11px',
    color: 'rgba(245, 242, 236, 0.4)',
  };
  return (
    <footer className="gather-footer" style={{ background: '#0f0e0c', color: '#f5f2ec' }}>
      <div
        className="mx-auto flex flex-col items-center text-center"
        style={{
          maxWidth: '1400px',
          paddingTop: '128px',
          paddingBottom: '80px',
          paddingLeft: 'clamp(24px, 4vw, 48px)',
          paddingRight: 'clamp(24px, 4vw, 48px)',
        }}
      >
        {/* 1. Convergence mark */}
        <ConvergenceMark size={10} gap={14} color="#c8a96e" />

        {/* 2. Wordmark */}
        <div
          className="font-serif"
          style={{ fontSize: '48px', fontWeight: 300, letterSpacing: '-0.02em', color: '#f5f2ec', marginTop: '48px', lineHeight: 1 }}
        >
          Gather
        </div>

        {/* 3. Tagline */}
        <p
          className="font-serif italic"
          style={{ fontSize: '18px', fontWeight: 300, color: 'rgba(245, 242, 236, 0.7)', marginTop: '16px' }}
        >
          Communities start here.
        </p>

        {/* 4. Hairline rule */}
        <span
          aria-hidden
          style={{ display: 'block', width: '120px', height: '1px', background: '#c8a96e', opacity: 0.2, marginTop: '80px' }}
        />

        {/* 5. Link grid */}
        <div
          className="gather-footer-grid"
          style={{ marginTop: '48px', width: '100%' }}
        >
          <div className="gather-footer-col">
            <a href="members.html" style={linkStyle}>For members</a>
            <a href="founders.html" style={linkStyle}>For founders</a>
            <a href="teachers.html" style={linkStyle}>For teachers</a>
            <a href="venues.html" style={linkStyle}>For venues</a>
          </div>
          <div className="gather-footer-col">
            <a href="about.html" style={linkStyle}>About</a>
            <a href="contact.html" style={linkStyle}>Contact</a>
            <a href="privacy.html" style={linkStyle}>Privacy</a>
          </div>
          <div className="gather-footer-col">
            <a href="Gather Homepage.html#waitlist" style={waitlistStyle}>Join waitlist</a>
          </div>
        </div>

        {/* 6. Meta row */}
        <div
          className="gather-footer-meta"
          style={{ marginTop: '64px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}
        >
          <span style={metaStyle}>© 2026 Gather Community Inc.</span>
          <span style={{ ...metaStyle, fontStyle: 'italic' }}>Calgary, Alberta</span>
        </div>
      </div>
    </footer>
  );
}

/* Section transition — 96px band (48px mobile) between major thematic breaks.
   Background matches the section BELOW so it feels like a welcome, not a goodbye. */
function SectionTransition({ bg = '#f5f2ec' }) {
  return (
    <div
      aria-hidden
      className="gather-section-transition w-full relative flex items-center justify-center"
      style={{ background: bg }}
    >
      <span
        className="absolute"
        style={{ left: 0, right: 'calc(50% + 80px)', top: '50%', height: '1px', background: '#c8a96e', opacity: 0.2 }}
      />
      <span
        className="absolute"
        style={{ left: 'calc(50% + 80px)', right: 0, top: '50%', height: '1px', background: '#c8a96e', opacity: 0.2 }}
      />
      <ConvergenceMark size={5} gap={6} color="#c8a96e" />
    </div>
  );
}

/* Centered three-dot section divider — used as a breath between major sections */
function SectionDivider({ color = '#c8a96e', size = 6, gap = 4, space = 64 }) {
  return (
    <div className="w-full flex items-center justify-center" style={{paddingTop: space, paddingBottom: space}} aria-hidden>
      <ConvergenceMark size={size} gap={gap} color={color} />
    </div>
  );
}

function StatementBanner({ text }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      style={{
        background: '#0f0e0c',
        color: '#f5f2ec',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        className="font-serif italic"
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(44px, 6vw, 88px)',
          lineHeight: 1.1,
          maxWidth: '22ch',
          textAlign: 'center',
          margin: 0,
          padding: '0 24px',
          color: '#f5f2ec',
          letterSpacing: inView ? '-0.01em' : '0.02em',
          opacity: inView ? 1 : 0,
          transition: 'opacity 1400ms ease-out, letter-spacing 1400ms ease-out',
        }}
      >
        {text}
      </p>
      <div style={{ marginTop: 48, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8a96e', display: 'inline-block' }} />
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { SiteNav, PageHero, SectionHead, CharacterPullout, Beat, Benefits, CuratedInventory, FAQ, PageCTA, SiteFooter, ConvergenceMark, StatementBanner, SectionDivider, SectionTransition });
