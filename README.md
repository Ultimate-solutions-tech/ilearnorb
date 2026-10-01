# iLearnOrb

A complete, framework-free book catalogue and WhatsApp ordering website for Ado Ekiti, Nigeria.

## Open it

1. Extract the project ZIP.
2. Open the `iLearnOrb` folder.
3. Double-click `index.html` in a modern browser.

There is **no build step, package installation or server requirement**. Books and categories are exported by classic scripts as `window.ILO.books` and `window.ILO.categories`; no book JSON is fetched and no ES modules are used. Google Fonts are optional enhancements: the system-font fallback works offline. All book-cover artwork is generated locally from SVG.

The live preview is only a convenience. The downloaded website does not depend on its preview server.

## What is included

- 11 separate HTML pages, with one shared header/footer source in `js/app.js`.
- Exactly 100 explicitly written book records: 10 in each of 10 categories.
- 12 bestseller labels, 8 new labels and 12 featured selections.
- Original two-sentence descriptions and three learning bullets for every book.
- Search suggestions, keyboard navigation, category/price/selection filters, five sorts, URL synchronisation and 12-at-a-time loading.
- Quantity-aware direct WhatsApp ordering and a combined order-list message with optional name and delivery area.
- A mini order-list drawer, full order list, wishlist and recently viewed history.
- Generated typographic covers; optional local/remote `image` overrides.
- Reduced-motion-aware intro, hero, stars, tilt, counters, reveals, marquee, curved dividers, page transitions, magnetic buttons and ripples.
- Sample reviews, ordering guide, contact-to-WhatsApp form and accessible FAQ accordion.
- Unique page metadata, dynamic book/category metadata, Organization/Product structured data, sitemap and robots file.
- A lightweight manifest, PNG app icons and a static-asset service worker for hosted offline browsing.

## Important starter-data labels

**Do not publish these prices as checked retail prices.** Every price is a placeholder in the requested ₦4,500–₦15,000 range. Catalogue ratings and testimonials are samples, not actual customer reviews. Hours are sample hours, social URLs are empty and email/domain values use `.example`. The map is illustrative, not a verified shop location.

The site deliberately makes no promises about stock, an exact delivery fee/time, cash on delivery or a returns policy. Confirm those business details before launch. The owner confirms availability, current price, edition, delivery and payment on WhatsApp. There is no payment processing and opening a WhatsApp link does not send a message automatically.

Sample prices and ratings are not emitted as genuine offers/reviews in JSON-LD. Set `PRICES_ARE_PLACEHOLDERS` to `false` only after checking all prices; actual-price Offer data will then be generated. Do not turn off `RATINGS_ARE_SAMPLES` without replacing the values with properly sourced ratings. No aggregate customer-review rating is fabricated.

## Launch checklist

1. **Change the WhatsApp number:** edit `WHATSAPP_NUMBER` in `js/config.js`. Use international digits only, such as `2349066737888`, without `+`, spaces or a leading local `0`. All JavaScript-driven order/contact links use this value. If you change numbers, also update the static HTML `noscript` fallback links with a global find-and-replace.
2. **Check prices:** edit the numeric `price` values in `js/books-data.js` (write `8500`, not `"₦8,500"`). Then set `PRICES_ARE_PLACEHOLDERS: false`. Price-filter bounds automatically follow your data. Review the clearly labelled example-price copy in the ordering guide as well.
3. **Add a book:** duplicate a complete object in `js/books-data.js`; give it a new numeric `id`, unique `slug`, title, author, matching `category`/`categorySlug`, numeric price/rating, two or three original description sentences, three `learn` bullets, badge or `null`, featured boolean and one of the existing blue gradients. Add its `pages/book.html?id=NEW_ID` URL to `sitemap.xml`. Update any fixed marketing counts/titles and the social graphic if your catalogue size changes. Keep existing IDs stable so saved lists continue to work.
4. **Use real covers:** add an authorised image to `assets/covers/`, then add `image: 'assets/covers/your-book.webp'` to that book object. Paths are relative to the project root, even from `/pages/`. Prefer appropriately sized local WebP/JPEG images. Only use artwork you have permission to publish; do not hotlink copyrighted covers. Otherwise the generated cover is used automatically.
5. **Confirm business details:** replace email/social placeholders, confirm hours and delivery/collection/returns terms, and replace sample reviews only with genuine, permitted testimonials. Edit the shared FAQ text in `js/app.js` to reflect your confirmed policies.
6. **Set the live domain:** set `SITE_URL` in `js/config.js` with a trailing `/`. Globally replace `https://ilearnorb.example/` in the HTML metadata, `sitemap.xml` and `robots.txt` with your actual deployment base URL. This static replacement matters for bots that do not execute JavaScript.
7. **Deploy free:** upload the *contents* of the `iLearnOrb` folder as the website root using one of the options below. No build command is required.
8. **Refresh offline assets:** increment `VERSION` in `sw.js` after each deployed asset/data change, then revisit online and refresh. Add any new local cover files to `SHELL` if they should be available before being viewed online.
9. **Final device check:** test real Android/iPhone devices, the owner's WhatsApp account, keyboard/screen-reader navigation, quantity changes, long titles and real delivery conversations. Device tilt is optional and depends on browser permissions.

