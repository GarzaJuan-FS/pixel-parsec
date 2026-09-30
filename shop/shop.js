/* ==========================================================================
   Pixel & Parsec — Shop renderer
   Renders the hub, category pages, product page, "My Setup" list, and the
   homepage picks from window.PP_PRODUCTS / PP_CATEGORIES (shop/products.js).

   Each page declares what it is with data attributes on <body>:
     data-root="../"            path from this page back to the site root
     data-shop-page="hub|category|product|saved|home"
     data-category="lighting"   (category pages only)
   ========================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var ROOT = body.getAttribute('data-root') || './';
  var PAGE = body.getAttribute('data-shop-page') || '';
  var PRODUCTS = window.PP_PRODUCTS || [];
  var CATEGORIES = window.PP_CATEGORIES || [];
  var TAGS = window.PP_TAGS || [];
  var SAVED_KEY = 'pp-saved-setup';

  /* ---------- helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(n) { return '$' + Number(n).toFixed(2); }
  function catBySlug(slug) { for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].slug === slug) return CATEGORIES[i]; return null; }
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }
  function productUrl(p) { return ROOT + 'shop/product.html?id=' + encodeURIComponent(p.id); }
  function categoryUrl(c) { return ROOT + 'shop/' + c.slug + '.html'; }
  function imgSrc(path) { return ROOT + path; }

  /* ---------- saved list (localStorage) ---------- */
  function getSaved() {
    try { return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]'); } catch (e) { return []; }
  }
  function setSaved(list) {
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch (e) { /* private mode */ }
    updateSavedBadges();
  }
  function isSaved(id) { return getSaved().indexOf(id) !== -1; }
  function toggleSaved(id) {
    var list = getSaved();
    var i = list.indexOf(id);
    if (i === -1) list.push(id); else list.splice(i, 1);
    setSaved(list);
    return i === -1;
  }
  function updateSavedBadges() {
    var n = getSaved().length;
    $all('[data-saved-count]').forEach(function (el) {
      el.textContent = n;
      el.parentElement.classList.toggle('has-items', n > 0);
    });
    $all('[data-save]').forEach(function (btn) {
      var on = isSaved(btn.getAttribute('data-save'));
      btn.classList.toggle('is-saved', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      var label = btn.querySelector('[data-save-label]');
      if (label) label.textContent = on ? 'Saved to My Setup' : 'Add to My Setup';
    });
  }

  /* ---------- templates ---------- */
  var ICONS = {
    'desk-setup': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="10" rx="1.5"/><path d="M3 19h18M8 15v4M16 15v4"/></svg>',
    'lighting': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.8.7-1 1.3-1 2.5H9c0-1.2-.2-1.8-1-2.5A6 6 0 0 1 12 3z"/></svg>',
    'accessories': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 9h12a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1l-2-2h-6l-2 2H6a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3z"/><path d="M8 12v3M6.5 13.5h3M15.5 12.5h.01M17.5 14.5h.01"/></svg>',
    'room-gear': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18M5 21V4h14v17M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-5h4v5"/></svg>'
  };
  var HEART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20.5s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 7.5 2.9c0 5.4-7.5 10-7.5 10z"/></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function mediaHtml(p, cls) {
    var cat = catBySlug(p.category) || {};
    if (p.image) {
      return '<img src="' + esc(imgSrc(p.image)) + '" alt="' + esc(p.name) + '" loading="lazy">';
    }
    return '<div class="' + (cls || 'p-placeholder') + ' p-placeholder--' + esc(cat.accent || 'amber') + '" aria-hidden="true">' +
      (ICONS[p.category] || '') + '<span>' + esc(cat.name || 'Setup') + '</span></div>';
  }

  function priceHtml(p) {
    var html = '<span class="p-price">' + money(p.price) + '</span>';
    if (p.compareAt && p.compareAt > p.price) {
      html += '<s class="p-price-compare">' + money(p.compareAt) + '</s>';
      html += '<span class="p-price-save">Save ' + money(p.compareAt - p.price) + '</span>';
    }
    return html;
  }

  function cardHtml(p) {
    var cat = catBySlug(p.category) || {};
    return '' +
      '<article class="p-card">' +
        '<a class="p-card__media" href="' + esc(productUrl(p)) + '" aria-label="' + esc(p.name) + '">' +
          mediaHtml(p) +
          (p.badge ? '<span class="p-badge p-badge--' + esc(p.badge.toLowerCase().replace(/\s+/g, '-')) + '">' + esc(p.badge) + '</span>' : '') +
        '</a>' +
        '<button class="p-card__save" type="button" data-save="' + esc(p.id) + '" aria-pressed="false" aria-label="Save ' + esc(p.name) + ' to My Setup">' + HEART + '</button>' +
        '<div class="p-card__body">' +
          '<span class="p-card__cat">' + esc(cat.name || '') + '</span>' +
          '<h3 class="p-card__title"><a href="' + esc(productUrl(p)) + '">' + esc(p.name) + '</a></h3>' +
          '<p class="p-card__blurb">' + esc(p.blurb) + '</p>' +
          '<div class="p-card__foot">' +
            '<div class="p-card__price">' + priceHtml(p) + '</div>' +
            '<a class="p-card__link" href="' + esc(productUrl(p)) + '">View ' + ARROW + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function renderGrid(el, list, emptyMsg) {
    if (!el) return;
    if (!list.length) {
      el.innerHTML = '<p class="p-empty">' + esc(emptyMsg || 'Nothing here yet. Check back soon.') + '</p>';
      return;
    }
    el.innerHTML = list.map(cardHtml).join('');
    updateSavedBadges();
  }

  function categoryTileHtml(c) {
    var count = PRODUCTS.filter(function (p) { return p.category === c.slug; }).length;
    return '' +
      '<a class="cat-tile cat-tile--' + esc(c.accent) + '" href="' + esc(categoryUrl(c)) + '">' +
        '<img class="cat-tile__bg" src="' + esc(imgSrc(c.image)) + '" alt="" loading="lazy">' +
        '<div class="cat-tile__scrim"></div>' +
        '<div class="cat-tile__body">' +
          '<span class="cat-tile__icon">' + (ICONS[c.slug] || '') + '</span>' +
          '<h3 class="cat-tile__title">' + esc(c.name) + '</h3>' +
          '<p class="cat-tile__desc">' + esc(c.short) + '</p>' +
          '<span class="cat-tile__meta">' + count + ' product' + (count === 1 ? '' : 's') + ' ' + ARROW + '</span>' +
        '</div>' +
      '</a>';
  }

  /* ---------- sorting / filtering ---------- */
  function sortList(list, mode) {
    var out = list.slice();
    if (mode === 'price-asc') out.sort(function (a, b) { return a.price - b.price; });
    else if (mode === 'price-desc') out.sort(function (a, b) { return b.price - a.price; });
    else if (mode === 'name') out.sort(function (a, b) { return a.name.localeCompare(b.name); });
    else {
      // "featured": badged items first, keep catalog order otherwise
      var rank = { 'Best Seller': 0, 'Staff Pick': 1, 'New': 2 };
      out.sort(function (a, b) {
        var ra = a.badge in rank ? rank[a.badge] : 9;
        var rb = b.badge in rank ? rank[b.badge] : 9;
        return ra - rb;
      });
    }
    return out;
  }

  function bindToolbar(toolbar, base, gridEl) {
    if (!toolbar) return;
    var state = { tag: '', sort: 'featured' };
    var chips = $('[data-chips]', toolbar);
    var sortSel = $('[data-sort]', toolbar);
    var countEl = $('[data-count]', toolbar);

    if (chips) {
      chips.innerHTML = '<button type="button" class="chip is-active" data-tag="">All</button>' +
        TAGS.map(function (t) {
          var n = base.filter(function (p) { return p.tags.indexOf(t.slug) !== -1; }).length;
          if (!n) return '';
          return '<button type="button" class="chip" data-tag="' + esc(t.slug) + '">' + esc(t.name) + '</button>';
        }).join('');
      chips.addEventListener('click', function (e) {
        var b = e.target.closest('[data-tag]');
        if (!b) return;
        state.tag = b.getAttribute('data-tag');
        $all('.chip', chips).forEach(function (c) { c.classList.toggle('is-active', c === b); });
        apply();
      });
    }
    if (sortSel) sortSel.addEventListener('change', function () { state.sort = sortSel.value; apply(); });

    function apply() {
      var list = base.filter(function (p) { return !state.tag || p.tags.indexOf(state.tag) !== -1; });
      list = sortList(list, state.sort);
      if (countEl) countEl.textContent = list.length + ' product' + (list.length === 1 ? '' : 's');
      renderGrid(gridEl, list, 'No products match that filter yet.');
    }
    apply();
  }

  /* ---------- pages ---------- */
  function renderHub() {
    var tiles = $('[data-category-tiles]');
    if (tiles) tiles.innerHTML = CATEGORIES.map(categoryTileHtml).join('');

    renderGrid($('[data-grid="top-picks"]'), PRODUCTS.filter(function (p) { return p.badge === 'Best Seller' || p.badge === 'Staff Pick'; }).slice(0, 4));
    renderGrid($('[data-grid="new"]'), PRODUCTS.filter(function (p) { return p.badge === 'New'; }).slice(0, 4));
    bindToolbar($('[data-toolbar]'), PRODUCTS, $('[data-grid="all"]'));
  }

  function renderCategory() {
    var slug = body.getAttribute('data-category');
    var cat = catBySlug(slug);
    var base = PRODUCTS.filter(function (p) { return p.category === slug; });
    if (cat) {
      var intro = $('[data-cat-intro]'); if (intro) intro.textContent = cat.intro;
    }
    bindToolbar($('[data-toolbar]'), base, $('[data-grid="category"]'));

    // other categories strip
    var others = $('[data-other-categories]');
    if (others) others.innerHTML = CATEGORIES.filter(function (c) { return c.slug !== slug; }).map(categoryTileHtml).join('');
  }

  function renderProduct() {
    var id = new URLSearchParams(location.search).get('id');
    var p = byId(id);
    var wrap = $('[data-product]');
    var missing = $('[data-product-missing]');
    if (!p) {
      if (wrap) wrap.hidden = true;
      if (missing) missing.hidden = false;
      renderGrid($('[data-grid="related"]'), sortList(PRODUCTS, 'featured').slice(0, 3));
      return;
    }
    var cat = catBySlug(p.category) || {};
    document.title = p.name + ' — Pixel & Parsec Shop';

    var crumbCat = $('[data-crumb-cat]');
    if (crumbCat) { crumbCat.textContent = cat.name || 'Shop'; crumbCat.href = cat.slug ? categoryUrl(cat) : ROOT + 'shop/index.html'; }
    var crumbName = $('[data-crumb-name]'); if (crumbName) crumbName.textContent = p.name;

    var media = $('[data-product-media]');
    if (media) media.innerHTML = mediaHtml(p, 'p-placeholder p-placeholder--lg') +
      (p.badge ? '<span class="p-badge p-badge--' + esc(p.badge.toLowerCase().replace(/\s+/g, '-')) + '">' + esc(p.badge) + '</span>' : '');

    var setText = function (sel, txt) { var el = $(sel); if (el) el.textContent = txt; };
    setText('[data-product-cat]', cat.name || '');
    setText('[data-product-name]', p.name);
    setText('[data-product-blurb]', p.blurb);
    setText('[data-product-desc]', p.description);
    var price = $('[data-product-price]'); if (price) price.innerHTML = priceHtml(p);

    var feats = $('[data-product-features]');
    if (feats) feats.innerHTML = (p.features || []).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');

    var buy = $('[data-product-buy]');
    if (buy) {
      if (p.buyUrl) {
        buy.innerHTML = '<a class="btn btn--primary btn--lg" href="' + esc(p.buyUrl) + '" target="_blank" rel="noopener' + (p.affiliate ? ' nofollow sponsored' : '') + '">' +
          (p.affiliate ? 'Check Price' : 'Buy Now') + ' ' + ARROW + '</a>' +
          (p.affiliate ? '<p class="affiliate-note">We may earn a commission on this link at no extra cost to you.</p>' : '<p class="p-ship">Free US shipping on orders over $50 · 30-day returns</p>');
      } else {
        buy.innerHTML = '<button class="btn btn--ghost btn--lg" type="button" disabled>Coming Soon</button>' +
          '<p class="p-ship">This item is not in stock yet. Save it to My Setup and join the list below to hear when it drops.</p>';
      }
    }
    var save = $('[data-product-save]');
    if (save) {
      save.innerHTML = '<button class="btn btn--ghost btn--lg p-save-btn" type="button" data-save="' + esc(p.id) + '" aria-pressed="false">' + HEART + ' <span data-save-label>Add to My Setup</span></button>';
    }

    var related = PRODUCTS.filter(function (x) { return x.category === p.category && x.id !== p.id; });
    if (related.length < 3) related = related.concat(PRODUCTS.filter(function (x) { return x.category !== p.category; })).slice(0, 3);
    renderGrid($('[data-grid="related"]'), related.slice(0, 3));
    updateSavedBadges();
  }

  function renderSaved() {
    var grid = $('[data-grid="saved"]');
    var totalEl = $('[data-saved-total]');
    var empty = $('[data-saved-empty]');
    var actions = $('[data-saved-actions]');
    function draw() {
      var list = getSaved().map(byId).filter(Boolean);
      var total = list.reduce(function (s, p) { return s + p.price; }, 0);
      if (totalEl) totalEl.textContent = money(total);
      if (empty) empty.hidden = list.length > 0;
      if (actions) actions.hidden = list.length === 0;
      if (grid) {
        grid.hidden = list.length === 0;
        renderGrid(grid, list);
      }
    }
    var clear = $('[data-saved-clear]');
    if (clear) clear.addEventListener('click', function () { setSaved([]); draw(); });
    document.addEventListener('pp:saved-changed', draw);
    draw();
  }

  function renderHome() {
    renderGrid($('[data-grid="home-picks"]'), sortList(PRODUCTS, 'featured').slice(0, 4));
    var tiles = $('[data-category-tiles]');
    if (tiles) tiles.innerHTML = CATEGORIES.map(categoryTileHtml).join('');
  }

  /* ---------- global: save button delegation ---------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-save]');
    if (!btn) return;
    e.preventDefault();
    toggleSaved(btn.getAttribute('data-save'));
    document.dispatchEvent(new CustomEvent('pp:saved-changed'));
  });

  /* ---------- boot ---------- */
  if (PAGE === 'hub') renderHub();
  else if (PAGE === 'category') renderCategory();
  else if (PAGE === 'product') renderProduct();
  else if (PAGE === 'saved') renderSaved();
  else if (PAGE === 'home') renderHome();
  updateSavedBadges();
})();
