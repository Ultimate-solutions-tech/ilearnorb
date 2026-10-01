/* One order-list model, shared by the drawer and full page. No payment flow. */
(function () {
  'use strict';
  const I = window.ILO, U = I.Utils;
  let state = sanitise(U.read('cart', []));
  const customer = { name: '', area: '' };
  function sanitise(raw) {
    if (!Array.isArray(raw)) return [];
    const merged = new Map();
    raw.forEach(item => { if (!item || !U.book(item.id)) return; const id = U.book(item.id).id; merged.set(id, U.quantity((merged.get(id) || 0) + U.quantity(item.quantity))); });
    return [...merged].map(([id, quantity]) => ({ id, quantity }));
  }
  function publish() { U.write('cart', state); U.emit('cart', Cart.items()); }
  function quantityHTML(item, context) {
    const id = `${context}-qty-${item.id}`;
    return `<div class="quantity"><button data-cart-step="-1" data-id="${item.id}" aria-label="Decrease quantity of ${U.escape(item.book.title)}" ${item.quantity <= 1 ? 'disabled' : ''}>${U.icon('minus')}</button><label for="${id}" class="sr-only">Quantity of ${U.escape(item.book.title)}</label><input id="${id}" type="number" min="1" max="${I.config.MAX_QUANTITY}" inputmode="numeric" value="${item.quantity}" data-cart-quantity="${item.id}"><button data-cart-step="1" data-id="${item.id}" aria-label="Increase quantity of ${U.escape(item.book.title)}" ${item.quantity >= I.config.MAX_QUANTITY ? 'disabled' : ''}>${U.icon('plus')}</button></div>`;
  }
  function lines(context) {
    return Cart.items().map(item => `<article class="cart-line"><a href="${U.href('pages/book.html', { id: item.id })}" tabindex="-1" aria-hidden="true">${U.cover(item.book)}</a><div><h3><a href="${U.href('pages/book.html', { id: item.id })}">${U.escape(item.book.title)}</a></h3><p>${U.escape(item.book.author)} · ${U.money(item.book.price)} each</p><div class="cart-line-actions">${quantityHTML(item, context)}<button class="remove-item" data-cart-remove="${item.id}" aria-label="Remove ${U.escape(item.book.title)} from order list">Remove</button></div></div><strong class="cart-line-price">${U.money(item.subtotal)}</strong></article>`).join('');
  }
  function renderDrawer() {
    const body = document.getElementById('mini-cart-items'), foot = document.getElementById('mini-cart-footer');
    if (!body || !foot) return;
    const active = document.activeElement?.id;
    body.innerHTML = state.length ? lines('drawer') : U.empty({ icon: 'bag', title: 'Your next chapter starts here.', text: 'Add a book to your order list, then send everything in one WhatsApp message.' });
    foot.hidden = !state.length;
    if (state.length) foot.innerHTML = `<div class="drawer-total"><span>${Cart.count()} book${Cart.count() === 1 ? '' : 's'}</span><strong>${U.money(Cart.total())}</strong></div><a class="btn btn-whatsapp btn-block" id="mini-cart-send" href="${U.whatsApp(Cart.message())}" target="_blank" rel="noopener noreferrer">${U.icon('whatsapp')}Send on WhatsApp</a><a class="text-link" style="margin-top:14px" href="${U.href('pages/cart.html')}">Review full order list${U.icon('arrow')}</a><p class="fine-print" style="margin:10px 0 0">Delivery is additional. Current prices and stock will be confirmed.</p>`;
    if (active) document.getElementById(active)?.focus();
  }
  function renderPage() {
    const root = document.getElementById('cart-root'); if (!root) return;
    if (!state.length) { root.innerHTML = U.empty({ icon: 'bag', title: 'A little empty. Full of possibility.', text: 'Found a book you love? Open it and tap “Add to Order List” to start your reading stack.' }); return; }
    if (!document.getElementById('cart-items')) {
      root.innerHTML = `<div class="cart-layout"><div><div class="cart-topline"><h2>Your reading stack <span id="cart-count"></span></h2><button data-cart-clear>Clear order list</button></div><div class="cart-items" id="cart-items"></div><a class="text-link" style="margin-top:25px" href="${U.href('pages/catalogue.html')}">${U.icon('left')}Keep discovering</a></div><aside class="cart-summary" aria-label="Order summary"><h2>A new chapter, together.</h2><div class="summary-row"><span>Book subtotal</span><strong id="cart-subtotal"></strong></div><div class="summary-row"><span>Delivery</span><span>To be confirmed</span></div><div class="summary-row summary-total"><strong>Book total</strong><strong id="cart-total"></strong></div><div class="field"><label for="customer-name">Your name <span class="text-muted">(optional)</span></label><input id="customer-name" name="name" maxlength="60" autocomplete="name" placeholder="What should we call you?" value="${U.escape(customer.name)}"></div><div class="field"><label for="customer-area">Delivery area <span class="text-muted">(optional)</span></label><input id="customer-area" name="area" maxlength="100" autocomplete="address-level2" placeholder="e.g. Adebayo, Ado Ekiti" value="${U.escape(customer.area)}"></div><a id="send-order" class="btn btn-whatsapp btn-block" target="_blank" rel="noopener noreferrer">${U.icon('whatsapp')}Send Order on WhatsApp</a><p class="fine-print">No online payment is collected. We’ll confirm stock, current prices, delivery and a payment method in your chat. Your name and area are not saved here.</p></aside></div>`;
    }
    const active = document.activeElement?.id;
    document.getElementById('cart-items').innerHTML = lines('page');
    document.getElementById('cart-count').textContent = `(${Cart.count()})`;
    document.getElementById('cart-subtotal').textContent = U.money(Cart.total());
    document.getElementById('cart-total').textContent = U.money(Cart.total());
    updateOrderLinks();
    if (active) document.getElementById(active)?.focus();
  }
  function updateOrderLinks() {
    ['send-order', 'mini-cart-send'].forEach(id => { const link = document.getElementById(id); if (link) link.href = U.whatsApp(Cart.message()); });
  }
  const Cart = {
    items() { return state.map(item => ({ ...item, book: U.book(item.id), subtotal: U.book(item.id).price * item.quantity })); },
    count() { return state.reduce((sum, item) => sum + item.quantity, 0); },
    total() { return Cart.items().reduce((sum, item) => sum + item.subtotal, 0); },
    add(id, quantity = 1) {
      const book = U.book(id); if (!book) return;
      const existing = state.find(item => item.id === book.id);
      const wanted = U.quantity(quantity) + (existing?.quantity || 0);
      if (existing) existing.quantity = U.quantity(wanted); else state.push({ id: book.id, quantity: U.quantity(wanted) });
      publish(); U.toast(wanted > I.config.MAX_QUANTITY ? `Quantity limited to ${I.config.MAX_QUANTITY} per title.` : `${book.title} added to your order list.`, 'bag');
      U.openDialog('mini-cart');
    },
    set(id, quantity) {
      const item = state.find(item => String(item.id) === String(id)); if (!item) return;
      const next = U.quantity(quantity); if (item.quantity === next) { renderDrawer(); renderPage(); return; }
      item.quantity = next; publish(); U.toast('Book quantity updated.');
    },
    remove(id) { const item = state.find(item => String(item.id) === String(id)); if (!item) return; state = state.filter(entry => entry !== item); publish(); U.toast(`${U.book(item.id).title} removed from your order list.`); },
    clear() { state = []; publish(); U.toast('Your order list has been cleared.'); },
    message(name = customer.name, area = customer.area) {
      const clean = (value, max) => String(value).replace(/[\r\n]+/g, ' ').trim().slice(0, max);
      const books = Cart.items().map((item, index) => `${index + 1}. 📖 ${item.book.title} by ${item.book.author}\n   Qty: ${item.quantity} × ${U.money(item.book.price)} = ${U.money(item.subtotal)}`).join('\n\n');
      const details = `${clean(name, 60) ? '\nCustomer: ' + clean(name, 60) : ''}${clean(area, 100) ? '\nDelivery area: ' + clean(area, 100) : ''}`;
      return `Hello ${I.config.BUSINESS_NAME} 👋, I'd like to place an order:\n\n${books}\n\n📚 Quantity: ${Cart.count()}\n💰 Book total: ${U.money(Cart.total())}\nDelivery fee: Please confirm.${details}\n\nPlease confirm availability, current prices and delivery to my location. Thank you!`;
    },
    renderDrawer,
    init() {
      renderDrawer(); renderPage();
      document.addEventListener('ilo:cart', () => { renderDrawer(); renderPage(); });
      document.addEventListener('click', event => {
        const add = event.target.closest('[data-cart-add]'); if (add) Cart.add(add.dataset.cartAdd, add.dataset.quantity || 1);
        const step = event.target.closest('[data-cart-step]'); if (step) { const item = state.find(entry => String(entry.id) === step.dataset.id); if (item) Cart.set(item.id, item.quantity + Number(step.dataset.cartStep)); }
        const remove = event.target.closest('[data-cart-remove]'); if (remove) Cart.remove(remove.dataset.cartRemove);
        if (event.target.closest('[data-cart-clear]')) U.openDialog('clear-list-dialog');
        if (event.target.closest('[data-clear-confirm]')) { Cart.clear(); U.closeDialog('clear-list-dialog'); }
      });
      document.addEventListener('change', event => { if (event.target.matches('[data-cart-quantity]')) Cart.set(event.target.dataset.cartQuantity, event.target.value); });
      document.addEventListener('input', event => {
        if (event.target.id === 'customer-name') customer.name = event.target.value;
        if (event.target.id === 'customer-area') customer.area = event.target.value;
        if (['customer-name', 'customer-area'].includes(event.target.id)) updateOrderLinks();
      });
      window.addEventListener('storage', event => { if (event.key === I.config.STORAGE_PREFIX + 'cart' || event.key === null) { state = sanitise(U.read('cart', [])); U.emit('cart'); } });
    }
  };
  I.Cart = Cart;
})();
