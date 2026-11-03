# RSRoute — Website

A fully static marketing site for RSRoute. **No Node.js, no build step, no server-side code.**

Everything is plain HTML, CSS and vanilla JavaScript, so it runs from any static host —
including InfinityFree — by uploading the folder as-is.

---

## Files

```
website/
├── index.html                  # marketing page
├── guide/
│   ├── index.html              # guide hub: what it is, parameters, REST, client
│   ├── chat_model/index.html   # chat model deep dive
│   ├── agent/index.html        # agent deep dive
│   ├── gemini/index.html       # Google Gemini provider guide
│   ├── mistral/index.html      # MistralAI provider guide
│   ├── groq/index.html         # Groq provider guide
│   └── openrouter/index.html   # OpenRouter provider guide
└── assets/
    ├── css/
    │   ├── styles.css          # all styling + light/dark themes + responsive rules
    │   └── guide.css           # guide layout: sidebar, param tables, callouts, pager
    ├── js/
    │   ├── theme-init.js       # runs before first paint (prevents theme flash)
    │   ├── main.js             # theme toggle, mobile nav, tabs, scroll effects
    │   └── guide.js            # sidebar scroll-spy, copy buttons, smooth anchors
    └── img/
        ├── logo.svg            # logo with gradient background (badge)
        ├── logo-mark.svg       # logo without background (transparent mark)
        └── favicon.svg         # browser tab icon
```

### Guide pages

The guide is a static sub-site under `guide/`. Every page is a standalone HTML file
that loads `styles.css` + `guide.css` and `main.js` + `guide.js` — no shared templates,
no includes, no build step.

| Page | Path | Contents |
| :--- | :--- | :--- |
| Hub | `guide/index.html` | What RSRoute is, provider cards, all server parameters, REST examples (Python / JS / cURL), client usage, envelope, errors |
| Chat models | `guide/chat_model/index.html` | Constructor arguments, per-provider differences, message shaping, return value |
| Agents | `guide/agent/index.html` | Tool loop mechanics, `tools_info` schema, `max_tool_calls`, error cases |
| Gemini | `guide/gemini/index.html` | `/v1/gemini` routes, `thinking_level` / `thinking_budget` |
| MistralAI | `guide/mistral/index.html` | `/v1/mistral` routes, standard parameter set |
| Groq | `guide/groq/index.html` | `/v1/groq` routes, why `top_p` is unsupported |
| OpenRouter | `guide/openrouter/index.html` | `/v1/openrouter` routes, `providers`, app attribution, retries |

All internal links are relative (`../index.html`, `../gemini/index.html`), so the guide
works from any subdirectory on any static host. Directory-style URLs
(`guide/chat_model/`) rely on the host serving `index.html` for a directory — standard
on nginx, Apache, GitHub Pages, Netlify and InfinityFree.

---

## Deploying to InfinityFree

1. Log in to the InfinityFree control panel and open **File Manager** (or connect over FTP).
2. Open the `htdocs` folder — this is the web root.
3. Upload **the contents of this `website/` folder** into `htdocs`, so that
   `htdocs/index.html`, `htdocs/guide/` and `htdocs/assets/` exist.
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
<!-- ================= OPENROUTER ================= -->
<!-- ================= QUICKSTART ================= -->
<!-- ================= FAQ ================= -->
```

The quickstart documents the [`rsroute` Python client](https://www.github.com/ItzRustam/rsroute-package)
(`pip install rsroute`) as the primary path, with the raw REST API as an alternative tab.

### Provider coverage

The site documents four live providers — Google Gemini, MistralAI, Groq and OpenRouter.
OpenRouter has its own section (`#openrouter`) covering model ids, provider routing
preferences, app attribution, retries and the `OPENROUTER_API_KEY` requirement.
OpenAI and HuggingFace are shown as "soon" in the provider strip only.

When a new provider is added to the server, update:

1. The provider strip (`.logo-strip`) and the hero `.route-providers` pills.
2. The endpoint matrix in `#api` (chat / agent / parameters / default model).
3. The quickstart code tabs (`Chat*` and `*Agent` imports).
4. The FAQ entry about which providers are wired.
5. The footer "Providers" column.
6. A new `guide/<provider>/index.html` page, plus a card in `guide/index.html`
   and a link in every guide page's sidebar and footer.

### Guide conventions

- **No parameter tables on the marketing page.** All field-level reference lives in
  `guide/`. The main page links to it instead.
- Each guide page follows the same section order: *What it is → Routes → Server
  parameters → REST example → rsroute client → Notes*.
- REST examples always ship as **Python / JavaScript / cURL** tabs.
- Provider pages must state the default model, the required env var, and any
  parameter the route does *not* support.
- Sidebar links use in-page anchors (`#parameters`); `guide.js` handles scroll-spy
  and smooth scrolling.

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The layout uses CSS Grid,
custom properties, and `clamp()` — all widely supported. `backdrop-filter` on the
sticky header degrades to a solid background where unsupported.

`guide.js` uses `navigator.clipboard` for the copy buttons, with an
`execCommand("copy")` fallback for non-secure contexts such as `file://` or plain
HTTP on a LAN address.
