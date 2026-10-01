/* The header/footer live here once. This file also coordinates page modules. */
(function () {
  'use strict';
  const I = window.ILO, U = I.Utils, C = I.config;
  const faq = [
    { id: 'ordering', question: 'How do I place an order?', answer: 'Browse the catalogue, open a book and tap Order Now. WhatsApp opens with the title, price and quantity already written for you. Tap Send in WhatsApp, then wait for our confirmation of availability, current price, delivery and payment details.' },
    { id: 'order-list', question: 'Can I order several books together?', answer: 'Yes. Open each book and choose Add to Order List. You can change quantities, remove books and add an optional name and delivery area on the Order List page. Send Order on WhatsApp prepares one message with all your books and the book total.' },
    { id: 'prices', question: 'Are the catalogue prices and ratings final?', answer: 'This starter catalogue contains placeholder prices and sample ratings, not verified customer reviews. Current prices, editions and stock must be confirmed in your WhatsApp conversation before you pay. Illustrated covers are catalogue designs, not the publisher’s cover artwork.' },
    { id: 'delivery', question: 'Do you deliver outside Ado Ekiti?', answer: 'The service is designed for readers in Ado Ekiti and across Nigeria. Share your town or delivery area on WhatsApp so we can confirm whether delivery is available there, the fee and the expected timing for your particular order.' },
    { id: 'fees', question: 'How much does delivery cost, and how long does it take?', answer: 'Delivery depends on your location, the size of your order and the available delivery arrangement. There is no fixed fee or guaranteed timeframe on this site. We will provide a delivery quote and timing before you confirm your order.' },
    { id: 'payment', question: 'When and how do I pay?', answer: 'There is no online checkout or payment collection here. First confirm the books, their current prices and delivery in your chat. The owner will then explain the available payment method and when payment is due. Pay on confirmation does not mean guaranteed cash on delivery.' },
    { id: 'format', question: 'What format and edition will I receive?', answer: 'The catalogue is set up for paperback books. The precise edition, publisher, condition and cover can vary, so ask for those details or a current photo before confirming. Generated catalogue covers are illustrative only.' },
    { id: 'collection', question: 'Can I arrange collection in Ado Ekiti?', answer: 'Please ask on WhatsApp. A collection point and time, if available, will be confirmed by the owner. We list the general location of Ado Ekiti, not a verified street address or walk-in shop pin.' },
    { id: 'request', question: 'What if the book I want is not listed?', answer: 'Send us the title and author on WhatsApp. We can discuss whether it can be sourced and provide an availability and price update. A sourcing request is not a promise that a particular book is in stock.' },
    { id: 'returns', question: 'What should I do if there is a problem with my order?', answer: 'Message the owner promptly with your order details and a clear description or photo of the issue. Ask for the applicable cancellation, return and damage-resolution terms before confirming your order; this starter site does not invent a returns policy.' },
    { id: 'storage', question: 'Do I need an account, and does this site track me?', answer: 'No account is needed and there are no tracking cookies or analytics. Your wishlist, order list and recently viewed books are saved in this browser where storage is available. If storage is blocked, the site uses session or in-page memory. Name and delivery-area inputs are not saved. WhatsApp and Google Fonts have their own privacy practices when you use them.' }
  ];
  function header() {
    const page = document.body.dataset.page;
    const current = pages => pages.includes(page) ? ' aria-current="true"' : '';
    document.getElementById('site-header').innerHTML = `<div class="container navbar">${U.logo()}<nav class="nav-links" aria-label="Primary"><a href="${U.href('pages/catalogue.html')}"${current(['catalogue', 'category', 'book'])}>Browse books</a><a href="${U.href()}#categories">Collections</a><a href="${U.href('pages/how-to-order.html')}"${current(['how-to-order'])}>How to order</a><a href="${U.href('pages/about.html')}"${current(['about'])}>Our story</a></nav><div class="nav-actions"><button class="icon-button" data-open="search-dialog" aria-label="Search books" aria-haspopup="dialog">${U.icon('search')}</button><a class="icon-button" href="${U.href('pages/wishlist.html')}" aria-label="Wishlist, 0 saved books" id="wishlist-nav">${U.icon('heart')}<span class="count-badge" data-wishlist-count hidden>0</span></a><button class="icon-button" data-open="mini-cart" aria-label="Order list, 0 books" aria-haspopup="dialog" id="cart-nav">${U.icon('bag')}<span class="count-badge" data-cart-count hidden>0</span></button><button class="icon-button menu-toggle" data-open="mobile-menu" aria-label="Open navigation menu" aria-haspopup="dialog"><span class="menu-lines" aria-hidden="true"><span></span><span></span><span></span></span></button></div></div>`;
  }
  function phone() { const number = C.WHATSAPP_NUMBER.replace(/^234/, '0'); return number.length === 11 ? `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(7)}` : '+' + C.WHATSAPP_NUMBER; }
  function socialLinks() {
    return Object.entries(C.SOCIAL).map(([name, url]) => `<a href="${url ? U.escape(url) : '#'}" aria-label="${name}${url ? '' : ' — link coming soon'}" ${url ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true" tabindex="-1"'}>${U.icon(name)}</a>`).join('');
  }
  function footer() {
    document.getElementById('site-footer').innerHTML = `<div class="container"><div class="footer-grid"><div class="footer-brand">${U.logo()}<p>Good books for the person you’re becoming. A thoughtfully curated shelf, a simple conversation, a new chapter.</p><div class="social-links">${socialLinks()}</div><p class="fine-print" style="color:#ADBBD1">${Object.values(C.SOCIAL).some(Boolean) ? 'Find your reading community.' : 'Social profiles coming soon.'}</p></div><div><h2 class="footer-heading">Explore</h2><nav class="footer-links" aria-label="Footer"><a href="${U.href('pages/catalogue.html')}">All books</a><a href="${U.href('pages/about.html')}">Our story</a><a href="${U.href('pages/how-to-order.html')}">How to order</a><a href="${U.href('pages/wishlist.html')}">Saved books</a><a href="${U.href('pages/cart.html')}">Your order list</a><a href="${U.href('pages/faq.html')}">FAQs</a><a href="${U.href('pages/contact.html')}">Get in touch</a></nav></div><div><h2 class="footer-heading">Find your shelf</h2><nav class="footer-links" aria-label="Book categories">${I.categories.map(category => `<a href="${U.href('pages/category.html', { c: category.slug })}">${U.escape(category.name)}</a>`).join('')}</nav></div><div class="footer-contact"><h2 class="footer-heading">A conversation away</h2><p class="footer-location">${U.icon('pin')}<span>${U.escape(C.LOCATION)}</span></p><div class="footer-links"><a href="${U.whatsApp(U.generalMessage())}" target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a><a href="tel:+${C.WHATSAPP_NUMBER}">${phone()}</a><span>${U.escape(C.HOURS)}${C.HOURS_ARE_PLACEHOLDERS ? '<br><small>Sample hours — please confirm.</small>' : ''}</span></div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${U.escape(C.BUSINESS_NAME)}. Learn. Grow. Become.</span><span>Illustrative covers · ${C.PRICES_ARE_PLACEHOLDERS ? 'Placeholder prices · ' : ''}<a href="${U.href('pages/faq.html')}#faq-storage">No tracking cookies</a></span><span>Made for curious minds in Nigeria.</span></div></div>`;
  }
  function globalUI() {
    document.body.insertAdjacentHTML('beforeend', `<div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div><dialog class="side-drawer" id="mobile-menu" aria-labelledby="mobile-menu-title"><div class="drawer-head"><h2 id="mobile-menu-title">Your next chapter.</h2><button class="icon-button" data-close aria-label="Close navigation">${U.icon('close')}</button></div><div class="drawer-content">${U.logo()}<nav class="drawer-nav" aria-label="Mobile navigation"><a href="${U.href()}">Home</a><a href="${U.href('pages/catalogue.html')}">Browse all books</a><a href="${U.href()}#categories">Explore collections</a><a href="${U.href('pages/how-to-order.html')}">How to order</a><a href="${U.href('pages/about.html')}">Our story</a><a href="${U.href('pages/wishlist.html')}">Saved books</a><a href="${U.href('pages/cart.html')}">Your order list</a><a href="${U.href('pages/faq.html')}">FAQs</a><a href="${U.href('pages/contact.html')}">Get in touch</a></nav><a class="btn btn-whatsapp btn-block" href="${U.whatsApp(U.generalMessage())}" target="_blank" rel="noopener noreferrer">${U.icon('whatsapp')}Let’s talk books</a><p class="fine-print" style="margin-top:18px">${U.escape(C.LOCATION)}</p></div></dialog><dialog class="side-drawer" id="mini-cart" aria-labelledby="mini-cart-title"><div class="drawer-head"><h2 id="mini-cart-title">Your order list</h2><button class="icon-button" data-close aria-label="Close order list">${U.icon('close')}</button></div><div class="drawer-content" id="mini-cart-items"></div><div class="drawer-foot" id="mini-cart-footer"></div></dialog><dialog class="search-dialog" id="search-dialog" aria-labelledby="search-title"><div class="drawer-head"><h2 id="search-title">Find your next read.</h2><button class="icon-button" data-close aria-label="Close search">${U.icon('close')}</button></div><form class="search-box" id="global-search-form"><label class="sr-only" for="global-search">Search titles, authors or categories</label><div class="search-field">${U.icon('search')}<input id="global-search" type="search" placeholder="A title, an author, an idea…" autocomplete="off" maxlength="200" autofocus></div><div class="suggestions" id="global-suggestions" hidden></div></form><p class="search-hint">Try “habits”, “Morgan Housel” or “leadership”. Use ↑ ↓ to explore, Enter to choose.</p></dialog><dialog class="search-dialog" id="clear-list-dialog" aria-labelledby="clear-list-title"><div class="drawer-head"><h2 id="clear-list-title">Start a fresh reading stack?</h2><button class="icon-button" data-close aria-label="Cancel clearing order list">${U.icon('close')}</button></div><div class="panel" style="border:0;box-shadow:none"><p class="text-muted">This removes all books from this browser’s order list. Your wishlist stays saved.</p><div class="btn-row"><button class="btn btn-outline" data-close>Keep my books</button><button class="btn btn-primary" data-clear-confirm>Clear order list</button></div></div></dialog><dialog class="search-dialog" id="share-dialog" aria-labelledby="share-title"><div class="drawer-head"><h2 id="share-title">Share this chapter.</h2><button class="icon-button" data-close aria-label="Close share link">${U.icon('close')}</button></div><div class="panel" style="border:0;box-shadow:none"><div class="field"><label for="share-url">Select and copy this link</label><input id="share-url" type="text" readonly></div><p class="fine-print" style="margin-top:12px">Local file links work only on your device. Public sharing works after deployment.</p></div></dialog><div id="toast-region" class="toast-region" role="status" aria-live="polite" aria-atomic="false"></div><a class="floating-whatsapp" href="${U.whatsApp(U.generalMessage())}" target="_blank" rel="noopener noreferrer" aria-label="Chat with ${U.escape(C.BUSINESS_NAME)} on WhatsApp">${U.icon('whatsapp')}</a><button class="icon-button back-top" id="back-top" aria-label="Back to top">${U.icon('up')}</button>`);
    U.setupDialogs();
  }
  function badges() {
    document.querySelectorAll('[data-cart-count]').forEach(badge => { badge.textContent = I.Cart.count() > 99 ? '99+' : I.Cart.count(); badge.hidden = !I.Cart.count(); });
    document.querySelectorAll('[data-wishlist-count]').forEach(badge => { badge.textContent = I.Wishlist.count(); badge.hidden = !I.Wishlist.count(); });
    document.getElementById('cart-nav').setAttribute('aria-label', `Order list, ${I.Cart.count()} books`);
    document.getElementById('wishlist-nav').setAttribute('aria-label', `Wishlist, ${I.Wishlist.count()} saved books`);
  }
  function bindGlobal() {
    document.addEventListener('click', event => {
      const open = event.target.closest('[data-open]'); if (open) U.openDialog(open.dataset.open);
      const close = event.target.closest('[data-close]'); if (close) U.closeDialog(close.closest('dialog'));
      const disabled = event.target.closest('[aria-disabled="true"]'); if (disabled) event.preventDefault();
      const carousel = event.target.closest('[data-carousel]'); if (carousel) { const track = document.getElementById(carousel.dataset.carousel); if (track) track.scrollBy({ left: Number(carousel.dataset.direction) * (track.firstElementChild?.getBoundingClientRect().width + 22 || 260), behavior: U.reducedMotion.matches ? 'auto' : 'smooth' }); }
    });
    document.getElementById('back-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: U.reducedMotion.matches ? 'auto' : 'smooth' }));
    const search = document.getElementById('global-search');
    U.attachSuggestions(search, document.getElementById('global-suggestions'), { onSubmit: query => { window.location.href = U.href('pages/catalogue.html', { q: query.trim() }); } });
    document.getElementById('global-search-form').addEventListener('submit', event => { event.preventDefault(); window.location.href = U.href('pages/catalogue.html', { q: search.value.trim() }); });
    document.addEventListener('ilo:cart', badges); document.addEventListener('ilo:wishlist', badges);
    document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = U.whatsApp(link.dataset.whatsapp === 'community' ? `Hello ${C.BUSINESS_NAME} 👋, I'd love to join your reading community and hear about new books. Please share how I can join. Thank you!` : U.generalMessage()); link.target = '_blank'; link.rel = 'noopener noreferrer'; });
    document.querySelectorAll('[data-location]').forEach(element => { element.textContent = C.LOCATION; });
    document.querySelectorAll('[data-delivery-note]').forEach(element => { element.textContent = C.DELIVERY_NOTE; });
    document.querySelectorAll('[data-catalogue-note]').forEach(element => { element.textContent = U.disclaimer(); });
    document.querySelectorAll('[data-phone]').forEach(element => { element.href = 'tel:+' + C.WHATSAPP_NUMBER; element.textContent = phone(); });
    document.querySelectorAll('[data-hours]').forEach(element => { element.textContent = C.HOURS + (C.HOURS_ARE_PLACEHOLDERS ? ' · Sample hours, please confirm.' : ''); });
    const email = document.getElementById('contact-email');
    if (email) email.innerHTML = C.EMAIL.endsWith('.example') ? `${U.escape(C.EMAIL)}<br><span class="fine-print">Placeholder email. Please use WhatsApp for now.</span>` : `<a href="mailto:${U.escape(C.EMAIL)}">${U.escape(C.EMAIL)}</a>`;
  }
  function home() {
    const categories = document.getElementById('home-categories'); if (!categories) return;
    categories.innerHTML = I.categories.map(category => `<a class="category-card reveal" href="${U.href('pages/category.html', { c: category.slug })}"><span class="category-icon">${category.icon}</span>${U.icon('arrow')}<h3>${U.escape(category.name)}</h3><p>${I.books.filter(book => book.categorySlug === category.slug).length} books to explore</p></a>`).join('');
    [['featured-books', book => book.featured, 12], ['bestseller-books', book => book.badge === 'Bestseller', 4], ['new-books', book => book.badge === 'New', 4]].forEach(([id, filter, count]) => { document.getElementById(id).innerHTML = I.books.filter(filter).slice(0, count).map(U.bookCard).join(''); });
    [['hero-book-main', 1], ['hero-book-back', 31], ['hero-book-front', 11]].forEach(([id, book]) => { document.getElementById(id).innerHTML = U.cover(U.book(book), '', true); });
    const words = I.categories.map(category => `<span class="marquee-item">${U.escape(category.name)}</span>`).join('');
    document.getElementById('marquee-track').innerHTML = `<div class="marquee-set">${words}</div><div class="marquee-set" aria-hidden="true">${words}</div>`;
    document.getElementById('marquee-pause').addEventListener('click', event => { const paused = event.currentTarget.getAttribute('aria-pressed') !== 'true'; event.currentTarget.setAttribute('aria-pressed', String(paused)); event.currentTarget.textContent = paused ? 'Resume motion' : 'Pause motion'; document.getElementById('marquee-track').style.animationPlayState = paused ? 'paused' : ''; });
    const reviews = [
      { name: 'Tolu A.', area: 'Ado Ekiti · Student', initials: 'TA', text: 'I like finding books by what I want to work on. The habits shelf is exactly the kind of reading inspiration I need for a new semester.' },
      { name: 'Chiamaka O.', area: 'Lagos · Young professional', initials: 'CO', text: 'A clear catalogue and one simple WhatsApp message. It feels like a friendly way to put together the next few books on my reading list.' },
      { name: 'Damilola K.', area: 'Ibadan · Entrepreneur', initials: 'DK', text: 'From business to faith, there is room for more than one side of who I am. I would happily start my next reading stack here.' }
    ];
    let active = 0;
    const review = document.getElementById('testimonial-review'), dots = document.getElementById('testimonial-dots');
    dots.innerHTML = reviews.map((_, index) => `<button class="slider-dot" data-review="${index}" aria-label="Show sample review ${index + 1}" aria-pressed="${index === 0}"></button>`).join('');
    function showReview(index) { active = (index + reviews.length) % reviews.length; const item = reviews[active]; review.innerHTML = `<div class="quote-mark" aria-hidden="true">“</div><blockquote>${U.escape(item.text)}</blockquote><div class="reviewer"><span class="avatar" aria-hidden="true">${item.initials}</span><div><strong>${item.name}</strong><small>${item.area}</small></div></div><p class="fine-print" style="margin:18px 0 0">Sample review — illustrative, not a real customer testimonial.</p>`; dots.querySelectorAll('button').forEach((button, index) => button.setAttribute('aria-pressed', String(index === active))); }
    document.getElementById('testimonial-controls').addEventListener('click', event => { const dot = event.target.closest('[data-review]'), step = event.target.closest('[data-review-step]'); if (dot) showReview(Number(dot.dataset.review)); if (step) showReview(active + Number(step.dataset.reviewStep)); });
    showReview(0);
  }
  function faqs() {
    const root = document.getElementById('faq-list'); if (!root) return;
    root.innerHTML = faq.map(item => `<article class="faq-item" id="faq-${item.id}"><h2><button class="faq-question" aria-expanded="false" aria-controls="answer-${item.id}">${U.escape(item.question)}${U.icon('plus')}</button></h2><div class="faq-answer" id="answer-${item.id}" hidden><p style="margin:0">${U.escape(item.answer)}</p></div></article>`).join('');
    root.addEventListener('click', event => { const button = event.target.closest('.faq-question'); if (!button) return; const expanded = button.getAttribute('aria-expanded') === 'true'; root.querySelectorAll('.faq-question').forEach(question => { question.setAttribute('aria-expanded', 'false'); document.getElementById(question.getAttribute('aria-controls')).hidden = true; }); button.setAttribute('aria-expanded', String(!expanded)); document.getElementById(button.getAttribute('aria-controls')).hidden = expanded; });
    function fromHash() { const item = document.getElementById(window.location.hash.slice(1)); if (item?.classList.contains('faq-item')) { const button = item.querySelector('button'); if (button.getAttribute('aria-expanded') !== 'true') button.click(); requestAnimationFrame(() => item.scrollIntoView({ block: 'start', behavior: 'auto' })); } }
    fromHash(); window.addEventListener('hashchange', fromHash);
  }
  function launchMessage(message, fallback) {
    const href = U.whatsApp(message), link = document.createElement('a'); link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer'; document.body.append(link); link.click(); link.remove();
    if (fallback) { fallback.href = href; fallback.hidden = false; }
    U.toast('Message prepared. Tap Send in WhatsApp to finish.', 'whatsapp');
  }
  function forms() {
    const contact = document.getElementById('contact-form');
    if (contact) contact.addEventListener('submit', event => {
      event.preventDefault(); if (!contact.reportValidity()) return;
      const data = new FormData(contact), clean = key => String(data.get(key) || '').trim();
      const message = `Hello ${C.BUSINESS_NAME} 👋,\nMy name is ${clean('name')}.${clean('email') ? '\nEmail: ' + clean('email') : ''}${clean('area') ? '\nDelivery area: ' + clean('area') : ''}\n\n${clean('message')}\n\nThank you!`;
      launchMessage(message, document.getElementById('contact-fallback'));
    });
  }
  function organisation() {
    U.jsonLD('organisation-jsonld', { '@context': 'https://schema.org', '@type': 'Organization', name: C.BUSINESS_NAME, url: C.SITE_URL, logo: U.canonical('assets/logo.svg'), description: 'A curated book catalogue with WhatsApp ordering for readers in Nigeria.', address: { '@type': 'PostalAddress', addressLocality: 'Ado Ekiti', addressRegion: 'Ekiti State', addressCountry: 'NG' }, areaServed: { '@type': 'Country', name: 'Nigeria' }, contactPoint: { '@type': 'ContactPoint', telephone: '+' + C.WHATSAPP_NUMBER, contactType: 'customer service' }, sameAs: Object.values(C.SOCIAL).filter(url => /^https:\/\//.test(url)) });
    document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(meta => { meta.content = U.canonical('assets/og-image.png'); });
    if (document.body.dataset.page !== 'book' && document.body.dataset.page !== 'category') {
      const path = document.body.dataset.page === 'home' ? 'index.html' : document.body.dataset.page === '404' ? '404.html' : `pages/${document.body.dataset.page}.html`;
      document.querySelector('link[rel="canonical"]').href = U.canonical(path);
      document.querySelector('meta[property="og:url"]').content = U.canonical(path);
    }
  }
  function init() {
    header(); footer(); globalUI(); bindGlobal();
    I.Cart.init(); I.Wishlist.init(); home(); faqs(); forms();
    I.Catalogue.init(); I.Book.init(); badges(); organisation(); I.Motion.init();
    if (!U.storagePersistent) { const notice = document.getElementById('storage-notice'); if (notice) { notice.hidden = false; notice.textContent = 'Browser storage is limited. Your list may only stay available for this session or page.'; } }
    if (C.ENABLE_SERVICE_WORKER && 'serviceWorker' in navigator && /^https?:$/.test(window.location.protocol)) window.addEventListener('load', () => { navigator.serviceWorker.register(U.href('sw.js')).catch(() => { /* Optional enhancement; browsing and ordering do not depend on it. */ }); });
  }
  I.App = { init };
  document.addEventListener('DOMContentLoaded', init);
})();
