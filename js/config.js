/* Edit this one file to update business details everywhere.
   Classic scripts (not ES modules) deliberately support file:// browsing. */
(function () {
  'use strict';
  window.ILO = window.ILO || {};
  window.ILO.config = Object.freeze({
    WHATSAPP_NUMBER: '2349066737888',
    BUSINESS_NAME: 'iLearnOrb',
    TAGLINE: 'Learn. Grow. Become.',
    LOCATION: 'Ado Ekiti, Ekiti State, Nigeria',
    EMAIL: 'hello@ilearnorb.example', // Placeholder: replace before launch.
    SOCIAL: {
      instagram: '', // Add full https:// URLs; empty links remain disabled.
      facebook: '',
      x: ''
    },
    CURRENCY_SYMBOL: '₦',
    DELIVERY_NOTE: 'Delivery in Ado Ekiti and across Nigeria. Availability, delivery fees and timing are confirmed on WhatsApp before payment.',
    SITE_URL: 'https://ilearnorb.example/', // Replace with your live domain, including a trailing slash.
    PRICES_ARE_PLACEHOLDERS: true, // Set false only after checking every price.
    RATINGS_ARE_SAMPLES: true,
    HOURS: 'Mon–Sat, 9am–6pm (WAT)', // Sample hours: confirm before launch.
    HOURS_ARE_PLACEHOLDERS: true,
    STORAGE_PREFIX: 'ilearnorb:',
    MAX_QUANTITY: 99,
    ENABLE_SERVICE_WORKER: true
  });
})();
