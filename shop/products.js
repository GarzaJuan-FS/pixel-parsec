/* ==========================================================================
   Pixel & Parsec — Shop catalog
   --------------------------------------------------------------------------
   This is the single source of truth for the store. Every shop page renders
   from this array, so adding/removing a product here updates the hub, the
   category pages, the product template, and the homepage picks.

   FIELDS
   id          unique slug, used in product.html?id=...
   name        product title
   category    one of: desk-setup | lighting | accessories | room-gear
   price       number (USD). Set your own retail price here.
   compareAt   optional "was" price for showing a discount (null to hide)
   badge       optional short label: "Best Seller", "New", "Staff Pick", null
   blurb       one-liner shown on cards
   description paragraph shown on the product page
   features    3–5 short bullets for the product page
   image       path relative to the site root (e.g. 'assets/shop/mat.webp') — leave null to show a styled placeholder
   buyUrl      where the Buy button goes. Empty string = "Coming Soon" state.
               Use a Stripe Payment Link, Shopify Buy Button URL, supplier
               checkout link, or an Amazon affiliate link (?tag=pixelparsec-20).
   affiliate   true if buyUrl is an affiliate link (adds rel="sponsored" + note)
   tags        used for the "Shop by need" filters on the hub
   ========================================================================== */

window.PP_CATEGORIES = [
  {
    slug: 'desk-setup',
    name: 'Desk Setup',
    short: 'Mats, risers, stands, and cable control.',
    intro: 'Build a cleaner, more functional battlestation with desk gear designed to improve comfort, organization, and style.',
    accent: 'amber',
    image: 'assets/prod-gaming-keyboard.webp'
  },
  {
    slug: 'lighting',
    name: 'Lighting',
    short: 'Light bars, strips, and monitor backlights.',
    intro: 'Change the mood of your setup with lighting that adds focus, atmosphere, and visual depth.',
    accent: 'cyan',
    image: 'assets/cat-gaming.webp'
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    short: 'Hubs, wrist rests, docks, and small add-ons.',
    intro: 'Small upgrades can make a big difference. Shop practical accessories that improve the way your setup looks and works.',
    accent: 'amber',
    image: 'assets/prod-gaming-controller.webp'
  },
  {
    slug: 'room-gear',
    name: 'Room Gear',
    short: 'Shelves, storage, and finishing touches.',
    intro: 'Complete the space around your desk with room accessories, storage, and décor that bring the whole setup together.',
    accent: 'cyan',
    image: 'assets/cat-starwars.webp'
  }
];

