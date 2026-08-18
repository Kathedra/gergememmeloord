/* Themaknop (licht/donker) in de footer. Zonder eigen keuze volgt de
   site het apparaat via prefers-color-scheme in style.scss; deze knop
   zet een expliciete keuze als data-thema op <html> en onthoudt die
   in localStorage. Het inline script in default.html past de
   opgeslagen keuze al vóór het tekenen toe (geen lichtflits). */
(function () {
  var button = document.getElementById("thema-knop");
  if (!button) return;

  var root = document.documentElement;
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  // De keuze op <html>, of anders het apparaatthema.
  function currentTheme() {
    return root.getAttribute("data-thema") || (mq.matches ? "donker" : "licht");
  }

  function render() {
    var dark = currentTheme() === "donker";
    button.querySelector(".thema-zon").hidden = !dark;
    button.querySelector(".thema-maan").hidden = dark;
    button.querySelector(".thema-tekst").textContent = dark
      ? "Lichte weergave"
      : "Donkere weergave";
  }

  button.addEventListener("click", function () {
    var next = currentTheme() === "donker" ? "licht" : "donker";
    root.setAttribute("data-thema", next);
    try {
      localStorage.setItem("thema", next);
    } catch (e) {
      /* localStorage kan geblokkeerd zijn; de keuze geldt dan alleen
         voor deze pagina. */
    }
    render();
  });

  // Wisselt het apparaatthema terwijl er geen eigen keuze is, dan
  // moet het knoplabel meebewegen.
  if (mq.addEventListener) mq.addEventListener("change", render);

  render();
  button.hidden = false;
})();
