/* Search, shareable filters and incremental rendering for both catalogue pages. */
(function () {
  'use strict';
  const I = window.ILO, U = I.Utils;
  // Bounds follow your data when you edit prices before launch.
  const bounds = { min: Math.min(...I.books.map(book => book.price)), max: Math.max(...I.books.map(book => book.price)) };
  const defaults = { q: '', c: '', sort: 'featured', min: bounds.min, max: bounds.max, badge: '', featured: false };
  const sorts = ['featured', 'price-asc', 'price-desc', 'title', 'newest'];
  let state, loaded = 12, renderToken = 0, records = [];
  let grid, isCategory, suggestions;
  const byId = id => document.getElementById(id);
  function price(value, fallback) { const number = Number(value); return Number.isFinite(number) && value !== null && value !== '' ? Math.min(bounds.max, Math.max(bounds.min, number)) : fallback; }
  function readURL() {
    const params = new URL(window.location.href).searchParams;
    const badge = params.get('badge')?.toLowerCase();
    state = { q: (params.get('q') || '').slice(0, 200), c: params.get('c') || '', sort: sorts.includes(params.get('sort')) ? params.get('sort') : 'featured', min: price(params.get('min'), bounds.min), max: price(params.get('max'), bounds.max), badge: badge === 'bestseller' ? 'Bestseller' : badge === 'new' ? 'New' : '', featured: params.get('featured') === '1' };
    if (state.min > state.max) [state.min, state.max] = [state.max, state.min];
    if (state.c && !U.category(state.c) && !isCategory) state.c = '';
    return !isCategory || Boolean(U.category(state.c));
  }
  function syncURL() {
    const url = new URL(window.location.href);
    Object.keys(defaults).forEach(key => url.searchParams.delete(key));
    if (state.q.trim()) url.searchParams.set('q', state.q.trim());
    if (state.c) url.searchParams.set('c', state.c);
    if (state.sort !== defaults.sort) url.searchParams.set('sort', state.sort);
    if (state.min !== bounds.min) url.searchParams.set('min', state.min);
    if (state.max !== bounds.max) url.searchParams.set('max', state.max);
    if (state.badge) url.searchParams.set('badge', state.badge.toLowerCase());
    if (state.featured) url.searchParams.set('featured', '1');
    try { window.history.replaceState(null, '', url.href); } catch (_) { /* Some file:// browsers forbid history edits; filters still work. */ }
  }
  function updateControls() {
    byId('catalogue-search').value = state.q;
    byId('catalogue-sort').value = state.sort;
    ['price-min', 'price-max', 'max-price-range'].forEach(id => { byId(id).min = bounds.min; byId(id).max = bounds.max; });
    byId('price-min').value = state.min; byId('price-max').value = state.max;
    byId('max-price-range').value = state.max;
    byId('featured-only').checked = state.featured;
    document.querySelectorAll('[name="badge"]').forEach(input => { input.checked = input.value === state.badge; });
    document.querySelectorAll('[data-category-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.categoryFilter === state.c)));
    byId('clear-search').hidden = !state.q;
    if (isCategory) {
      const category = U.category(state.c);
      byId('catalogue-heading').textContent = category.name;
      byId('catalogue-description').textContent = category.description;
      byId('category-crumb').textContent = category.name;
      byId('category-eyebrow').textContent = category.tagline;
      U.setSEO({ title: category.name + ' Books', description: category.description, path: 'pages/category.html', params: { c: category.slug } });
    }
  }
  function filteredBooks() {
    const list = U.search(state.q).filter(book => (!state.c || book.categorySlug === state.c) && book.price >= state.min && book.price <= state.max && (!state.badge || book.badge === state.badge) && (!state.featured || book.featured));
    return list.sort((a, b) => {
      if (state.sort === 'price-asc') return a.price - b.price || a.id - b.id;
      if (state.sort === 'price-desc') return b.price - a.price || a.id - b.id;
      if (state.sort === 'title') return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
      if (state.sort === 'newest') return Number(b.badge === 'New') - Number(a.badge === 'New') || b.id - a.id;
      return Number(b.featured) - Number(a.featured) || Number(b.badge === 'Bestseller') - Number(a.badge === 'Bestseller') || a.id - b.id;
    });
  }
  function updateResults() {
    const showing = Math.min(loaded, records.length);
    byId('results-count').innerHTML = `<strong>${records.length}</strong> book${records.length === 1 ? '' : 's'}${state.q ? ' found' : ' on this shelf'}`;
    byId('catalogue-load-status').textContent = records.length ? `Showing ${showing} of ${records.length} books` : '';
    byId('load-more').hidden = showing >= records.length; byId('load-more').disabled = false;
    byId('load-more').innerHTML = `Load more books ${U.icon('plus')}`;
    byId('catalogue-announcer').textContent = `${records.length} matching books. ${showing} displayed.`;
    grid.setAttribute('aria-busy', 'false');
    I.Wishlist.updateButtons(); U.emit('rendered', grid);
  }
  function render(sync = true) {
    const token = ++renderToken; loaded = 12;
    updateControls(); if (sync) syncURL(); records = filteredBooks();
    grid.classList.add('book-grid'); grid.innerHTML = U.skeletons(Math.min(12, Math.max(2, records.length)));
    grid.setAttribute('aria-busy', 'true'); byId('load-more').disabled = true;
    setTimeout(() => {
      if (token !== renderToken) return;
      if (records.length) grid.innerHTML = records.slice(0, loaded).map(U.bookCard).join('');
      else { grid.classList.remove('book-grid'); grid.innerHTML = `<div class="empty-state"><div class="empty-icon">${U.icon('search')}</div><h2>No books on this shelf. Yet.</h2><p>Try a different title, a wider price range or fewer filters. A good read is still waiting.</p><button class="btn btn-primary" data-reset-filters>Reset filters${U.icon('arrow')}</button></div>`; }
      updateResults();
    }, U.reducedMotion.matches ? 0 : 160);
  }
  function reset() { const category = isCategory ? state.c : ''; state = { ...defaults, c: category }; suggestions?.hide(); render(); U.toast('Filters reset.'); }
  function loadMore() {
    const token = ++renderToken, previous = loaded;
    loaded += 12; byId('load-more').disabled = true; byId('load-more').textContent = 'Opening the next shelf…'; grid.setAttribute('aria-busy', 'true');
    grid.insertAdjacentHTML('beforeend', U.skeletons(Math.min(12, records.length - previous)));
    setTimeout(() => { if (token !== renderToken) return; grid.querySelectorAll('.skeleton').forEach(element => element.remove()); grid.insertAdjacentHTML('beforeend', records.slice(previous, loaded).map(U.bookCard).join('')); updateResults(); }, U.reducedMotion.matches ? 0 : 180);
  }
  function invalidCategory() {
    byId('catalogue-search-form').hidden = true;
    byId('catalogue-heading').textContent = 'This shelf is still a mystery.';
    byId('catalogue-description').textContent = 'That category does not exist. Explore our ten reading collections instead.';
    byId('catalogue-workspace').innerHTML = U.empty({ title: 'Let’s find the right shelf.', text: 'Browse the full catalogue, or head home to discover all ten categories.' });
    U.setSEO({ title: 'Category Not Found', description: 'Find another reading collection in the iLearnOrb catalogue.', path: 'pages/catalogue.html' });
    const robots = document.createElement('meta'); robots.name = 'robots'; robots.content = 'noindex,follow'; document.head.append(robots);
  }
  I.Catalogue = {
    init() {
      grid = byId('catalogue-grid'); if (!grid) return;
      isCategory = document.body.dataset.page === 'category';
      if (!readURL()) { invalidCategory(); return; }
      byId('category-chips').innerHTML = `${isCategory ? `<a class="category-chip" href="${U.href('pages/catalogue.html')}">All books</a>` : '<button class="category-chip" data-category-filter="" aria-pressed="true">All books</button>'}${I.categories.map(category => `<button class="category-chip" data-category-filter="${category.slug}" aria-pressed="false">${U.escape(category.name)}</button>`).join('')}`;
      // Preserve trailing spaces while someone types a multi-word title/author.
      byId('catalogue-search').addEventListener('input', event => { state.q = event.target.value.slice(0, 200); });
      suggestions = U.attachSuggestions(byId('catalogue-search'), byId('catalogue-suggestions'), { onInput: query => { state.q = query.slice(0, 200); render(); }, onSubmit: query => { state.q = query.trim().slice(0, 200); render(); } });
      byId('catalogue-search-form').addEventListener('submit', event => event.preventDefault());
      document.addEventListener('click', event => {
        const category = event.target.closest('[data-category-filter]'); if (category) { state.c = category.dataset.categoryFilter; suggestions.hide(); render(); }
        if (event.target.closest('[data-reset-filters]')) reset();
        if (event.target.closest('#clear-search')) { state.q = ''; suggestions.hide(); render(); byId('catalogue-search').focus(); }
      });
      byId('catalogue-sort').addEventListener('change', event => { state.sort = event.target.value; render(); });
      byId('catalogue-filters').addEventListener('change', event => {
        if (event.target.name === 'badge') state.badge = event.target.value;
        if (event.target.id === 'featured-only') state.featured = event.target.checked;
        if (event.target.id === 'price-min') { state.min = price(event.target.value, bounds.min); state.max = Math.max(state.max, state.min); }
        if (event.target.id === 'price-max' || event.target.id === 'max-price-range') { state.max = price(event.target.value, bounds.max); state.min = Math.min(state.min, state.max); }
        render();
      });
      byId('max-price-range').addEventListener('input', event => { byId('price-max').value = event.target.value; });
      byId('filter-toggle').addEventListener('click', event => {
        const panel = byId('catalogue-filters'), open = panel.classList.toggle('is-open');
        event.currentTarget.setAttribute('aria-expanded', String(open));
        event.currentTarget.innerHTML = `${U.icon('filter')}${open ? 'Hide filters' : 'Filters'}`;
        if (open) panel.scrollIntoView({ block: 'start', behavior: U.reducedMotion.matches ? 'auto' : 'smooth' });
      });
      byId('load-more').addEventListener('click', loadMore);
      window.addEventListener('popstate', () => { if (readURL()) render(false); else invalidCategory(); });
      render(false);
    }
  };
})();
