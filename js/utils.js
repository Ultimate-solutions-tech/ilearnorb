/* Shared pure helpers and small accessible UI primitives. No network data loading. */
(function () {
  'use strict';
  const I = window.ILO;
  const C = I.config;
  const ROOT = new URL('../', document.currentScript.src);
  const memory = new Map();
  const coverCache = new Map();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const iconPaths = {
    arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    left: '<path d="m14 6-6 6 6 6"/>',
    right: '<path d="m10 6 6 6-6 6"/>',
    up: '<path d="m6 14 6-6 6 6"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    bag: '<path d="M5 7h14l1 14H4L5 7Zm3 0V6a4 4 0 0 1 8 0v1"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    star: '<path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4L2.8 9.7l6.4-.9L12 3Z"/>',
    whatsapp: '<path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.8a8.5 8.5 0 1 1 16.1-4.1Z"/><path d="m8 7 1.4 2.8-.9 1a9 9 0 0 0 3.7 3.7l1-1 2.8 1.4c-.4 2-1.7 2-3.3 1.4-3.4-1.4-5.4-3.4-6-6C6.4 8.8 6.5 7.3 8 7Z"/>',
    book: '<path d="M12 5v16M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2V4Z"/>',
    truck: '<path d="M2 5h12v12H2V5Zm12 4h4l4 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
    pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    phone: '<path d="m6 3 3 5-2 2a16 16 0 0 0 7 7l2-2 5 3c-1 3-3 4-6 3C8 18 3 13 2 7c0-2 1-3 4-4Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="5" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8 10 7-4M8 14l7 4"/>',
    filter: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
    spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M14 21v-8h3l1-4h-4V7c0-1 1-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>',
    x: '<path d="m4 3 16 18M20 3 4 21M4 3h4l12 18h-4L4 3Z"/>'
  };
  let adapter = null;
  for (const name of ['localStorage', 'sessionStorage']) {
    try {
      const candidate = window[name];
      const probe = C.STORAGE_PREFIX + 'probe';
      candidate.setItem(probe, '1'); candidate.removeItem(probe);
      adapter = candidate; break;
    } catch (_) { /* Sandboxed/private browsers fall back without breaking the UI. */ }
  }
  const U = {
    root: ROOT.href,
    reducedMotion,
    storagePersistent: false,
    escape(value) { return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); },
    href(path = 'index.html', params = {}) {
      const url = new URL(path, ROOT);
      Object.entries(params).forEach(([key, value]) => { if (value !== '' && value != null) url.searchParams.set(key, String(value)); });
      return url.href;
    },
    canonical(path = 'index.html', params = {}) {
      const url = new URL(path, C.SITE_URL.endsWith('/') ? C.SITE_URL : C.SITE_URL + '/');
      Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
      return url.href;
    },
    money(value) { return C.CURRENCY_SYMBOL + new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(Number(value) || 0); },
    disclaimer() { return [C.PRICES_ARE_PLACEHOLDERS ? 'Placeholder prices.' : '', C.RATINGS_ARE_SAMPLES ? 'Sample ratings, not customer reviews.' : '', 'Illustrative catalogue covers. Confirm stock, edition and current price on WhatsApp.'].filter(Boolean).join(' '); },
    quantity(value) { return Math.min(C.MAX_QUANTITY, Math.max(1, Math.floor(Number(value)) || 1)); },
    book(id) { return I.books.find(book => String(book.id) === String(id) || book.slug === id); },
    category(slug) { return I.categories.find(category => category.slug === slug); },
    normalise(text) { return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim(); },
    search(query, books = I.books) {
      const tokens = U.normalise(query).split(/\s+/).filter(Boolean);
      return books.filter(book => { const text = U.normalise(book.title + ' ' + book.author + ' ' + book.category); return tokens.every(token => text.includes(token)); });
    },
    debounce(fn, delay = 150) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; },
    read(key, fallback) {
      const fullKey = C.STORAGE_PREFIX + key;
      try {
        const raw = adapter ? adapter.getItem(fullKey) : memory.get(fullKey);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (_) { return fallback; }
    },
    write(key, value) {
      const fullKey = C.STORAGE_PREFIX + key;
      const raw = JSON.stringify(value);
      memory.set(fullKey, raw);
      try { if (adapter) adapter.setItem(fullKey, raw); } catch (_) { adapter = null; U.storagePersistent = false; }
    },
    emit(name, detail) { document.dispatchEvent(new CustomEvent('ilo:' + name, { detail })); },
    icon(name, classes = '') { return `<svg class="icon ${U.escape(classes)}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.book}</svg>`; },
    logoMark() { return '<svg class="logo-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="21" r="17" stroke="currentColor" stroke-width="2"/><ellipse cx="24" cy="21" rx="8" ry="17" stroke="currentColor" stroke-width="1.4"/><path d="M8 16h32M7 25h34" stroke="currentColor" stroke-width="1.4"/><path d="M6 27c7-2 12 0 18 4 6-4 11-6 18-4v15c-7-2-12 0-18 4-6-4-11-6-18-4V27Z" fill="white" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M24 31v14M11 32c4 0 7 1 9 3m8 0c2-2 5-3 9-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'; },
    logo() { return `<a class="logo" href="${U.href()}" aria-label="${U.escape(C.BUSINESS_NAME)} home">${U.logoMark()}<span class="logo-type"><em>i</em>Learn<em>Orb</em></span></a>`; },
    whatsApp(message) { return `https://wa.me/${C.WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`; },
    generalMessage() { return `Hello ${C.BUSINESS_NAME} 👋, I'd like some help choosing a book. Please share availability and delivery details. Thank you!`; },
    orderMessage(book, quantity = 1) {
      const qty = U.quantity(quantity);
      return `Hello ${C.BUSINESS_NAME} 👋, I'd like to order:\n📖 ${book.title} by ${book.author}\n💰 Price: ${U.money(book.price)}\nQty: ${qty}${qty > 1 ? '\nSubtotal: ' + U.money(book.price * qty) : ''}\nPlease confirm availability, current price and delivery to my location. Thank you!`;
    },
    wrap(text, size = 30, bold = true) {
      // Measure actual glyph widths: character counts can clip wide book titles.
      const context = U.wrap.context || (U.wrap.context = document.createElement('canvas').getContext('2d'));
      if (context) context.font = `${bold ? 700 : 400} ${size}px Arial`;
      const width = value => context ? context.measureText(value).width : value.length * size * .56;
      const lines = []; let line = '';
      String(text).split(/\s+/).forEach(word => { const next = line ? line + ' ' + word : word; if (line && width(next) > 252) { lines.push(line); line = word; } else line = next; });
      if (line) lines.push(line);
      return lines;
    },
    coverSource(book) {
      if (book.image) return new URL(book.image, ROOT).href;
      if (coverCache.has(book.id)) return coverCache.get(book.id);
      const colours = book.coverColor.match(/#[\da-f]{6}/ig) || ['#0A3D91', '#04112B'];
      const light = ['#E8F0FF', '#D9E8FF'].includes(colours[0].toUpperCase());
      const ink = light ? '#04112B' : '#FFFFFF';
      const accent = light ? '#0A3D91' : '#B0D0FF';
      let size = book.title.length > 70 ? 27 : book.title.length > 40 ? 30 : 35;
      let lines = U.wrap(book.title, size);
      while (lines.length > 7 && size > 21) { size -= 1; lines = U.wrap(book.title, size); }
      const title = lines.map((line, index) => `<tspan x="34" y="${136 + index * (size + 7)}">${U.escape(line)}</tspan>`).join('');
      const author = U.wrap(book.author, 13, false).map((line, index) => `<tspan x="34" y="${397 + index * 18}">${U.escape(line)}</tspan>`).join('');
      const variant = book.id % 4;
      const patterns = [
        '<circle cx="246" cy="302" r="110"/><circle cx="246" cy="302" r="80"/><circle cx="246" cy="302" r="50"/>',
        '<path d="M0 340 320 185M0 375 320 220M0 410 320 255M0 445 320 290"/>',
        '<ellipse cx="254" cy="283" rx="120" ry="70" transform="rotate(-35 254 283)"/><ellipse cx="254" cy="283" rx="87" ry="45" transform="rotate(-35 254 283)"/>',
        '<path d="M160 460V235h160M200 460V275h120M240 460V315h80M280 460V355h40"/>'
      ];
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="460" viewBox="0 0 320 460"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${colours[0]}"/><stop offset="1" stop-color="${colours[1]}"/></linearGradient><linearGradient id="s"><stop stop-color="#000" stop-opacity=".23"/><stop offset=".6" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs><rect width="320" height="460" fill="url(#g)"/><g fill="none" stroke="${accent}" stroke-width="1" opacity=".23">${patterns[variant]}</g><rect width="15" height="460" fill="url(#s)"/><path d="M21 0v460" stroke="${ink}" opacity=".12"/><g font-family="Arial, sans-serif"><text x="34" y="43" fill="${accent}" font-size="10" letter-spacing="2">ILEARNORB COLLECTION</text><text x="34" y="76" fill="${ink}" font-size="10" letter-spacing="1.2">${U.escape(book.category.toUpperCase())}</text><path d="M34 95h35" stroke="${accent}" stroke-width="2"/><text fill="${ink}" font-size="${size}" font-weight="700" letter-spacing="-.8">${title}</text><text fill="${ink}" font-size="13">${author}</text><text x="34" y="444" fill="${accent}" font-size="8" letter-spacing="1.5">LEARN. GROW. BECOME.</text><text x="286" y="444" fill="${accent}" font-size="9" text-anchor="end">${String(book.id).padStart(3, '0')}</text></g></svg>`;
      const source = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      coverCache.set(book.id, source);
      return source;
    },
    cover(book, classes = '', eager = false) {
      return `<img class="${U.escape(classes)}" src="${U.escape(U.coverSource(book))}" width="320" height="460" alt="${U.escape(book.title)} by ${U.escape(book.author)}${book.image ? '' : ' — illustrative typographic cover'}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
    },
    bookCard(book) {
      const saved = I.Wishlist ? I.Wishlist.has(book.id) : false;
      return `<article class="book-card reveal" data-book-id="${book.id}"><a class="cover-stage" href="${U.href('pages/book.html', { id: book.id })}" tabindex="-1" aria-hidden="true"><div class="cover-wrap">${U.cover(book)}</div></a>${book.badge ? `<span class="badge card-badge ${book.badge === 'New' ? 'badge-new' : ''}">${book.badge}</span>` : ''}<button class="icon-button card-heart" data-wishlist="${book.id}" aria-pressed="${saved}" aria-label="${saved ? 'Unsave' : 'Save'} ${U.escape(book.title)}">${U.icon('heart')}</button><div class="card-copy"><a class="card-category" href="${U.href('pages/category.html', { c: book.categorySlug })}">${U.escape(book.category)}</a><h3 class="card-title"><a href="${U.href('pages/book.html', { id: book.id })}">${U.escape(book.title)}</a></h3><p class="card-author">${U.escape(book.author)}</p><div class="card-bottom"><span class="card-price">${U.money(book.price)}</span><span class="card-rating" aria-label="${C.RATINGS_ARE_SAMPLES ? 'Sample rating' : 'Rating'} ${book.rating} out of 5">${U.icon('star')}${book.rating.toFixed(1)}</span></div><a class="btn btn-whatsapp card-order" href="${U.whatsApp(U.orderMessage(book))}" target="_blank" rel="noopener noreferrer" aria-label="Order ${U.escape(book.title)} on WhatsApp">${U.icon('whatsapp')}Order Now</a></div></article>`;
    },
    skeletons(count = 12) { return Array.from({ length: count }, () => '<div class="skeleton" aria-hidden="true"><div class="skeleton-cover"></div><div class="skeleton-line"></div><div class="skeleton-line"></div><div class="skeleton-line"></div></div>').join(''); },
    empty({ icon = 'book', title, text, link = 'pages/catalogue.html', label = 'Browse books', heading = 'h2' }) {
      const tag = heading === 'h1' ? 'h1' : 'h2';
      return `<div class="empty-state"><div class="empty-icon">${U.icon(icon)}</div><${tag}>${U.escape(title)}</${tag}><p>${U.escape(text)}</p><a class="btn btn-primary" href="${U.href(link)}">${U.escape(label)}${U.icon('arrow')}</a></div>`;
    },
    toast(message, icon = 'check') {
      const region = document.getElementById('toast-region'); if (!region) return;
      const toast = document.createElement('div'); toast.className = 'toast';
      toast.innerHTML = `${U.icon(icon)}<span>${U.escape(message)}</span><button class="icon-button" aria-label="Dismiss notification">${U.icon('close')}</button>`;
      region.append(toast); while (region.children.length > 3) region.firstElementChild.remove();
      let timer = setTimeout(() => toast.remove(), 4300);
      toast.querySelector('button').addEventListener('click', () => { clearTimeout(timer); toast.remove(); });
      toast.addEventListener('mouseenter', () => clearTimeout(timer));
      toast.addEventListener('mouseleave', () => { timer = setTimeout(() => toast.remove(), 2000); });
      toast.addEventListener('focusin', () => clearTimeout(timer));
      toast.addEventListener('focusout', () => { timer = setTimeout(() => toast.remove(), 2000); });
    },
    openDialog(id) {
      const dialog = document.getElementById(id); if (!dialog || dialog.open) return;
      document.querySelectorAll('dialog[open]').forEach(open => { open.close(); open.classList.remove('is-closing'); });
      dialog._returnFocus = document.activeElement;
      dialog.classList.remove('is-closing'); dialog.showModal(); document.body.classList.add('has-dialog');
      // Keep notifications in the modal's top layer, not behind its inert backdrop.
      const notifications = document.getElementById('toast-region'); if (notifications) dialog.append(notifications);
      requestAnimationFrame(() => { const first = dialog.querySelector('[autofocus]') || dialog.querySelector('button, a, input'); if (first) first.focus(); });
    },
    closeDialog(dialog) {
      if (typeof dialog === 'string') dialog = document.getElementById(dialog);
      if (!dialog || !dialog.open || dialog.classList.contains('is-closing')) return;
      dialog.classList.add('is-closing');
      setTimeout(() => {
        const notifications = document.getElementById('toast-region');
        if (notifications && dialog.contains(notifications)) document.body.append(notifications);
        dialog.close(); dialog.classList.remove('is-closing');
        if (!document.querySelector('dialog[open]')) document.body.classList.remove('has-dialog');
        if (dialog._returnFocus && document.contains(dialog._returnFocus)) dialog._returnFocus.focus();
      }, reducedMotion.matches ? 0 : 170);
    },
    setupDialogs() {
      document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('cancel', event => { event.preventDefault(); U.closeDialog(dialog); });
        dialog.addEventListener('click', event => { if (event.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) U.closeDialog(dialog); });
      });
    },
    attachSuggestions(input, list, options = {}) {
      if (!input || !list) return;
      let selected = -1;
      input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-expanded', 'false'); input.setAttribute('aria-controls', list.id);
      list.setAttribute('role', 'listbox'); list.setAttribute('aria-label', 'Matching books');
      function hide() { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); selected = -1; }
      function show() {
        const query = input.value.trim(); selected = -1;
        input.removeAttribute('aria-activedescendant');
        if (!query) { hide(); return; }
        const matches = U.search(query).slice(0, 6);
        list.innerHTML = matches.length ? matches.map((book, index) => `<a class="suggestion" id="${list.id}-${index}" role="option" aria-selected="false" tabindex="-1" href="${U.href('pages/book.html', { id: book.id })}">${U.cover(book)}<span><strong>${U.escape(book.title)}</strong><small>${U.escape(book.author)} · ${U.money(book.price)}</small></span></a>`).join('') : '<div class="suggestion-empty" role="option" aria-disabled="true">No matching books. Try a title, author or category.</div>';
        list.hidden = false; input.setAttribute('aria-expanded', 'true');
      }
      input.addEventListener('input', hide);
      input.addEventListener('input', U.debounce(() => { if (document.activeElement === input) show(); if (options.onInput) options.onInput(input.value); }, 130));
      input.addEventListener('focus', () => { if (input.value.trim()) show(); });
      input.addEventListener('blur', () => setTimeout(() => { if (!list.contains(document.activeElement)) hide(); }, 160));
      input.addEventListener('keydown', event => {
        if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && list.hidden) show();
        const items = [...list.querySelectorAll('a[role="option"]')];
        if (event.key === 'Escape' && !list.hidden) { event.preventDefault(); event.stopPropagation(); hide(); }
        if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && items.length) {
          event.preventDefault(); selected = (selected + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
          items.forEach((item, index) => item.setAttribute('aria-selected', String(index === selected)));
          input.setAttribute('aria-activedescendant', items[selected].id); items[selected].scrollIntoView({ block: 'nearest' });
        }
        if (event.key === 'Enter') { event.preventDefault(); if (!list.hidden && items[selected]) window.location.href = items[selected].href; else if (options.onSubmit) options.onSubmit(input.value); hide(); }
      });
      return { hide };
    },
    setSEO({ title, description, path, params = {} }) {
      document.title = title + ' | ' + C.BUSINESS_NAME;
      const canonical = U.canonical(path, params);
      const values = [['name', 'description', description], ['property', 'og:title', document.title], ['property', 'og:description', description], ['property', 'og:url', canonical], ['name', 'twitter:title', document.title], ['name', 'twitter:description', description]];
      values.forEach(([attr, key, value]) => { const element = document.querySelector(`meta[${attr}="${key}"]`); if (element) element.content = value; });
      const link = document.querySelector('link[rel="canonical"]'); if (link) link.href = canonical;
    },
    jsonLD(id, data) {
      let element = document.getElementById(id);
      if (!element) { element = document.createElement('script'); element.type = 'application/ld+json'; element.id = id; document.head.append(element); }
      element.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    },
    async copy(text) {
      try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch (_) { /* Try the offline-friendly fallback. */ }
      const field = document.createElement('textarea'); field.value = text; field.setAttribute('readonly', ''); field.style.cssText = 'position:fixed;left:-9999px;top:0'; document.body.append(field); field.select();
      let copied = false; try { copied = document.execCommand('copy'); } catch (_) { /* Caller shows a selectable link. */ }
      field.remove(); return copied;
    }
  };
  // Accessing the localStorage getter can itself throw in a sandbox.
  try { U.storagePersistent = adapter === window.localStorage; } catch (_) { U.storagePersistent = false; }
  I.Utils = U;
})();
