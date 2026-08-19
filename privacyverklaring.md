---
layout: default
title: Privacyverklaring
permalink: /privacyverklaring/
description: >-
  Hoe de website van de Gereformeerde Gemeente Emmeloord omgaat met
  uw gegevens: geen accounts, geen tracking en geen cookies.
---

<div class="page" markdown="1">

# Privacyverklaring

Deze verklaring gaat over deze website
(www.gergememmeloord.nl) van de Gereformeerde Gemeente Emmeloord.
Wij gaan zorgvuldig om met uw gegevens en verzamelen er zo min
mogelijk.

<!-- TODO: door de kerkenraad laten controleren en vaststellen. De
     ledenadministratie (Scipio) valt buiten deze websiteverklaring;
     als de kerkenraad ook daarvoor een verklaring wil publiceren, kan
     dat als aparte paragraaf of PDF. -->

{% assign ga_id = site.google_analytics | default: "" %}
## Wat deze website wél en niet doet

- De website heeft **geen accounts en geen formulieren**.
{% if ga_id != "" -%}
- De website meet het bezoek met **Google Analytics** — maar alleen
  als u daarvoor toestemming geeft via de cookiemelding. Zie het kopje
  Cookies hieronder.
{%- else -%}
- De website heeft **geen volgsoftware** (tracking of analytics) en
  plaatst **geen cookies**.
{%- endif %}
- De pagina's worden gehost door **GitHub Pages**. Zoals bij elke
  website registreert de hostingpartij daarbij technische gegevens
  (zoals uw IP-adres) in serverlogs. Zie de
  [privacyverklaring van GitHub](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement).
- De agenda op de pagina [Diensten]({{ '/diensten/' | relative_url }})
  haalt gegevens op bij kerktijden.nl. Uw browser maakt daarvoor
  rechtstreeks verbinding met die dienst, die daarbij uw IP-adres
  ziet.

## E-mail

Stuurt u ons een e-mail (bijvoorbeeld aan de scriba), dan gebruiken wij
uw gegevens alleen om uw bericht te beantwoorden. Uw gegevens worden
niet met derden gedeeld, tenzij dat voor de afhandeling van uw vraag
nodig is en u daarvan weet.

## Links naar andere websites

Deze website linkt naar externe diensten, zoals het ledenportaal
(Scipio), kerktijden.nl en een routebeschrijving via Google Maps. Op
die websites geldt de privacyverklaring van de betreffende partij.

{% if site.cookie_banner or ga_id != "" %}
## Cookies

Deze website vraagt via een melding om toestemming voordat er cookies
of vergelijkbare technieken worden gebruikt. Zonder uw toestemming
worden die niet geplaatst.

{% if ga_id != "" -%}
Na toestemming gebruikt de website **Google Analytics** om te meten
hoe de site wordt gebruikt (zoals welke pagina's bezocht worden).
Daarbij plaatst Google Analytics cookies (namen die beginnen met
`_ga`) en verwerkt Google gegevens over uw bezoek. Meer hierover leest
u in de [privacyverklaring van Google](https://policies.google.com/privacy?hl=nl).
Weigert u, dan wordt er niets gemeten en worden deze cookies niet
geplaatst.
{%- endif %}

U kunt uw keuze hieronder aanpassen.

<button type="button" id="cookie-voorkeuren" class="btn btn-page">Cookievoorkeuren aanpassen</button>
{% endif %}

## Uw rechten

Op grond van de AVG heeft u het recht om uw gegevens in te zien, te
laten corrigeren of te laten verwijderen. Neem daarvoor contact op met
de scriba: [{{ site.email }}](mailto:{{ site.email }}).

*Laatst bijgewerkt: augustus 2026.*

</div>
