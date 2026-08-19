/* Cookietoestemming. Zie _includes/cookies.html voor het gebruik.
   De keuze staat in localStorage ("cookies": "ja" of "nee"). Scripts
   die cookies gebruiken staan als <script type="text/plain"
   data-cookies ...> in de pagina en worden hier pas geactiveerd nadat
   de bezoeker heeft ingestemd. */
(function () {
  var banner = document.getElementById("cookie-banner");
  if (!banner) return;

  var SLEUTEL = "cookies";

  function activeer() {
    document
      .querySelectorAll('script[type="text/plain"][data-cookies]')
      .forEach(function (tpl) {
        var script = document.createElement("script");
        var src = tpl.getAttribute("src");
        if (src) script.src = src;
        else script.textContent = tpl.textContent;
        tpl.replaceWith(script);
      });
  }

  function kies(waarde) {
    try {
      localStorage.setItem(SLEUTEL, waarde);
    } catch (e) {
      /* Opslag geblokkeerd: de keuze geldt dan alleen voor deze
         pagina en de melding verschijnt de volgende keer opnieuw. */
    }
    banner.hidden = true;
    if (waarde === "ja") activeer();
  }

  document.getElementById("cookie-accepteren").addEventListener("click", function () {
    kies("ja");
  });
  document.getElementById("cookie-weigeren").addEventListener("click", function () {
    kies("nee");
  });

  // Knop "Cookievoorkeuren aanpassen" op de privacyverklaring:
  // eerdere keuze wissen en de melding opnieuw tonen.
  var voorkeuren = document.getElementById("cookie-voorkeuren");
  if (voorkeuren) {
    voorkeuren.addEventListener("click", function () {
      try { localStorage.removeItem(SLEUTEL); } catch (e) {}
      banner.hidden = false;
      banner.scrollIntoView({ block: "nearest" });
    });
  }

  var eerder = null;
  try { eerder = localStorage.getItem(SLEUTEL); } catch (e) {}
  if (eerder === "ja") {
    activeer();
  } else if (eerder !== "nee") {
    banner.hidden = false;
  }
})();
