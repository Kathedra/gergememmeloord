# Website Gereformeerde Gemeente Emmeloord

Statische website gebouwd met [Jekyll](https://jekyllrb.com/), bedoeld voor hosting op **GitHub Pages**. Het ontwerp (bruine balk met rond logo, crème achtergrond, serif-typografie) is gebaseerd op de aangeleverde presentatiedia's.

## Structuur

- `_layouts/default.html` — basispagina (head, header, footer)
- `_includes/header.html` — de bruine headerbalk met logo en het menu
- `assets/css/style.scss` — alle styling; kleuren staan bovenin als CSS-variabelen
- `assets/img/logo.svg` — het echte logo (potrace-trace), opgeschoond: hoekvlakken verwijderd, ring en kerk bruin gekleurd op een witte schijf
- `index.md`, `diensten.md`, `meeluisteren.md`, `contact.md` — de pagina's

## Vóór livegang invullen (placeholders)

Zoek op `TODO` in de repo. In elk geval:

1. **Aanvangstijden** in `diensten.md` — er staan nu aannames (9.30 / 15.30 uur).
2. **Adres en scriba-gegevens** in `contact.md`.
3. **Livestreamlink** in `meeluisteren.md` (wijst nu naar een placeholder-YouTube-kanaal).
4. **iCal-feed** — zet de feed-URL in `_config.yml` bij `ical_feed` (zie hieronder).

## Mededelingen (tijdelijke aankondigingen)

Iets promoten op de homepage voor een bepaalde periode:

1. Maak een markdown-bestand in `_mededelingen/` (kopieer `voorbeeld.md`).
2. Zet in de front matter: `titel`, `vanaf` en `tot` (datums als `JJJJ-MM-DD`, beide inclusief). `vanaf` weglaten = direct zichtbaar.
3. Commit + push. Klaar — de mededeling verschijnt vanzelf op de startdatum en verdwijnt na de einddatum, **zonder** dat er opnieuw gepusht hoeft te worden (de datumcheck gebeurt in de browser via `assets/js/mededelingen.js`, omdat GitHub Pages alleen bij een push herbouwt).

Let op: verborgen mededelingen staan wel in de HTML-bron van de pagina — geen vertrouwelijke inhoud dus. Verwijder verlopen bestanden bij gelegenheid gewoon uit de map.

## Agenda via iCal-feed

De dienstenpagina toont een agenda op basis van een iCal-feed (`.ics`):

- **Waar invullen:** `ical_feed:` in `_config.yml` — de volledige **https**-URL van de feed (`webcal://` wordt automatisch omgezet). Zolang die leeg is, blijft de agenda-sectie verborgen.
- De feed wordt **in de browser van de bezoeker** opgehaald (`assets/js/agenda.js`), want GitHub Pages is statisch. De server die de feed levert moet daarom **CORS toestaan**, anders blokkeert de browser het antwoord. In een Express-app op de ics-route:

  ```js
  res.set("Access-Control-Allow-Origin", "*");
  ```
- Getoond worden de eerstvolgende 8 activiteiten (SUMMARY, datum/tijd, LOCATION).
- Beperking: alleen losse events; RRULE-herhalingsregels worden niet uitgevouwen.

## SEO

- `jekyll-seo-tag` genereert title-, description-, canonical-, Open Graph- en JSON-LD-tags (de `{% seo %}`-regel in `_layouts/default.html`).
- `jekyll-sitemap` genereert `/sitemap.xml`; `robots.txt` verwijst ernaar.
- Canonical-URL's volgen `url` + `baseurl` in `_config.yml`. Die staan nu op de GitHub Pages-projectsite; **bij verhuizing naar gergememmeloord.nl beide aanpassen** (zie de opmerking in `_config.yml`).
- Zodra het adres van het kerkgebouw definitief is, kan er Church/LocalBusiness structured data (JSON-LD) aan de homepage worden toegevoegd voor betere lokale vindbaarheid.

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
