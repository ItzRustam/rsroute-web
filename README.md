# RSRoute — Website

A fully static marketing site for RSRoute. **No Node.js, no build step, no server-side code.**

Everything is plain HTML, CSS and vanilla JavaScript, so it runs from any static host —
including InfinityFree — by uploading the folder as-is.

---

## Files

```
website/
├── index.html              # the whole page
└── assets/
    ├── css/styles.css      # all styling + light/dark themes + responsive rules
    ├── js/
    │   ├── theme-init.js   # runs before first paint (prevents theme flash)
    │   └── main.js         # theme toggle, mobile nav, tabs, scroll effects
    └── img/
        ├── logo.svg        # logo with gradient background (badge)
        ├── logo-mark.svg   # logo without background (transparent mark)
        └── favicon.svg     # browser tab icon
```

---

## Deploying to InfinityFree

1. Log in to the InfinityFree control panel and open **File Manager** (or connect over FTP).
2. Open the `htdocs` folder — this is the web root.
3. Upload **the contents of this `website/` folder** into `htdocs`, so that
   `htdocs/index.html` and `htdocs/assets/` exist.
4. Visit your domain. Done.

No `.htaccess`, no PHP, no database, no configuration required.

> Upload the *contents*, not the `website` folder itself — otherwise the site
> would live at `yourdomain.com/website/`.

### Any other static host

The same folder works unchanged on GitHub Pages, Netlify, Cloudflare Pages,
Vercel (static), Surge, or plain nginx/Apache. Just serve `index.html`.

---

## Local preview

Any static file server works. For example:

```bash
cd website
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

Opening `index.html` directly via `file://` also works, though a local server
is closer to production.

---

## Features

- **Light / dark theme** with a toggle in the header.
  - Respects `prefers-color-scheme` on first visit.
  - Remembers the visitor's choice in `localStorage`.
  - Applied before first paint by `theme-init.js`, so there is no flash.
- **Fully responsive** — phone (≤420px), large phone (≤640px), tablet (≤860px),
  tablet landscape (≤900px), laptop, desktop, and ultra-wide (≥1800px).
- **Mobile navigation** — slide-down menu with Escape-to-close and outside-click dismissal.
- **Accessible** — skip link, ARIA labels, keyboard-navigable tabs, visible focus rings,
  and `prefers-reduced-motion` support.
- **No dependencies** — no frameworks, no bundler, no CDN JavaScript.
  Only Google Fonts is loaded externally; the site degrades gracefully without it.

---

## Customising

### Colours

All colours are CSS custom properties at the top of `assets/css/styles.css`:

```css
:root {
  --brand-1: #4f46e5;
  --brand-2: #7c3aed;
  --brand-3: #06b6d4;
  --accent:  #4f46e5;
  /* ... */
}

html[data-theme="dark"] {
  --accent: #8b8cf9;
  /* ... */
}
```

Change the three `--brand-*` values to re-skin the whole site, including the
gradient text, buttons, and the CTA band.

### Logo

- `assets/img/logo.svg` — gradient badge, used in the header and footer.
- `assets/img/logo-mark.svg` — transparent mark, used inside the hero diagram.
- `assets/img/favicon.svg` — tab icon.

All three are hand-written SVG, so you can edit the paths or gradients directly.

### Content

Everything lives in `index.html`. Sections are marked with comment banners:

```
<!-- ================= HERO ================= -->
<!-- ================= FEATURES ================= -->
<!-- ================= API REFERENCE ================= -->
<!-- ================= QUICKSTART ================= -->
<!-- ================= FAQ ================= -->
```

The quickstart documents the [`rsroute` Python client](https://www.github.com/ItzRustam/rsroute-package)
(`pip install rsroute`) as the primary path, with the raw REST API as an alternative tab.

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The layout uses CSS Grid,
custom properties, and `clamp()` — all widely supported. `backdrop-filter` on the
sticky header degrades to a solid background where unsupported.
