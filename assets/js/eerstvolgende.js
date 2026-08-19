/* Toont op de homepage de eerstvolgende dienst uit dezelfde iCal-feed
   als de agenda op de dienstenpagina (zie agenda.js; zelfde
   beperkingen: de feed moet CORS toestaan en RRULE-herhalingen worden
   niet uitgevouwen). Mislukt het laden, dan blijft de regel verborgen
   — de homepage belooft dan niets dat niet klopt. */
(function () {
  var el = document.getElementById("eerstvolgende");
  if (!el) return;

  var feed = el.getAttribute("data-feed");
  if (!feed) return;
  feed = feed.replace(/^webcal:\/\//i, "https://");

  function unfold(text) {
    return text.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
  }

  function unescapeText(value) {
    return value
      .replace(/\\n/gi, " ")
      .replace(/\\,/g, ",")
      .replace(/\\;/g, ";")
      .replace(/\\\\/g, "\\");
  }

  function parseDate(value) {
    var m = value.match(/^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)?(Z?)$/);
    if (!m) return null;
    if (m[7] === "Z") {
      return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0)));
    }
    // Zonder Z: als lokale (Nederlandse) tijd behandelen.
    return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0));
  }

  var dayFmt = new Intl.DateTimeFormat("nl-NL", { weekday: "long", day: "numeric", month: "long" });
  var timeFmt = new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit" });

  fetch(feed)
    .then(function (r) {
      if (!r.ok) throw new Error("feed niet bereikbaar");
      return r.text();
    })
    .then(function (text) {
      var now = new Date();
      var next = null;
      var current = null;
      unfold(text).split("\n").forEach(function (line) {
        if (line === "BEGIN:VEVENT") { current = {}; return; }
        if (line === "END:VEVENT") {
          if (current && current.start && current.start >= now &&
              (!next || current.start < next.start)) {
            next = current;
          }
          current = null;
          return;
        }
        if (!current) return;
        var idx = line.indexOf(":");
        if (idx < 0) return;
        var name = line.slice(0, idx).split(";")[0];
        var value = line.slice(idx + 1);
        if (name === "DTSTART") current.start = parseDate(value);
        if (name === "SUMMARY") current.summary = unescapeText(value);
      });

      if (!next) return;
      var strong = document.createElement("strong");
      strong.textContent = "Eerstvolgende dienst: ";
      el.appendChild(strong);
      el.appendChild(document.createTextNode(
        dayFmt.format(next.start) + " · " + timeFmt.format(next.start) + " uur" +
        (next.summary ? " — " + next.summary : "")
      ));
      el.hidden = false;
    })
    .catch(function (err) {
      console.error("Eerstvolgende dienst laden mislukt:", feed, err);
    });
})();
