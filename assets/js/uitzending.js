/* Toont de uitzending-knop op de homepage alleen binnen zijn periode
   (data-vanaf t/m data-tot, JJJJ-MM-DD) — zelfde mechaniek als
   mededelingen.js, en om dezelfde reden in de browser: GitHub Pages
   bouwt alleen bij een push, en een verlopen knop moet vanzelf
   verdwijnen. */
(function () {
  var now = new Date();
  document.querySelectorAll(".uitzending-knop").forEach(function (el) {
    var vanaf = el.getAttribute("data-vanaf");
    var tot = el.getAttribute("data-tot");
    if (vanaf && now < new Date(vanaf + "T00:00:00")) return;
    if (tot && now > new Date(tot + "T23:59:59")) return;
    el.hidden = false;
  });
})();
