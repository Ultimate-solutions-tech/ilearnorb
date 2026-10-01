/* Dynamic book detail, quantity-aware WhatsApp link, sharing and viewed history. */
(function () {
  'use strict';
  const I = window.ILO, U = I.Utils;
  let current, quantity = 1;
  function carousel(id, title, books, description = '') {
    if (!books.length) return '';
    return `<section class="section section-soft"><div class="container"><div class="section-head"><div><span class="eyebrow">Keep exploring</span><h2>${title}</h2>${description ? `<p>${description}</p>` : ''}</div><div class="carousel-controls"><button class="icon-button" data-carousel="${id}" data-direction="-1" aria-label="Previous ${title.toLowerCase()}">${U.icon('left')}</button><button class="icon-button" data-carousel="${id}" data-direction="1" aria-label="Next ${title.toLowerCase()}">${U.icon('right')}</button></div></div><div class="carousel" id="${id}" tabindex="0" aria-label="${title}" data-stagger>${books.map(U.bookCard).join('')}</div></div></section>`;
  }
  function updateQuantity(writeInput = false) {
    const input = document.getElementById('book-quantity');
    quantity = U.quantity(input.value);
    if (writeInput) input.value = quantity;
    document.getElementById('book-order').href = U.whatsApp(U.orderMessage(current, quantity));
    document.getElementById('book-add').dataset.quantity = quantity;
    document.querySelector('[data-book-step="-1"]').disabled = quantity <= 1;
    document.querySelector('[data-book-step="1"]').disabled = quantity >= I.config.MAX_QUANTITY;
  }
  async function share() {
    const url = window.location.href;
    if (navigator.share && window.location.protocol !== 'file:') {
      try { await navigator.share({ title: `${current.title} | ${I.config.BUSINESS_NAME}`, text: `A book for your next chapter: ${current.title} by ${current.author}`, url }); return; }
      catch (error) { if (error.name === 'AbortError') return; }
    }
    if (await U.copy(url)) U.toast(window.location.protocol === 'file:' ? 'Local preview link copied. Deploy the site to share a public link.' : 'Book link copied. Share a little inspiration!', 'share');
    else { document.getElementById('share-url').value = url; U.openDialog('share-dialog'); document.getElementById('share-url').select(); }
  }
  I.Book = {
    init() {
      const root = document.getElementById('book-root'); if (!root) return;
      current = U.book(new URL(window.location.href).searchParams.get('id'));
      if (!current) {
        root.innerHTML = `<div class="container">${U.empty({ heading: 'h1', title: 'This chapter couldn’t be found.', text: 'The book link may be incomplete or out of date. Discover another thoughtful read in our catalogue.' })}</div>`;
        U.setSEO({ title: 'Book Not Found', description: 'Discover another book in the iLearnOrb catalogue.', path: 'pages/catalogue.html' });
        const robots = document.createElement('meta'); robots.name = 'robots'; robots.content = 'noindex,follow'; document.head.append(robots); return;
      }
      const raw = U.read('recently-viewed', []);
      const viewed = Array.isArray(raw) ? [...new Set(raw.map(id => U.book(id)?.id).filter(Boolean))] : [];
      U.write('recently-viewed', [current.id, ...viewed.filter(id => id !== current.id)].slice(0, 10));
      const related = I.books.filter(book => book.categorySlug === current.categorySlug && book.id !== current.id);
      const recent = viewed.filter(id => id !== current.id).slice(0, 6).map(U.book);
      root.innerHTML = `<div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${U.href()}">Home</a>${U.icon('chevron')}<a href="${U.href('pages/catalogue.html')}">Books</a>${U.icon('chevron')}<a href="${U.href('pages/category.html', { c: current.categorySlug })}">${U.escape(current.category)}</a>${U.icon('chevron')}<span aria-current="page">${U.escape(current.title)}</span></nav><article class="book-detail"><div class="book-showcase reveal reveal-scale"><div class="cover-wrap">${U.cover(current, '', true)}</div><span class="cover-caption">${current.image ? 'Cover image supplied by iLearnOrb' : 'Illustrative cover · not the publisher’s artwork'}</span></div><div class="book-info reveal"><div class="book-tags"><a class="pill" href="${U.href('pages/category.html', { c: current.categorySlug })}">${U.escape(current.category)}</a>${current.badge ? `<span class="badge ${current.badge === 'New' ? 'badge-new' : ''}">${current.badge}</span>` : ''}</div><h1>${U.escape(current.title)}</h1><p class="book-author">by <strong>${U.escape(current.author)}</strong></p><div class="book-rating"><span class="stars" aria-hidden="true">${Array.from({ length: 5 }, () => U.icon('star')).join('')}</span><strong>${current.rating.toFixed(1)} / 5</strong><span>${I.config.RATINGS_ARE_SAMPLES ? 'Sample rating · not customer reviews' : 'Catalogue rating'}</span></div><p class="book-description">${U.escape(current.description)}</p><div class="rule"></div><div><span class="book-price">${U.money(current.price)}</span><span class="book-format">${U.icon('book')}Paperback</span></div><p class="fine-print" style="margin:7px 0 0">${I.config.PRICES_ARE_PLACEHOLDERS ? 'Placeholder price. ' : ''}Stock, edition and current price confirmed on WhatsApp.</p><div class="book-quantity-row"><label for="book-quantity">Quantity</label><div class="quantity"><button data-book-step="-1" aria-label="Decrease book quantity" disabled>${U.icon('minus')}</button><input id="book-quantity" type="number" inputmode="numeric" min="1" max="${I.config.MAX_QUANTITY}" value="1"><button data-book-step="1" aria-label="Increase book quantity">${U.icon('plus')}</button></div></div><div class="book-actions"><a id="book-order" class="btn btn-whatsapp" href="${U.whatsApp(U.orderMessage(current))}" target="_blank" rel="noopener noreferrer">${U.icon('whatsapp')}ORDER NOW</a><button id="book-add" class="btn btn-primary" data-cart-add="${current.id}" data-quantity="1">${U.icon('bag')}Add to Order List</button></div><div class="book-secondary-actions"><button data-wishlist="${current.id}" aria-pressed="false">${U.icon('heart')}<span data-wishlist-text>Save to Wishlist</span></button><button id="share-book">${U.icon('share')}Share book</button></div><div class="delivery-note">${U.icon('truck')}<span>${U.escape(I.config.DELIVERY_NOTE)}</span></div></div></article><section class="learning-box reveal" aria-labelledby="learning-heading"><h2 id="learning-heading">A few ideas you’ll take away.</h2><ul class="learning-list">${current.learn.map(item => `<li>${U.icon('check')}<span>${U.escape(item)}</span></li>`).join('')}</ul></section><div style="height:65px" aria-hidden="true"></div></div>${carousel('related-books', 'Stay on the same shelf.', related, 'More thoughtful reads in ' + U.escape(current.category.toLowerCase()) + '.')}${carousel('recent-books', 'A second look?', recent, 'Books you recently explored on this browser.')}`;
      document.getElementById('book-quantity').addEventListener('input', () => updateQuantity());
      document.getElementById('book-quantity').addEventListener('change', () => updateQuantity(true));
      document.querySelectorAll('[data-book-step]').forEach(button => button.addEventListener('click', () => { document.getElementById('book-quantity').value = quantity + Number(button.dataset.bookStep); updateQuantity(true); }));
      document.getElementById('share-book').addEventListener('click', share);
      U.setSEO({ title: current.title + ' by ' + current.author, description: current.description, path: 'pages/book.html', params: { id: current.id } });
      const schema = { '@context': 'https://schema.org', '@type': ['Product', 'Book'], name: current.title, description: current.description, author: { '@type': 'Person', name: current.author }, category: current.category, sku: String(current.id), bookFormat: 'https://schema.org/Paperback', url: U.canonical('pages/book.html', { id: current.id }) };
      if (current.image) schema.image = new URL(current.image, I.config.SITE_URL).href;
      // Do not publish fabricated reviews or placeholder offers to search engines.
      if (!I.config.PRICES_ARE_PLACEHOLDERS) schema.offers = { '@type': 'Offer', price: current.price, priceCurrency: 'NGN', url: schema.url, seller: { '@type': 'Organization', name: I.config.BUSINESS_NAME } };
      U.jsonLD('book-jsonld', schema);
      I.Wishlist.updateButtons(); U.emit('rendered', root);
    }
  };
})();
