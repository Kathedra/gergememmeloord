---
layout: default
title: Welkom
permalink: /
description: >-
  Website van de Gereformeerde Gemeente te Emmeloord:
  kerkdiensten elke zondag, live meeluisteren en contactgegevens.
---

{% if site.mededelingen.size > 0 %}
<section id="mededelingen" hidden aria-label="Mededelingen">
  {% for m in site.mededelingen %}
  <article class="mededeling" hidden{% if m.vanaf %} data-vanaf="{{ m.vanaf | date: '%Y-%m-%d' }}"{% endif %}{% if m.tot %} data-tot="{{ m.tot | date: '%Y-%m-%d' }}"{% endif %}>
    <h2>{{ m.titel | default: m.title }}</h2>
    {{ m.content | markdownify }}
  </article>
  {% endfor %}
</section>
<script src="{{ '/assets/js/mededelingen.js' | relative_url }}" defer></script>
{% endif %}

<section class="hero">
  <div class="hero-box">
    <h1>Welkom bij de Gereformeerde Gemeente Emmeloord</h1>
    <p>U bent hartelijk welkom in de diensten van de Gereformeerde Gemeente te Emmeloord. Iedere zondag komen wij als gemeente samen rondom het Woord van God.</p>
    <p>Kunt u niet aanwezig zijn? De diensten zijn ook live mee te luisteren.</p>
    <a class="btn" href="{{ '/meeluisteren/' | relative_url }}">Dienst meeluisteren</a>
  </div>
</section>

<section class="cards">
  <div class="card">
    <h2>Kerkdiensten</h2>
    <p>Elke zondag zijn er twee diensten. Bekijk de aanvangstijden en bijzondere diensten.</p>
    <a href="{{ '/diensten/' | relative_url }}">Naar de diensten &rarr;</a>
  </div>
  <div class="card">
    <h2>Meeluisteren</h2>
    <p>Luister live mee met de diensten of luister een eerdere dienst terug.</p>
    <a href="{{ '/meeluisteren/' | relative_url }}">Naar meeluisteren &rarr;</a>
  </div>
  <div class="card">
    <h2>Contact</h2>
    <p>Vragen of een keer een dienst bezoeken? Neem gerust contact met ons op.</p>
    <a href="{{ '/contact/' | relative_url }}">Naar contact &rarr;</a>
  </div>
</section>
