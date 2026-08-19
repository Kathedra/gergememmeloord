/* Foto bij een mededeling vergroot bekijken. Zonder dit script opent
   de link gewoon het fotobestand (en zoomt de browser zelf); met dit
   script komt de foto in een overlay over de pagina, waar één klik
   heen en weer schakelt tussen "past op het scherm" en werkelijke
   grootte (dan is de overlay scrollbaar). Sluiten: Escape, de knop,
   of een klik naast de foto. */
(function () {
  var link = document.querySelector(".mededeling-foto");
  if (!link) return;

  var overlay = null;
  var vorigeFocus = null;

  function sluit() {
    if (!overlay) return;
    document.removeEventListener("keydown", opToets);
    document.body.classList.remove("overlay-open");
    overlay.remove();
    overlay = null;
    if (vorigeFocus) vorigeFocus.focus();
  }

  function opToets(e) {
    if (e.key === "Escape") sluit();
  }

  function open(e) {
    e.preventDefault();
    vorigeFocus = document.activeElement;

    overlay = document.createElement("div");
    overlay.className = "foto-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Foto bij de mededeling");

    var sluitknop = document.createElement("button");
    sluitknop.type = "button";
    sluitknop.className = "foto-sluiten";
    sluitknop.setAttribute("aria-label", "Sluiten");
    sluitknop.textContent = "×";
    sluitknop.addEventListener("click", sluit);

    var foto = document.createElement("img");
    foto.src = link.getAttribute("href");
    var origineel = link.querySelector("img");
    foto.alt = origineel ? origineel.alt : "";
    foto.addEventListener("click", function (klik) {
      klik.stopPropagation();
      overlay.classList.toggle("ingezoomd");
    });

    /* Een klik naast de foto sluit; op de foto zelf niet (die zoomt). */
    overlay.addEventListener("click", sluit);
    overlay.appendChild(sluitknop);
    overlay.appendChild(foto);
    document.body.appendChild(overlay);
    document.body.classList.add("overlay-open");
    document.addEventListener("keydown", opToets);
    sluitknop.focus();
  }

  link.addEventListener("click", open);
})();
