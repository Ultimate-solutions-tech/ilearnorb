/* Progressive, transform-first motion. No library or persistent background work. */
(function () {
  'use strict';
  const I = window.ILO, U = I.Utils;
  let revealObserver;
  function intro() {
    if (U.reducedMotion.matches) return;
    let show = false;
    try { const key = I.config.STORAGE_PREFIX + 'intro'; show = !sessionStorage.getItem(key); sessionStorage.setItem(key, '1'); } catch (_) { return; }
    if (!show) return;
    const overlay = document.createElement('div'); overlay.className = 'preloader'; overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `<div class="preloader-inner"><svg viewBox="0 0 80 80" fill="none"><circle class="orb-line" cx="40" cy="34" r="26" stroke="currentColor" stroke-width="1.7"/><ellipse class="orb-line" cx="40" cy="34" rx="12" ry="26" stroke="currentColor" stroke-width="1.2"/><path d="M15 30h50M15 40h50M14 47c12-2 18 0 26 5 8-5 14-7 26-5v22c-12-2-18 0-26 5-8-5-14-7-26-5V47Z" stroke="currentColor" stroke-width="1.7"/><path d="M40 52v22" stroke="currentColor"/></svg><div class="preloader-word">${[...I.config.BUSINESS_NAME].map((letter, index) => `<span style="--letter:${index}">${U.escape(letter)}</span>`).join('')}</div><small>Learn. Grow. Become.</small></div>`;
    document.body.append(overlay); document.body.classList.add('intro-playing');
    setTimeout(() => { overlay.classList.add('is-finished'); document.body.classList.remove('intro-playing'); }, 1150);
    setTimeout(() => overlay.remove(), 1650);
  }
  function observe(root = document) {
    if (!revealObserver) return;
    root.querySelectorAll('[data-stagger]').forEach(group => { group.querySelectorAll('.reveal').forEach((element, index) => { element.style.setProperty('--delay', `${(index % 12) * 35}ms`); }); });
    root.querySelectorAll('.reveal:not(.is-visible)').forEach(element => revealObserver.observe(element));
    if (root instanceof Element && root.classList.contains('reveal')) revealObserver.observe(root);
  }
  function reveals() {
    if (U.reducedMotion.matches || !('IntersectionObserver' in window)) return;
    revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), { threshold: .08, rootMargin: '0px 0px -20px 0px' });
    document.documentElement.classList.add('motion-ready'); observe();
    document.addEventListener('ilo:rendered', event => observe(event.detail instanceof Element ? event.detail : document));
    U.reducedMotion.addEventListener('change', event => { if (event.matches) { document.documentElement.classList.remove('motion-ready'); revealObserver.disconnect(); } });
  }
  function counters() {
    const elements = document.querySelectorAll('[data-counter]');
    if (U.reducedMotion.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const target = Number(entry.target.dataset.counter), start = performance.now();
      function tick(now) { const progress = U.reducedMotion.matches ? 1 : Math.min(1, (now - start) / 1100); const value = Math.round(target * (1 - Math.pow(1 - progress, 3))); entry.target.textContent = entry.target.dataset.pad ? String(value).padStart(2, '0') : value; if (progress < 1) requestAnimationFrame(tick); }
      requestAnimationFrame(tick);
    }), { threshold: .5 }); elements.forEach(element => observer.observe(element));
  }
  function scrollEffects() {
    const progress = document.getElementById('scroll-progress'), header = document.getElementById('site-header'), top = document.getElementById('back-top'), art = document.querySelector('.hero-art');
    let pending = false, heroVisible = true;
    if (art && 'IntersectionObserver' in window) new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; }).observe(art);
    const parallax = [...document.querySelectorAll('[data-parallax]')];
    function update() {
      pending = false;
      const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      header.classList.toggle('is-scrolled', y > 25);
      const showTop = y > 600; top.classList.toggle('is-visible', showTop); top.tabIndex = showTop ? 0 : -1; top.setAttribute('aria-hidden', String(!showTop));
      if (!U.reducedMotion.matches) {
        if (art && heroVisible) art.style.setProperty('--hero-scroll', `${Math.min(20, y * .045)}px`);
        parallax.forEach(element => { const r = element.getBoundingClientRect(); if (r.bottom > 0 && r.top < window.innerHeight) element.style.transform = `translateY(${(r.top - window.innerHeight / 2) * Number(element.dataset.parallax)}px)`; });
      }
    }
    const queue = () => { if (!pending) { pending = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', queue, { passive: true }); window.addEventListener('resize', queue, { passive: true }); update();
  }
  function starField() {
    const canvas = document.getElementById('hero-canvas'); if (!canvas || U.reducedMotion.matches || !('IntersectionObserver' in window)) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let active = false, frame = null, width, height;
    const stars = Array.from({ length: window.innerWidth < 700 ? 26 : 48 }, () => ({ x: Math.random(), y: Math.random(), radius: .5 + Math.random(), phase: Math.random() * Math.PI * 2 }));
    function resize() { const rect = canvas.getBoundingClientRect(), ratio = Math.min(2, window.devicePixelRatio || 1); width = rect.width; height = rect.height; canvas.width = width * ratio; canvas.height = height * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); }
    function draw(now) { ctx.clearRect(0, 0, width, height); stars.forEach(star => { ctx.fillStyle = `rgba(190,216,255,${.35 + Math.sin(now / 2400 + star.phase) * .15})`; ctx.beginPath(); ctx.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2); ctx.fill(); }); frame = requestAnimationFrame(draw); }
    function toggle() { if (active && !document.hidden && !U.reducedMotion.matches) { if (frame === null) { resize(); frame = requestAnimationFrame(draw); } } else { cancelAnimationFrame(frame); frame = null; } }
    const observer = new IntersectionObserver(entries => { active = entries[0].isIntersecting; toggle(); }, { threshold: 0 }); observer.observe(canvas);
    window.addEventListener('resize', U.debounce(resize, 180)); document.addEventListener('visibilitychange', toggle); U.reducedMotion.addEventListener('change', toggle);
    window.addEventListener('pagehide', () => { active = false; toggle(); });
    window.addEventListener('pageshow', () => { active = canvas.getBoundingClientRect().bottom > 0; toggle(); });
  }
  function typing() {
    const element = document.getElementById('rotating-word'); if (!element) return;
    const words = ['Habits', 'Wealth', 'Faith', 'Leadership'];
    let word = 0, count = words[0].length, removing = true, timer;
    function tick() {
      if (document.hidden || U.reducedMotion.matches) return;
      count += removing ? -1 : 1; element.textContent = words[word].slice(0, Math.max(0, count));
      let delay = removing ? 55 : 85;
      if (removing && count <= 0) { removing = false; word = (word + 1) % words.length; delay = 190; }
      else if (!removing && count >= words[word].length) { removing = true; delay = 1500; }
      timer = setTimeout(tick, delay);
    }
    if (!U.reducedMotion.matches) timer = setTimeout(tick, 2000);
    else element.textContent = 'Habits · Wealth · Faith · Leadership';
    document.addEventListener('visibilitychange', () => { clearTimeout(timer); if (!document.hidden && !U.reducedMotion.matches) timer = setTimeout(tick, 800); });
    U.reducedMotion.addEventListener('change', event => { clearTimeout(timer); if (event.matches) element.textContent = 'Habits · Wealth · Faith · Leadership'; else timer = setTimeout(tick, 800); });
    window.addEventListener('pagehide', () => clearTimeout(timer));
    window.addEventListener('pageshow', event => { if (event.persisted && !U.reducedMotion.matches) timer = setTimeout(tick, 800); });
  }
  function pointerEffects() {
    if (U.reducedMotion.matches) return;
    document.addEventListener('pointerdown', event => { const button = event.target.closest('.btn'); if (!button || U.reducedMotion.matches) return; const r = button.getBoundingClientRect(), ripple = document.createElement('span'); ripple.className = 'ripple'; ripple.style.left = `${event.clientX - r.left}px`; ripple.style.top = `${event.clientY - r.top}px`; button.append(ripple); setTimeout(() => ripple.remove(), 650); });
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let card = null, bounds, frame = null, pointer;
    document.addEventListener('pointerover', event => { const next = event.target.closest('.book-card'); if (next && next !== card) { card = next; bounds = card.getBoundingClientRect(); } });
    document.addEventListener('pointermove', event => {
      if (!card || U.reducedMotion.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = null; if (!card) return; card.style.setProperty('--ry', `${(pointer.x - bounds.left - bounds.width / 2) / bounds.width * 14}deg`); card.style.setProperty('--rx', `${-(pointer.y - bounds.top - bounds.height / 2) / bounds.height * 10}deg`); });
    });
    document.addEventListener('pointerout', event => { if (card && !card.contains(event.relatedTarget)) { card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg'); card = null; } });
    const hero = document.querySelector('.hero-art');
    if (hero) {
      let rect, queued = false, x = 0, y = 0;
      hero.addEventListener('pointerenter', () => { rect = hero.getBoundingClientRect(); });
      hero.addEventListener('pointermove', event => { if (U.reducedMotion.matches) return; rect = rect || hero.getBoundingClientRect(); x = (event.clientX - rect.left - rect.width / 2) / rect.width * 12; y = -(event.clientY - rect.top - rect.height / 2) / rect.height * 9; if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; hero.style.setProperty('--hero-y', `${x}deg`); hero.style.setProperty('--hero-x', `${y}deg`); }); } });
      hero.addEventListener('pointerleave', () => { x = y = 0; hero.style.setProperty('--hero-y', '0deg'); hero.style.setProperty('--hero-x', '0deg'); });
    }
    document.querySelectorAll('[data-magnetic]').forEach(button => {
      let rect;
      button.addEventListener('pointerenter', () => { rect = button.getBoundingClientRect(); });
      button.addEventListener('pointermove', event => { if (U.reducedMotion.matches) return; button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .08}px,${(event.clientY - rect.top - rect.height / 2) * .12}px)`; });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }
  function deviceMotion() {
    const button = document.getElementById('enable-motion'), hero = document.querySelector('.hero-art');
    if (!button || !hero || !window.DeviceOrientationEvent || U.reducedMotion.matches || !window.matchMedia('(pointer: coarse)').matches) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        if (typeof DeviceOrientationEvent.requestPermission === 'function' && await DeviceOrientationEvent.requestPermission() !== 'granted') { U.toast('Motion permission was not granted. The books will stay still.'); return; }
        let queued = false, x = 0, y = 0;
        window.addEventListener('deviceorientation', event => { if (U.reducedMotion.matches || document.hidden) return; x = Math.max(-7, Math.min(7, (event.gamma || 0) / 4)); y = Math.max(-5, Math.min(5, ((event.beta || 30) - 30) / 7)); if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; hero.style.setProperty('--hero-y', `${x}deg`); hero.style.setProperty('--hero-x', `${y}deg`); }); } }, { passive: true });
        button.textContent = 'Book motion enabled'; button.disabled = true;
      } catch (_) { U.toast('Device motion is unavailable in this browser.'); }
    });
  }
  function transitions() {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download') || U.reducedMotion.matches) return;
      const url = new URL(link.href);
      if (!url.href.startsWith(U.root) || !url.pathname.endsWith('.html')) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) { const dialog = link.closest('dialog'); if (dialog) U.closeDialog(dialog); return; }
      event.preventDefault(); document.body.classList.add('page-leaving');
      setTimeout(() => { window.location.href = url.href; }, 150);
    });
    window.addEventListener('pageshow', () => document.body.classList.remove('page-leaving'));
  }
  I.Motion = { init() { intro(); reveals(); counters(); scrollEffects(); starField(); typing(); pointerEffects(); deviceMotion(); transitions(); } };
})();