### Free deployment

- **Netlify:** drag the website folder into Netlify's manual deploy interface. The folder containing `index.html` must be the publish root. Netlify supports the custom `404.html`.
- **GitHub Pages:** put the website files in the repository root; use Settings → Pages → Deploy from a branch → `main` → `/ (root)`. For a project URL, set `SITE_URL` to `https://USERNAME.github.io/REPOSITORY/` and change the `application-base` meta in `404.html` to `/REPOSITORY/`. Internal links and the manifest already support subdirectories.
- **Vercel:** import the repository, select **Other**, leave the build command empty and publish the directory containing `index.html` (`.` when files are in the repository root). Configure the host's custom-404 handling if needed; no SPA rewrite is required.

All three provide HTTPS, which the optional service worker requires (localhost is also supported for testing).

## Architecture and editing

CSS order is `variables`, `base`, `components`, `animations`, `pages`. Scripts are deferred in this order: `config`, `books-data`, `utils`, `cart`, `wishlist`, `catalogue`, `book`, `animations`, `app`. `app.js` coordinates the modules after DOMContentLoaded.

`utils.js` owns URLs, currency formatting, escaping, storage fallbacks, SVG covers, cards, search suggestions, dialogs, toasts and metadata. Cart and wishlist actions use delegated handlers and shared stores. The same order-list line renderer serves the drawer and full page. Neither customer names nor delivery-area form values are persisted.

Examples of shareable catalogue URLs:

- `pages/catalogue.html?q=Morgan%20Housel`
- `pages/catalogue.html?c=habits&sort=price-asc&max=9000`
- `pages/catalogue.html?badge=new&sort=newest`
- `pages/category.html?c=faith`
- `pages/book.html?id=1` (a valid book slug is also accepted)

“Newest” prioritises new-labelled catalogue additions, then higher catalogue IDs. It is not a claim about a book's original publication date.

## Offline, privacy and browser limitations

- On `file://`, the core site works without a server. PWA installation/service workers are intentionally skipped. Browser storage policies for local files vary; Chromium cross-page persistence was tested. Denied storage falls back to session storage or in-page memory, with no fatal error; it may not survive navigation.
- On HTTPS, one online visit precaches all 33 app-shell files, including all book data. Offline book/category routes and a branded fallback page work. WhatsApp still requires connectivity to send a message.
- No analytics, tracking cookies, login or payment SDK is included. Wishlist/order-list/recent-history data stays in the browser. Google Fonts, Google Maps links and WhatsApp have their own privacy practices.
- File links copied for sharing are local to the device. Deploy the site before sharing public book links.
- Book/category titles, descriptions and JSON-LD update dynamically. JavaScript-capable crawlers can read them; social bots that do not run JavaScript will see the generic branded preview. Unique server-rendered social cards per book would require generated individual pages or a backend, neither of which is required here.
- A filesystem cannot route an arbitrary missing file to `404.html`; hosted 404 routing is handled by the host, and the service worker adds an offline fallback after installation.

## Verification

**143 automated browser checks passed with no JavaScript runtime errors.** The delivered project was tested in Chromium using actual `file://` and HTTP navigation, not just reviewed mentally. The checks cover data/schema counts, all 100 SVG cover bounds, search/filter/sort/pagination, multi-word typing, quantity and total calculations, encoded WhatsApp URLs, contact-message preparation, cart/wishlist persistence, malformed/blocked storage, local links, 320/390/768/1920px overflow, keyboard suggestions, native modal escape behaviour, reduced motion, once-per-session intro, offscreen canvas suspension and real offline service-worker routes.

Automated axe-core WCAG A/AA scans covered the major pages and open drawers. Automated checks are not a complete accessibility certification: finish with manual assistive-technology and real-device testing. Test tools, Python, npm and Playwright are **not shipped or needed to use this website**. No real WhatsApp orders were sent during testing.
