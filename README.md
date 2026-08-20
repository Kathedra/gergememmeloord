# Website Gereformeerde Gemeente Emmeloord

Statische website gebouwd met [Jekyll](https://jekyllrb.com/), bedoeld voor hosting op **GitHub Pages**. Het ontwerp (bruine balk met rond logo, crème achtergrond, serif-typografie) is gebaseerd op de aangeleverde presentatiedia's.

## Structuur

- `_layouts/default.html` — basispagina (head, header, footer)
- `_includes/header.html` — de bruine headerbalk met logo en het menu
- `assets/css/style.scss` — alle styling; kleuren staan bovenin als CSS-variabelen
- `assets/img/logo.svg` — het echte logo (potrace-trace), opgeschoond: hoekvlakken verwijderd, ring en kerk bruin gekleurd op een witte schijf
- `index.md`, `diensten.md`, `wat-geloven-wij.md`, `over-ons.md`, `meeluisteren.md`, `contact.md` — de pagina's

`wat-geloven-wij.md` en `over-ons.md` staan er nog met placeholdertekst in: op de huidige site staat die inhoud alleen als PDF op SharePoint achter een inlog, die kon niet automatisch overgenomen worden. Vervang de placeholder door de echte tekst uit die PDF's.

## Inloggen (externe knop)

De "Inloggen"-knop in het menu en op de meeluisterpagina linkt naar het ledenportaal, ingesteld via `login_url` in `_config.yml` (nu `https://web.scipio-app.nl/app/#/login`). De link opent in een nieuw tabblad.

## Foto achter de welkomstbanner

De banner op de homepage ("Welkom bij...") gebruikt standaard de bruine gradient. Om er een foto achter te zetten:

1. Zet de afbeelding in `assets/img/` (bijv. `assets/img/hero.jpg`).
2. Vul in `_config.yml` bij `hero_image` het pad in, bijv. `"/assets/img/hero.jpg"`.
3. Commit + push. Er komt automatisch een donkere overlay overheen zodat de witte tekst leesbaar blijft, ongeacht welke foto het is.

Leeg laten (`hero_image: ""`) geeft weer de gradient.

## Mededelingen (tijdelijke aankondigingen)

Iets promoten op de homepage voor een bepaalde periode:

1. Maak een markdown-bestand in `_mededelingen/` (kopieer `voorbeeld.md`).
2. Zet in de front matter: `title`, `vanaf` en `tot` (datums als `JJJJ-MM-DD`, beide inclusief), en optioneel `afbeelding` (pad binnen de site, bijv. `/assets/img/mededelingen/foto.jpg`). `vanaf` weglaten = direct zichtbaar.
3. Push de tak en voeg de pull request samen (zie hieronder). Daarna verschijnt de mededeling vanzelf op de startdatum en verdwijnt hij na de einddatum, **zonder** dat er opnieuw gepusht hoeft te worden (de datumcheck gebeurt in de browser via `assets/js/mededelingen.js`, omdat GitHub Pages alleen bij een push herbouwt).

Elke mededeling krijgt ook een eigen pagina (`/mededelingen/<bestandsnaam>/`) met de tekst en de foto; op de startpagina staat alleen de titel met een knop *Meer informatie*.

Let op: verborgen mededelingen staan wel in de HTML-bron van de pagina — geen vertrouwelijke inhoud dus. De maandelijkse opschoonworkflow ruimt verlopen bestanden (inclusief foto) op.

## Wijzigingen: tak, pull request, preview

`main` is beschermd; niets gaat er rechtstreeks naartoe. Werk op een tak
en voeg samen via een pull request. Bij elke pull request bouwt
`preview.yml` de hele site in de spiegel-repository
`kathedra/gergememmeloord-devtest`, onder `/pr-<nummer>/` — dat is de
testomgeving (rode balk bovenaan, `noindex`). GitHub Pages kan namelijk
maar één tak van deze repository serveren.

- Inzendingen van het formulier komen binnen op een tak `formulier/…`;
  `formulier-pr.yml` maakt daar automatisch een pull request van.
- Testinhoud: zet `published: false` in de front matter — zichtbaar in
  de preview (die bouwt met `--unpublished`), nooit op de echte site.
  Alleen lokaal proberen kan met `*.lokaal.md` (staat in `.gitignore`).
- `inhoud-bewaker.yml` blokkeert een pull request die échte
  mededelingen of uitzendingen wijzigt zonder van het formulier te
  komen. Bewust toch nodig? Label `inhoud-ok` erop.

### Eenmalige instellingen (met de hand)

1. **Spiegel-repository** `gergememmeloord-devtest` aanmaken, publiek,
   met één commit erin (bijv. een lege `README.md`), en
   **Settings → Pages → Deploy from a branch → main / (root)** aanzetten.
2. **Secret `SPIEGEL_TOKEN`** in *deze* repository
   (Settings → Secrets and variables → Actions): een fine-grained PAT
   met **alleen** de spiegel-repository en **Contents: read and write**.
3. **Telegram** (optioneel): secrets `TELEGRAM_TOKEN` en
   `TELEGRAM_CHAT_ID`. Zonder deze twee slaat de workflow het bericht
   over; de link staat dan alleen als opmerking bij de pull request.
4. **Settings → Actions → General**: "Allow GitHub Actions to create and
   approve pull requests" aanzetten (anders kan `formulier-pr.yml` geen
   pull request maken).
5. **Ruleset op `main`** (Settings → Rules → Rulesets → New branch
   ruleset, target `main`): "Require a pull request before merging" met
   **0** required approvals — GitHub staat niet toe je eigen pull
   request goed te keuren, dus met 1 approval kun je niets meer
   samenvoegen. Zet verder "Require status checks" aan met
   *Inhoud bewaken* en *Preview bouwen*, en zet in **Bypass list**:
   jezelf (Repository admin) en `github-actions[bot]` — die laatste is
   nodig voor de maandelijkse opschoonworkflow, die rechtstreeks naar
   `main` pusht.
6. **Formulier-app**: `PUSH_MODE=tak` in de Portainer-stack; het
   GitHub-token mag dan met **Contents: read and write** toe (Pull
   requests mag eraf — de workflow maakt de pull request).

Zet de ruleset pas aan als deze workflows op `main` staan: een workflow
voor pull requests wordt van de doeltak gelezen.

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
