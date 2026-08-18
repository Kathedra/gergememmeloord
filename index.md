---
layout: default
title: Welkom
permalink: /
description: >-
  Website van de Gereformeerde Gemeente te Emmeloord:
  kerkdiensten elke zondag, live meeluisteren en contactgegevens.
---

{% if site.uitzendingen.size > 0 %}
{% for u in site.uitzendingen %}
<a class="uitzending-knop" hidden href="{{ u.stream_url }}" target="_blank" rel="noopener"{% if u.vanaf %} data-vanaf="{{ u.vanaf | date: '%Y-%m-%d' }}"{% endif %}{% if u.tot %} data-tot="{{ u.tot | date: '%Y-%m-%d' }}"{% endif %}>
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="7 4 21 12 7 20"/></svg>
  <span>{{ u.titel }}<span class="sr-only"> (opent in nieuw venster)</span></span>
</a>
{% endfor %}
<script src="{{ '/assets/js/uitzending.js' | relative_url }}" defer></script>
{% endif %}

{% if site.mededelingen.size > 0 %}
<section id="mededelingen" hidden aria-label="Mededelingen">
  {% for m in site.mededelingen %}
  <article class="mededeling" hidden{% if m.vanaf %} data-vanaf="{{ m.vanaf | date: '%Y-%m-%d' }}"{% endif %}{% if m.tot %} data-tot="{{ m.tot | date: '%Y-%m-%d' }}"{% endif %}>
    <p class="mededeling-kicker">Mededeling</p>
    <h2>{{ m.titel | default: m.title }}</h2>
    {{ m.content | markdownify }}
  </article>
  {% endfor %}
</section>
<script src="{{ '/assets/js/mededelingen.js' | relative_url }}" defer></script>
{% endif %}

<section class="hero"{% if site.hero_image %} style="--hero-bg: linear-gradient(rgba(74,56,44,.72), rgba(74,56,44,.72)), url('{{ site.hero_image | relative_url }}');"{% endif %}>
  <div class="hero-box">
    <h1>Welkom bij de Gereformeerde Gemeente Emmeloord</h1>
    <p>Hartelijk welkom op onze website. Hier kunt u lezen over <a href="{{ '/over-ons/' | relative_url }}">onze kerk</a> en <a href="{{ '/wat-geloven-wij/' | relative_url }}">waar we in geloven</a>.</p>
    <p>U bent van harte uitgenodigd om de diensten bij ons in de kerk bij te wonen. Reguliere diensten zijn daarom niet live te volgen voor niet-leden.</p>
    <a class="btn" href="{{ '/diensten/' | relative_url }}">Naar de diensten</a>
  </div>
</section>

<section class="cards">
  <div class="card">
    <h2>Wat geloven wij</h2>
    <p>Lees waar de Gereformeerde Gemeente Emmeloord in gelooft.</p>
    <a href="{{ '/wat-geloven-wij/' | relative_url }}">Meer lezen &rarr;</a>
  </div>
  <div class="card">
    <h2>Over ons</h2>
    <p>Maak kennis met onze gemeente.</p>
    <a href="{{ '/over-ons/' | relative_url }}">Meer lezen &rarr;</a>
  </div>
  <div class="card">
    <h2>Kerkdiensten</h2>
    <p>Elke zondag zijn er twee diensten. Bekijk de aanvangstijden en bijzondere diensten.</p>
    <a href="{{ '/diensten/' | relative_url }}">Naar de diensten &rarr;</a>
  </div>
  <div class="card">
    <h2>Contact</h2>
    <p>Vragen of een keer een dienst bezoeken? Neem gerust contact met ons op.</p>
    <a href="{{ '/contact/' | relative_url }}">Naar contact &rarr;</a>
  </div>
</section>
