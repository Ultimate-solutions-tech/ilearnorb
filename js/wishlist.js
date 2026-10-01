/* Hearts and the saved-books page use the same small, validated store. */
(function () {
  'use strict';
  const I = window.ILO, U = I.Utils;
  function sanitise(raw) { return Array.isArray(raw) ? [...new Set(raw.map(id => U.book(id)?.id).filter(Boolean))] : []; }
  let saved = sanitise(U.read('wishlist', []));
  function updateButtons() {
    document.querySelectorAll('[data-wishlist]').forEach(button => {
      const book = U.book(button.dataset.wishlist); if (!book) return;
      const active = Wishlist.has(book.id);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', `${active ? 'Unsave' : 'Save'} ${book.title}`);
      const text = button.querySelector('[data-wishlist-text]'); if (text) text.textContent = active ? 'Saved to Wishlist' : 'Save to Wishlist';
    });
  }
  function renderPage() {
    const root = document.getElementById('wishlist-root'); if (!root) return;
    const restoreFocus = root.contains(document.activeElement);
    root.innerHTML = saved.length ? `<div class="wishlist-head"><p><strong>${saved.length}</strong> book${saved.length === 1 ? '' : 's'} saved for your next chapter.</p><a class="text-link" href="${U.href('pages/catalogue.html')}">Find another favourite${U.icon('arrow')}</a></div><div class="book-grid" data-stagger>${saved.map(id => U.bookCard(U.book(id))).join('')}</div><p class="fine-print" style="margin-top:22px">${U.escape(U.disclaimer())}</p>` : U.empty({ icon: 'heart', title: 'Keep a little inspiration for later.', text: 'Tap the heart on any book to save it here. Your wishlist is stored on this browser, with no account needed.' });
    U.emit('rendered', root);
    if (restoreFocus) (root.querySelector('[data-wishlist]') || root.querySelector('a'))?.focus();
  }
  const Wishlist = {
    has(id) { return saved.includes(Number(id)); },
    ids() { return [...saved]; },
    count() { return saved.length; },
    toggle(id) {
      const book = U.book(id); if (!book) return;
      const existed = Wishlist.has(book.id);
      saved = existed ? saved.filter(entry => entry !== book.id) : [...saved, book.id];
      U.write('wishlist', saved); U.emit('wishlist');
      U.toast(`${book.title} ${existed ? 'removed from' : 'saved to'} your wishlist.`, 'heart');
    },
    updateButtons,
    init() {
      renderPage(); updateButtons();
      document.addEventListener('ilo:wishlist', () => { renderPage(); updateButtons(); });
      document.addEventListener('ilo:rendered', updateButtons);
      document.addEventListener('click', event => {
        const button = event.target.closest('[data-wishlist]'); if (!button) return;
        Wishlist.toggle(button.dataset.wishlist);
        button.classList.remove('heart-pop'); requestAnimationFrame(() => button.classList.add('heart-pop'));
        setTimeout(() => button.classList.remove('heart-pop'), 320);
      });
      window.addEventListener('storage', event => { if (event.key === I.config.STORAGE_PREFIX + 'wishlist' || event.key === null) { saved = sanitise(U.read('wishlist', [])); U.emit('wishlist'); } });
    }
  };
  I.Wishlist = Wishlist;
})();
