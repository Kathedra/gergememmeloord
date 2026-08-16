/* Toont mededelingen op de homepage alleen binnen hun periode
   (data-vanaf t/m data-tot, JJJJ-MM-DD). De controle gebeurt in de
   browser, omdat GitHub Pages alleen bij een push opnieuw bouwt en
   een verlopen mededeling anders zichtbaar zou blijven. */
(function () {
  var section = document.getElementById("mededelingen");
  if (!section) return;

  var now = new Date();
  var shown = 0;

  section.querySelectorAll(".mededeling").forEach(function (el) {
    var vanaf = el.getAttribute("data-vanaf");
    var tot = el.getAttribute("data-tot");
    var visible = true;
    if (vanaf && now < new Date(vanaf + "T00:00:00")) visible = false;
    if (tot && now > new Date(tot + "T23:59:59")) visible = false;
    if (visible) {
      el.hidden = false;
      shown++;
    }
  });

  if (shown > 0) section.hidden = false;
})();
