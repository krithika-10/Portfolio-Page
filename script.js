'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initActiveNavHighlight();
  initSmoothScroll();
  initScrollReveal();
  initHeroEntrance();
  initTypingEffect();
  initParallaxOrbs();
  initSkillTilt();
  initCertTilt();
  initBarAnimation();
  initThemeSwitcher();
});

/* ── SCROLL PROGRESS BAR ── */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ── NAVBAR SCROLL SHADOW ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const fn = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', fn, { passive: true });
  fn();
}

/* ── MOBILE HAMBURGER MENU ── */
function initMobileMenu() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (links.classList.contains('open') && !btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ── ACTIVE NAV HIGHLIGHT ── */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length) return;
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 }).observe
  && sections.forEach(s => new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' }).observe(s));
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (document.getElementById('navbar')?.offsetHeight || 70);
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // Stagger children of grid containers
  document.querySelectorAll('.skills-grid, .cert-grid, .achievements-grid, .projects-grid, .about-tags, .timeline').forEach(parent => {
    parent.querySelectorAll('.reveal').forEach((child, i) => {
      child.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

  els.forEach(el => obs.observe(el));
}

/* ── HERO ENTRANCE ── */
function initHeroEntrance() {
  document.querySelectorAll('.hero-section .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 150 + i * 130);
  });
}

/* ── TYPING EFFECT ── */
function initTypingEffect() {
  const el = document.querySelector('.hero-sub');
  if (!el) return;
  const phrases = [
    'AI · Analytics · Web · Automation · Prompt Engineering',
    'BCA Data Science · Jyoti Nivas College · Bangalore',
    'Building with Data · Designing with Intent',
    'Turning Curiosity into Creation ✦',
  ];
  let pi = 0, ci = 0, del = false, paused = false;

  function tick() {
    const cur = phrases[pi];
    if (!del) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { paused = true; setTimeout(() => { paused = false; del = true; tick(); }, 2800); return; }
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    }
    if (!paused) setTimeout(tick, del ? 38 : 62);
  }
  setTimeout(tick, 1800);
}

/* ── PARALLAX ORBS ── */
function initParallaxOrbs() {
  const orbs = document.querySelectorAll('.hero-orb');
  if (!orbs.length) return;
  let ticking = false;
  const factors = [0.015, 0.022, 0.012];
  document.addEventListener('mousemove', e => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const dx = e.clientX - window.innerWidth  / 2;
      const dy = e.clientY - window.innerHeight / 2;
      orbs.forEach((o, i) => { const f = factors[i] || 0.01; o.style.transform = `translate(${dx*f}px,${dy*f}px)`; });
      ticking = false;
    });
  });
}

/* ── SKILL CARD TILT ── */
function initSkillTilt() {
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform    = `translateY(-4px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
      card.style.transition   = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
    });
  });
}

/* ── CERT CARD TILT ── */
function initCertTilt() {
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform   = `translateY(-6px) rotateX(${-y*4}deg) rotateY(${x*4}deg)`;
      card.style.transition  = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
    });
  });
}

/* ── AMAZON BAR ANIMATION ── */
function initBarAnimation() {
  const group = document.querySelector('.chart-bar-group');
  if (!group) return;
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.chart-bar').forEach(b => b.style.animationPlayState = 'running');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 }).observe(group);
}

/* ── THEME SWITCHER ── */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const panel     = document.getElementById('themeOptionsPanel');
  const optBtns   = document.querySelectorAll('.theme-option-btn');
  if (!toggleBtn || !panel) return;

  // Load saved theme or default
  const saved = localStorage.getItem('ks-theme') || 'burgundy';
  applyTheme(saved);

  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  optBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.theme;
      applyTheme(t);
      localStorage.setItem('ks-theme', t);
      panel.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    const switcher = document.getElementById('themeSwitcher');
    if (switcher && !switcher.contains(e.target)) panel.classList.remove('open');
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    optBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
  }
}

/* ── RESIZE HANDLER ── */
window.addEventListener('resize', debounce(() => {
  const nav = document.getElementById('navbar');
  if (nav) document.documentElement.style.setProperty('--nav-height', nav.offsetHeight + 'px');
}, 200));

/* ── PAGE LOAD FADE IN ── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => document.body.style.opacity = '1');
});

/* ── UTILITY ── */
function debounce(fn, delay = 100) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}
