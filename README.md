# Website Gereformeerde Gemeente Emmeloord

Statische website gebouwd met [Jekyll](https://jekyllrb.com/), bedoeld voor hosting op **GitHub Pages**. Het ontwerp (bruine balk met rond logo, crème achtergrond, serif-typografie) is gebaseerd op de aangeleverde presentatiedia's.

## Structuur

- `_layouts/default.html` — basispagina (head, header, footer)
- `_includes/header.html` — de bruine headerbalk met logo en het menu
- `assets/css/style.scss` — alle styling; kleuren staan bovenin als CSS-variabelen
- `assets/img/logo.svg` — het logo, nagetekend als SVG (vervang gerust door het originele bestand)
- `index.md`, `diensten.md`, `meeluisteren.md`, `contact.md` — de pagina's

## Vóór livegang invullen (placeholders)

Zoek op `TODO` in de repo. In elk geval:

1. **Aanvangstijden** in `diensten.md` — er staan nu aannames (9.30 / 15.30 uur).
2. **Adres en scriba-gegevens** in `contact.md`.
3. **Livestreamlink** in `meeluisteren.md` (wijst nu naar een placeholder-YouTube-kanaal).
4. **Logo** — `assets/img/logo.svg` is een benadering; vervang door het echte logobestand als dat beschikbaar is.

## Lokaal draaien

Vereist Ruby (3.x) met bundler.

```sh
bundle install
bundle exec jekyll serve
```

De site draait dan op `http://localhost:4000`.

## Publiceren op GitHub Pages

1. Push deze repo naar GitHub.
2. Op GitHub: **Settings → Pages → Source: Deploy from a branch**, branch `main`, map `/ (root)`.
3. Zonder eigen domein: zet in `_config.yml` de `baseurl` op `"/<reponaam>"`.
4. Met eigen domein (bijv. `gergememmeloord.nl`, nu nog op Carrd): stel het domein in onder **Settings → Pages → Custom domain** (GitHub maakt dan een `CNAME`-bestand aan) en verwijs de DNS van het domein naar GitHub Pages. Laat `baseurl` dan leeg.
