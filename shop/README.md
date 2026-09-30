# Pixel & Parsec Shop

Static, no-build storefront that renders from one catalog file. No framework, no backend.

## Files

| File | What it does |
|---|---|
| `products.js` | The catalog. Categories, products, and filter tags. **Edit this to change the store.** |
| `shop.js` | Renderer. Reads `products.js` and fills in the hub, category pages, product page, My Setup, and homepage picks. |
| `index.html` | Shop hub: category tiles, top picks, new arrivals, all products with filters/sort. |
| `desk-setup.html` `lighting.html` `accessories.html` `room-gear.html` | Category pages. Each sets `data-category` on `<body>`. |
| `product.html` | Product page template. Reads `?id=<product id>` from the URL. |
| `my-setup.html` | Saved-items list (browser localStorage), with a running total. |

Shop styles live at the bottom of `/style.css` under the `SHOP` heading.

## Add a product

1. Open `products.js` and copy any object in `PP_PRODUCTS`.
2. Give it a unique `id` (lowercase, hyphens). That becomes the URL: `/shop/product.html?id=your-id`.
3. Set `category` to one of `desk-setup`, `lighting`, `accessories`, `room-gear`.
4. Drop a square product photo into `/assets/shop/` and set `image: 'assets/shop/your-file.webp'`. Leave `image: null` to show the styled placeholder.
5. Fill in `buyUrl` (see below). An empty string shows a **Coming Soon** button.

Save, commit, push to `main`. Vercel redeploys automatically.

## Wire up checkout (`buyUrl`)

The store is intentionally checkout-agnostic so you can test suppliers without rebuilding pages:

- **Stripe Payment Link** — create one per product in the Stripe dashboard and paste the link. Simplest way to take real payments and fulfill manually or through a dropship supplier.
- **Shopify Buy Button / product URL** — if you later open a Shopify store, point each `buyUrl` at the Shopify product page and keep this site as the storefront.
- **Amazon affiliate link** — `https://www.amazon.com/dp/ASIN?tag=pixelparsec-20` and set `affiliate: true`. The button label changes to "Check Price" and the disclosure note appears.

## Badges and filters

- `badge`: `"Best Seller"`, `"Staff Pick"`, `"New"`, or `null`. Best Seller / Staff Pick feed "Top Setup Picks"; New feeds "New Arrivals". Featured sort ranks badged items first.
- `tags`: slugs from `PP_TAGS` (`starter`, `clean-desk`, `rgb-setup`, `small-space`, `under-50`). Add a new tag to `PP_TAGS` and it shows up as a filter chip automatically.

## Newsletter form

The email forms are visual only (`onsubmit="return false;"`). Point them at Mailchimp, ConvertKit, or Buttondown when you are ready to collect emails.
