# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static Jekyll website for the Gereformeerde Gemeente Emmeloord (a Dutch church), hosted on GitHub Pages. Design (brown header bar, overlapping circular logo, cream background, serif type) is based on the church's presentation slide deck, not a generic theme.

## Commands

```sh
bundle install          # install Jekyll + plugins (github-pages gem pins versions to match GH Pages)
bundle exec jekyll serve  # local dev server at http://localhost:4000, live rebuild
bundle exec jekyll build  # production build to _site/
```

There is no test suite and no linter configured. Deployment is just `git push` to `main` — GitHub Pages builds and publishes automatically; there is no separate CI step to trigger.

## Architecture

**Templates**: every page uses `_layouts/default.html`, which pulls in `_includes/header.html` and `_includes/footer.html`. There's only one layout — no per-section layout variants.

**Styling**: all CSS lives in `assets/css/style.scss`, with the color palette defined once as CSS custom properties at the top (`--brown`, `--brown-dark`, etc.). Changing the brand color means editing those variables *and* the hardcoded fill in `assets/img/logo.svg` (see below) — the SVG can't reference CSS variables, so the two are manually kept in sync.

**Logo badge**: `assets/img/logo.svg` is not just the church logo — it's a three-layer badge built to match the slide design: an outer circle filled with the same brown as the header bar (`--brown`, `#8f6c55`), a white disc inside it, and the traced church glyph scaled to 80% inside that. The header CSS (`.logo`, `.header-bar` in `style.scss`) positions this badge with a negative `left` offset so it overlaps the bar's rounded corner without leaving a sliver of the bar visible behind it — that offset is empirically tuned per breakpoint (desktop vs. ≤640px vs. ≤360px), not derived from a formula, so re-check visually after touching either the badge size or the bar's `border-radius`.

**Two features resolve client-side, not at Jekyll build time** — both exist to work around GitHub Pages only rebuilding on `git push`:

- **Mededelingen (time-boxed homepage announcements)**: markdown files in `_mededelingen/` (a Jekyll collection with `output: false`, so they're data, not published pages) carry `vanaf`/`tot` dates in front matter. `index.md` renders all of them into the page, hidden, with `data-vanaf`/`data-tot` attributes. `assets/js/mededelingen.js` runs in the visitor's browser and un-hides only the ones whose date window includes "now". This means an expired announcement disappears without anyone pushing a commit on the end date — but also means expired/future announcements still exist in the page's HTML source (not secret, just not displayed).
- **Agenda (iCal feed on the Diensten page)**: `assets/js/agenda.js` fetches the URL in `_config.yml`'s `ical_feed` directly from the browser and parses VEVENTs with a small hand-rolled ICS parser (`webcal://` is rewritten to `https://` since `fetch()` rejects that scheme; RRULE recurrence is *not* expanded, only literal events). This only works if the feed server sends `Access-Control-Allow-Origin`, since it's a cross-origin browser fetch, not a server-side build step. The feed currently referenced is the HVC-afhaalkalender FastAPI app (`bin.zandijk.xyz`, a separate repo/project on the NAS) — that app's `main.py` has CORS middleware added specifically to support this. `ical_feed` is presently empty/commented out in `_config.yml`; the agenda section self-hides whenever it's empty.

**Hero background**: `.hero`'s `background-image` reads a CSS custom property `--hero-bg` with a gradient fallback (`style.scss`). `index.md` sets that property inline only when `site.hero_image` (in `_config.yml`) is non-empty, layering a fixed dark overlay under the photo so `.hero-box`'s white text stays legible regardless of the image's content — the same override-a-CSS-var-from-Liquid pattern as the login button's conditional rendering.

**SEO**: handled by the `jekyll-seo-tag` and `jekyll-sitemap` plugins (both included via the `github-pages` gem, no extra install needed) — `{% seo %}` in `_layouts/default.html` generates title/description/canonical/OG/JSON-LD tags, and `jekyll-sitemap` generates `/sitemap.xml`, which `robots.txt` points to.

**Canonical domain**: `url`/`baseurl` in `_config.yml` currently point at the GitHub Pages project URL (`kathedra.github.io/gergememmeloord`), not the eventual real domain `gergememmeloord.nl` (which currently serves a different, older Carrd site). Both values need to flip together if/when this Jekyll site takes over that domain — there's a comment in `_config.yml` marking the two lines to change.