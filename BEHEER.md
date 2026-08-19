# Beheer van de website

Deze handleiding is voor wie de website onderhoudt zonder technische
achtergrond. Voor de technische documentatie: zie `README.md` en
`CLAUDE.md`.

## Hoe de website werkt

De website is een verzameling tekstbestanden in deze GitHub-repository.
Zodra een wijziging wordt opgeslagen op de hoofdtak (`main`), bouwt
GitHub Pages de site automatisch opnieuw — binnen een paar minuten
staat de wijziging online. Er is geen apart beheerpaneel.

Bewerken kan rechtstreeks op github.com: open het bestand, klik op het
potloodje, wijzig de tekst en kies **Commit changes**.

## Een mededeling op de startpagina zetten

1. Ga naar de map `_mededelingen/`.
2. Open `voorbeeld.md` en bekijk hoe het werkt — dit bestand zelf
   verschijnt nooit op de site.
3. Maak een nieuw bestand aan (bijv. `kerstzangavond.md`) met dezelfde
   opbouw:

   ```
   ---
   titel: Kerstzangavond
   vanaf: 2026-12-01
   tot: 2026-12-20
   ---

   De tekst van de mededeling. Gewone opmaak werkt hier,
   zoals **vet** en [een link](https://voorbeeld.nl).
   ```

4. De mededeling verschijnt vanzelf op `vanaf` en verdwijnt vanzelf na
   `tot` (datums als JJJJ-MM-DD). Verlopen bestanden worden na twee
   maanden automatisch opgeruimd.

## Een vrij mee te kijken uitzending aankondigen

Zelfde werkwijze, in de map `_uitzendingen/` (zie `voorbeeld.md`
aldaar). Extra veld: `stream_url` — de link naar de uitzending. Op de
startpagina verschijnt binnen het datumvenster een rode knop met de
`titel` als tekst.

## Teksten en tijden aanpassen

- **Aanvangstijden diensten**: `diensten.md` (de tabel bovenaan) — en
  controleer of dezelfde tijden op `nieuw-hier.md` nog kloppen.
- **Adres en e-mailadres**: staan op één plek, in `_config.yml`
  (voeden de footer en de contactgegevens voor zoekmachines). De
  contactpagina noemt ze ook in lopende tekst.
- **Overige pagina's**: elk `.md`-bestand in de hoofdmap is een
  pagina (contact, over-ons, enzovoort).

## Cookies en statistieken

Zolang er geen cookiegebruik is ingesteld, plaatst de site geen
cookies en toont hij geen cookiemelding.

**Google Analytics aanzetten**: vul in `_config.yml` bij
`google_analytics` de measurement-ID in (`G-XXXXXXXXXX`, te vinden op
analytics.google.com onder Beheer → Gegevensstromen). Meer is het
niet — de cookiemelding en de uitleg op de privacyverklaring
verschijnen dan vanzelf, en Analytics meet alleen bezoekers die op
"Accepteren" klikken. Weghalen van de ID zet alles weer uit.

Komt er ooit iets anders bij dat cookies gebruikt: zet
`cookie_banner: true` in `_config.yml` en lees de toelichting in
`_includes/cookies.html`. Beschrijf de cookies ook in
`privacyverklaring.md`.

## Automatische controles

Twee taken draaien maandelijks vanzelf (tabblad **Actions** op GitHub):

- **Links controleren** — vindt dode links op de site en opent er een
  issue voor.
- **Verlopen items opschonen** — verwijdert mededelingen en
  uitzendingen waarvan de einddatum ruim voorbij is.

Beide zijn daar ook handmatig te starten met **Run workflow**.