window.PP_PRODUCTS = [
  /* ---------------- DESK SETUP ---------------- */
  {
    id: 'xxl-desk-mat-nebula',
    name: 'Nebula XXL Desk Mat',
    category: 'desk-setup',
    price: 29.99,
    compareAt: 39.99,
    badge: 'Best Seller',
    blurb: 'Full-desk coverage with a stitched edge and a deep-space print.',
    description: 'A 900×400mm mat that covers keyboard, mouse, and everything in between. Micro-textured cloth for consistent glide, non-slip rubber base, and anti-fray stitched edges so it still looks new a year in.',
    features: ['900 × 400 × 4mm', 'Stitched anti-fray edges', 'Non-slip natural rubber base', 'Machine washable'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk', 'under-50', 'starter']
  },
  {
    id: 'rgb-desk-mat',
    name: 'Edge-Lit RGB Desk Mat',
    category: 'desk-setup',
    price: 39.99,
    compareAt: null,
    badge: null,
    blurb: '14 lighting modes around the perimeter, one-touch control.',
    description: 'Same XXL footprint with an RGB strip around the edge. Ten static colors, four dynamic modes, and a memory function so it comes back to your last setting on power-up.',
    features: ['800 × 300mm', '14 lighting modes with memory', 'USB powered, pass-through port', 'Water-resistant surface'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['rgb-setup', 'under-50']
  },
  {
    id: 'monitor-riser-drawer',
    name: 'Monitor Riser with Drawer',
    category: 'desk-setup',
    price: 44.99,
    compareAt: null,
    badge: 'Staff Pick',
    blurb: 'Lifts your screen to eye level and hides the clutter underneath.',
    description: 'A solid wood-and-steel riser that puts your monitor at a healthier height while creating storage for the stuff that usually lives on top of your desk. The pull-out drawer fits notebooks, controllers, and cables.',
    features: ['Holds up to 44 lb', 'Pull-out storage drawer', 'Fits 27"–34" monitors', 'Assembly under 5 minutes'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk', 'small-space', 'starter']
  },
  {
    id: 'aluminum-laptop-stand',
    name: 'Adjustable Aluminum Laptop Stand',
    category: 'desk-setup',
    price: 34.99,
    compareAt: 44.99,
    badge: null,
    blurb: 'Six height positions, folds flat, keeps your laptop cool.',
    description: 'A ventilated aluminum stand for 10"–17" laptops. Adjustable angle for a proper eye line, silicone pads to protect the chassis, and a fold-flat design that fits in a backpack.',
    features: ['Fits 10"–17" laptops', '6 adjustable heights', 'Ventilated for cooling', 'Folds flat for travel'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk', 'small-space', 'under-50']
  },
  {
    id: 'headset-stand-rgb',
    name: 'RGB Headset Stand with USB Hub',
    category: 'desk-setup',
    price: 27.99,
    compareAt: null,
    badge: null,
    blurb: 'A home for your headset with 3 USB ports and a 3.5mm jack built in.',
    description: 'Stop laying your headset on the desk. This stand holds any full-size headset, adds a 3-port USB hub and audio pass-through at the base, and glows with a soft RGB ring you can turn off.',
    features: ['3× USB 3.0 ports', '3.5mm audio + mic jack', 'RGB ring, off switch', 'Weighted non-slip base'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['rgb-setup', 'clean-desk', 'under-50', 'starter']
  },
  {
    id: 'cable-management-kit',
    name: 'Complete Cable Management Kit',
    category: 'desk-setup',
    price: 24.99,
    compareAt: 32.99,
    badge: 'Best Seller',
    blurb: 'Under-desk tray, sleeves, clips, and ties. Everything to kill the cable spaghetti.',
    description: 'One box, zero visible cables. Includes a 16" steel under-desk tray, two neoprene cable sleeves, 20 adhesive clips, and 50 reusable velcro ties. Works with drilled or clamp-on mounting.',
    features: ['Steel under-desk tray', '2× neoprene sleeves', '20 adhesive clips + 50 ties', 'No-drill clamp option'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk', 'under-50', 'starter']
  },

  /* ---------------- LIGHTING ---------------- */
  {
    id: 'monitor-light-bar',
    name: 'Monitor Light Bar',
    category: 'lighting',
    price: 39.99,
    compareAt: 49.99,
    badge: 'Best Seller',
    blurb: 'Asymmetric light for your desk with zero screen glare.',
    description: 'Clips to the top of any monitor and lights your desk, not your screen. Adjustable color temperature from warm to cool, touch dimming, and an auto-dimming mode that reacts to the room.',
    features: ['2700K–6500K color temp', 'Zero screen glare', 'Touch controls with memory', 'Fits 0.4"–1.4" monitors'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk', 'under-50', 'starter']
  },
  {
    id: 'rgb-light-bars-pair',
    name: 'Smart RGB Light Bars (Pair)',
    category: 'lighting',
    price: 49.99,
    compareAt: null,
    badge: 'New',
    blurb: 'Two app-controlled bars for wall wash behind your monitors.',
    description: 'A pair of freestanding light bars that sit behind or beside your monitors and paint the wall. App and voice control, 16 million colors, music-sync mode, and scene presets built for gaming and streaming.',
    features: ['App + voice control', 'Music sync mode', '16M colors, scene presets', 'Wall-mount or freestanding'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['rgb-setup']
  },
  {
    id: 'led-strip-5m',
    name: 'RGB LED Strip Kit (16 ft)',
    category: 'lighting',
    price: 19.99,
    compareAt: 24.99,
    badge: null,
    blurb: 'The easiest way to add ambient glow behind a desk or bed.',
    description: 'A 16-foot strip with strong 3M adhesive, a remote and app control, and cut marks every 4 inches. Perfect for the back of a desk, under a shelf, or around a door frame.',
    features: ['16 ft / 5m length', 'Remote + app control', 'Cuttable every 4"', 'Music reactive'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['rgb-setup', 'under-50', 'starter']
  },
  {
    id: 'monitor-backlight-strip',
    name: 'Monitor Bias Backlight',
    category: 'lighting',
    price: 22.99,
    compareAt: null,
    badge: null,
    blurb: 'Sits behind your screen to reduce eye strain and add depth.',
    description: 'A USB-powered strip that mounts to the back of your monitor. Bias lighting reduces perceived eye strain in dark rooms and makes blacks look deeper. Powered from the monitor USB port so it turns on and off with the screen.',
    features: ['Fits 24"–32" monitors', 'USB powered from monitor', 'Warm white + RGB modes', 'Inline dimmer'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['rgb-setup', 'small-space', 'under-50']
  },
  {
    id: 'minimal-desk-lamp',
    name: 'Minimal Architect Desk Lamp',
    category: 'lighting',
    price: 44.99,
    compareAt: null,
    badge: 'Staff Pick',
    blurb: 'Swing-arm task light with a matte black finish.',
    description: 'A long-reach architect lamp that clamps to the edge of your desk and stays out of the way. Stepless dimming, five color temperatures, and a 60-minute auto-off timer for late-night sessions.',
    features: ['Clamp mount saves desk space', 'Stepless dimming', '5 color temperatures', 'Auto-off timer'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk', 'small-space', 'under-50']
  },

  /* ---------------- ACCESSORIES ---------------- */
  {
    id: 'usb-c-hub-7in1',
    name: '7-in-1 USB-C Hub',
    category: 'accessories',
    price: 32.99,
    compareAt: null,
    badge: null,
    blurb: 'HDMI 4K, three USB-A, SD, and 100W pass-through charging.',
    description: 'One cable into your laptop, everything else into the hub. 4K@60Hz HDMI, three USB 3.0 ports, SD and microSD readers, and 100W USB-C pass-through so your laptop keeps charging.',
    features: ['4K@60Hz HDMI', '3× USB 3.0', 'SD + microSD', '100W pass-through charging'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk', 'under-50']
  },
  {
    id: 'memory-foam-wrist-rest-set',
    name: 'Keyboard + Mouse Wrist Rest Set',
    category: 'accessories',
    price: 21.99,
    compareAt: 27.99,
    badge: 'Best Seller',
    blurb: 'Slow-rebound memory foam for long sessions.',
    description: 'A matched pair of wrist rests: one for a full-size or TKL keyboard, one for the mouse. Cooling lycra top, slow-rebound memory foam, and a non-slip rubber base that stays put on any mat.',
    features: ['Fits TKL and full-size', 'Slow-rebound memory foam', 'Cooling lycra fabric', 'Non-slip base'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['under-50', 'starter']
  },
  {
    id: 'controller-charging-dock',
    name: 'Dual Controller Charging Dock',
    category: 'accessories',
    price: 26.99,
    compareAt: null,
    badge: null,
    blurb: 'Charge two controllers and keep them off the desk.',
    description: 'A weighted dock that charges two controllers at once with LED status indicators. Works with the most common console and PC controllers via included adapter tips, and doubles as display storage.',
    features: ['Charges 2 controllers', 'LED charge indicators', 'Universal adapter tips', 'Weighted anti-tip base'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk', 'under-50']
  },
  {
    id: 'desk-organizer-tray',
    name: 'Modular Desk Organizer',
    category: 'accessories',
    price: 18.99,
    compareAt: null,
    badge: null,
    blurb: 'Pen slots, phone stand, and a catch-all tray in one block.',
    description: 'A compact organizer for the stuff that ends up scattered on your desk: pens, phone, earbuds, sticky notes. Weighted base, felt-lined tray, and a slot that holds your phone at a readable angle.',
    features: ['Phone slot with cable pass-through', 'Felt-lined tray', 'Weighted base', '8" × 4" footprint'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk', 'small-space', 'under-50', 'starter']
  },
  {
    id: 'webcam-mic-arm',
    name: 'Low-Profile Mic Boom Arm',
    category: 'accessories',
    price: 49.99,
    compareAt: 59.99,
    badge: 'New',
    blurb: 'Stays below the monitor and out of the frame.',
    description: 'A low-profile boom arm that mounts to the back of your desk and routes your mic in from below the screen. Internal cable channels, 360° rotation, and a clamp that fits desks up to 2.4" thick.',
    features: ['Low-profile design', 'Internal cable routing', 'Holds up to 3.3 lb', 'Fits desks up to 2.4"'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk']
  },

  /* ---------------- ROOM GEAR ---------------- */
  {
    id: 'floating-shelf-set',
    name: 'Floating Shelf Set (3)',
    category: 'room-gear',
    price: 34.99,
    compareAt: null,
    badge: 'Staff Pick',
    blurb: 'Three matte black shelves for figures, games, and headsets.',
    description: 'A set of three floating shelves in a matte black finish that disappears against a dark wall. Hidden brackets, 15 lb capacity each, and a depth made for collectibles, controllers, and game cases.',
    features: ['Set of 3, matte black', 'Hidden bracket mount', '15 lb capacity each', '16" × 5" each'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['small-space', 'under-50']
  },
  {
    id: 'setup-pegboard',
    name: 'Desk Pegboard Organizer',
    category: 'room-gear',
    price: 39.99,
    compareAt: 49.99,
    badge: null,
    blurb: 'Wall-mounted storage for headsets, cables, and controllers.',
    description: 'A modern pegboard with a matching accessory pack: hooks, a small shelf, and a cup. Hang your headset, coil your cables, and get everything off the desk without losing access to it.',
    features: ['24" × 16" panel', 'Includes hooks, shelf, cup', 'Wall or desk mount', 'Matte black or white'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['clean-desk', 'small-space', 'under-50']
  },
  {
    id: 'acoustic-panels-6',
    name: 'Hex Acoustic Panels (6-Pack)',
    category: 'room-gear',
    price: 42.99,
    compareAt: null,
    badge: 'New',
    blurb: 'Tame echo on calls and streams. Looks good doing it.',
    description: 'Six hexagonal acoustic panels that cut down room echo for calls, streams, and recordings. High-density polyester felt in charcoal, with adhesive tabs so you can rearrange the pattern without damaging the wall.',
    features: ['6 hex panels, 12" wide', 'High-density felt', 'Removable adhesive tabs', 'Charcoal finish'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['small-space', 'under-50']
  },
  {
    id: 'neon-game-over-sign',
    name: '"Game Over" Neon Sign',
    category: 'room-gear',
    price: 29.99,
    compareAt: null,
    badge: null,
    blurb: 'Pixel-style LED neon that sets the room tone.',
    description: 'An LED neon sign in a retro pixel font. USB powered with a dimmer and an on/off switch on the cable, so it plugs into your desk hub. Low heat, long lifespan, and a lot cheaper than glass neon.',
    features: ['USB powered', 'Inline dimmer switch', '16" wide', 'Wall mount hardware included'],
    image: null,
    buyUrl: '',
    affiliate: false,
    tags: ['rgb-setup', 'under-50', 'starter']
  }
];

/* Filters shown on the Shop hub under "Shop by need" */
window.PP_TAGS = [
  { slug: 'starter', name: 'Starter Picks' },
  { slug: 'clean-desk', name: 'Clean Desk' },
  { slug: 'rgb-setup', name: 'RGB Setup' },
  { slug: 'small-space', name: 'Small Space' },
  { slug: 'under-50', name: 'Under $50' }
];
