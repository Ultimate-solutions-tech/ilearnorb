/* PWA-lite: hosted HTTPS only. file:// browsing never needs this worker.
   Increment VERSION after changing static assets for a deployed release. */
'use strict';
const VERSION = 'ilearnorb-v1.0.1';
const SHELL = [
  './index.html', './404.html', './manifest.json',
  './pages/catalogue.html', './pages/category.html', './pages/book.html',
  './pages/how-to-order.html', './pages/about.html', './pages/contact.html',
  './pages/wishlist.html', './pages/cart.html', './pages/faq.html',
  './css/variables.css', './css/base.css', './css/components.css',
  './css/animations.css', './css/pages.css',
  './js/config.js', './js/books-data.js', './js/utils.js', './js/cart.js',
  './js/wishlist.js', './js/catalogue.js', './js/book.js', './js/animations.js', './js/app.js',
  './assets/logo.svg', './assets/favicon.svg', './assets/icons.svg',
  './assets/og-image.svg', './assets/og-image.png', './assets/icon-192.png', './assets/icon-512.png'
];
async function notFound(cache) {
  const response = await cache.match('./404.html');
  if (!response) return new Response('You are offline. Reconnect to reopen iLearnOrb.', { status: 503 });
  // Keep asset/navigation links valid even for /unknown/nested/paths.
  const base = new URL('./', self.location).href;
  const html = (await response.text()).replace('<head>', `<head><base href="${base}">`);
  return new Response(html, { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
self.addEventListener('install', event => { event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('ilearnorb-') && key !== VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        const response = await fetch(event.request);
        if (response.status === 404) return notFound(cache);
        if (response.ok) { const key = new URL(event.request.url); key.search = ''; event.waitUntil(cache.put(key.href, response.clone())); }
        return response;
      } catch (_) {
        const cached = await cache.match(event.request, { ignoreSearch: true });
        if (cached) return cached;
        if (url.pathname === new URL('./', self.location).pathname) return await cache.match('./index.html');
        return notFound(cache);
      }
    })());
    return;
  }
  // No analytics, external requests or WhatsApp messages are cached.
  if (/\.(?:css|js|svg|png|jpe?g|webp|json)$/.test(url.pathname)) event.respondWith(caches.match(event.request, { ignoreSearch: true }).then(cached => cached || fetch(event.request).then(response => { if (response.ok) { const clone = response.clone(); event.waitUntil(caches.open(VERSION).then(cache => cache.put(event.request, clone))); } return response; })));
});
