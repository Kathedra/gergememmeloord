/* Haalt een iCal-feed (.ics) op in de browser en toont de komende
   activiteiten. De feed-URL staat in _config.yml (ical_feed) en moet
   CORS toestaan, omdat de browser hem rechtstreeks ophaalt.
   Beperkingen: alleen losse VEVENTs (geen RRULE-herhalingen). */
(function () {
  var box = document.getElementById("agenda");
  var section = document.getElementById("agenda-sectie");
  if (!box || !section) return;

  var feed = box.getAttribute("data-feed");
  if (!feed) {
    section.hidden = true;
    return;
  }

  function unfold(text) {
    // Regels die met spatie/tab beginnen horen bij de vorige regel (RFC 5545).
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
    if (/^\d{8}$/.test(value)) {
      return {
        date: new Date(+value.slice(0, 4), +value.slice(4, 6) - 1, +value.slice(6, 8)),
        allDay: true
      };
    }
    var m = value.match(/^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)?(Z?)$/);
    if (!m) return null;
    if (m[7] === "Z") {
      return {
        date: new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0))),
        allDay: false
      };
    }
    // Zonder Z: als lokale (Nederlandse) tijd behandelen.
    return {
      date: new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0)),
      allDay: false
    };
  }

  function parse(ics) {
    var events = [];
    var current = null;
    unfold(ics).split("\n").forEach(function (line) {
      if (line === "BEGIN:VEVENT") { current = {}; return; }
      if (line === "END:VEVENT") {
        if (current && current.start) events.push(current);
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
      if (name === "LOCATION") current.location = unescapeText(value);
    });
    return events;
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
      var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var events = parse(text)
        .filter(function (e) { return e.start && e.start.date >= (e.start.allDay ? todayStart : now); })
        .sort(function (a, b) { return a.start.date - b.start.date; })
        .slice(0, 8);

      if (!events.length) {
        box.textContent = "Er staan op dit moment geen komende activiteiten in de agenda.";
        return;
      }

      var ul = document.createElement("ul");
      ul.className = "agenda-lijst";
      events.forEach(function (e) {
        var li = document.createElement("li");
        var when = document.createElement("span");
        when.className = "agenda-datum";
        when.textContent = dayFmt.format(e.start.date) +
          (e.start.allDay ? "" : " · " + timeFmt.format(e.start.date) + " uur");
        li.appendChild(when);

        var what = document.createElement("span");
        what.className = "agenda-titel";
        what.textContent = e.summary || "Activiteit";
        li.appendChild(what);

        if (e.location) {
          var loc = document.createElement("span");
          loc.className = "agenda-locatie";
          loc.textContent = e.location;
          li.appendChild(loc);
        }
        ul.appendChild(li);
      });
      box.textContent = "";
      box.appendChild(ul);
    })
    .catch(function () {
      box.textContent = "De agenda kan op dit moment niet geladen worden.";
    });
})();
