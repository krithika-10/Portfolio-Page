/* ══════════════════════════════════════════════════════════
   KRITHIKA S — PORTFOLIO · script.js
   Scroll reveal · Navbar · Animations · Interactions
   ══════════════════════════════════════════════════════════ */

'use strict';

/* ─── DOM READY ─── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initHeroEntrance();
  initSmoothScroll();
  initMobileMenu();
  initActiveNavHighlight();
  initSkillHover();
  initCertCards();
  initProjectCards();
  initAchievementCards();
  initTypingEffect();
  initParallaxOrbs();
  initBarAnimation();
  initScrollProgress();
});

/* ══════════════════════════════════════════════════════════
   NAVBAR — sticky + scroll shadow
   ══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ══════════════════════════════════════════════════════════
   MOBILE MENU — hamburger toggle
   ══════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ══════════════════════════════════════════════════════════
   ACTIVE NAV HIGHLIGHT — highlight nav link on section
   ══════════════════════════════════════════════════════════ */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(sec => observer.observe(sec));
}

/* ══════════════════════════════════════════════════════════
   SMOOTH SCROLL — intercept anchor clicks
   ══════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   ══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Stagger children inside grids / lists
  const staggerParents = document.querySelectorAll(
    '.skills-grid, .projects-grid, .cert-grid, .achievements-grid, .about-tags, .timeline'
  );
  staggerParents.forEach(parent => {
    parent.querySelectorAll('.reveal').forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
  );

  elements.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════
   HERO ENTRANCE — stagger hero elements on load
   ══════════════════════════════════════════════════════════ */
function initHeroEntrance() {
  const heroReveals = document.querySelectorAll('.hero-section .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 150 + i * 130);
  });
}

/* ══════════════════════════════════════════════════════════
   TYPING EFFECT — hero role subtitle cycling
   ══════════════════════════════════════════════════════════ */
function initTypingEffect() {
  const el = document.querySelector('.hero-sub');
  if (!el) return;

  const phrases = [
    'AI · Analytics · Web · Automation · Prompt Engineering',
    'BCA Data Science · Jyoti Nivas College · Bangalore',
    'Building with Data · Designing with Intent',
    'Turning Curiosity into Creation ✦',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  let paused      = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; }, 2800);
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    if (!paused) {
      setTimeout(tick, deleting ? 40 : 65);
    }
  }

  // Start after hero entrance delay
  setTimeout(tick, 1800);
}

/* ══════════════════════════════════════════════════════════
   PARALLAX ORBS — subtle mouse-follow effect on hero
   ══════════════════════════════════════════════════════════ */
function initParallaxOrbs() {
  const orbs = document.querySelectorAll('.hero-orb');
  if (!orbs.length) return;

  let ticking = false;
  const factors = [0.015, 0.022, 0.012];

  document.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      orbs.forEach((orb, i) => {
        const f = factors[i] || 0.01;
        orb.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
      });
      ticking = false;
    });
  });
}

/* ══════════════════════════════════════════════════════════
   BAR ANIMATION — Amazon chart bars when visible
   ══════════════════════════════════════════════════════════ */
function initBarAnimation() {
  const barGroup = document.querySelector('.chart-bar-group');
  if (!barGroup) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.chart-bar');
        bars.forEach((bar, i) => {
          bar.style.animationDelay = `${i * 0.08}s`;
          bar.style.animationPlayState = 'running';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(barGroup);
}

/* ══════════════════════════════════════════════════════════
   SKILL CARDS — tilt on hover
   ══════════════════════════════════════════════════════════ */
function initSkillHover() {
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = (e.clientX - rect.left) / rect.width  - 0.5;
      const y     = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
}

/* ══════════════════════════════════════════════════════════
   CERT CARDS — subtle parallax image shift on hover
   ══════════════════════════════════════════════════════════ */
function initCertCards() {
  const cards = document.querySelectorAll('.cert-card');
  cards.forEach(card => {
    const img = card.querySelector('.cert-img, .cert-img-fallback');
    if (!img) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform    = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      card.style.transition   = 'transform 0.1s ease';
      card.style.perspective  = '600px';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
}

/* ══════════════════════════════════════════════════════════
   PROJECT CARDS — glow border on hover
   ══════════════════════════════════════════════════════════ */
function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width)  * 100;
      const y    = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

/* ══════════════════════════════════════════════════════════
   ACHIEVEMENT CARDS — counter animation
   ══════════════════════════════════════════════════════════ */
function initAchievementCards() {
  const cards = document.querySelectorAll('.achievement-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(card => observer.observe(card));
}

/* ══════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR — thin line at top of page
   ══════════════════════════════════════════════════════════ */
function initScrollProgress() {
  // Create element
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(90deg, #7B2D35, #C8974F, #7B2D35);
    z-index: 9999;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════
   UTILITY — debounce
   ══════════════════════════════════════════════════════════ */
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ══════════════════════════════════════════════════════════
   RESIZE HANDLER — recalculate on resize
   ══════════════════════════════════════════════════════════ */
window.addEventListener('resize', debounce(() => {
  // Re-check navbar height for smooth scroll offset
  const navbar = document.getElementById('navbar');
  if (navbar) {
    document.documentElement.style.setProperty('--nav-height', `${navbar.offsetHeight}px`);
  }
}, 200));

/* ══════════════════════════════════════════════════════════
   PAGE LOAD — fade-in body
   ══════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
