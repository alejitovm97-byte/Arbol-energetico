/* Barra de navegación compartida — Árbol Energético.
   Inserta las 3 secciones + el botón de tema, y recuerda la elección en localStorage.
   Uso: <script src="nav.js" data-seccion="arbol|valoraciones|cartera"></script> en el <head> o arriba del body. */
(function () {
  var SECCIONES = [
    { id: "arbol", txt: "Árbol", href: "index.html" },
    { id: "valoraciones", txt: "Valoraciones", href: "valoraciones.html" },
    { id: "cartera", txt: "Cartera", href: "cartera.html" }
  ];
  var actual = (document.currentScript && document.currentScript.dataset.seccion) || "";

  // tema: lo aplicamos antes de pintar para que no haya parpadeo
  try {
    var guardado = localStorage.getItem("arbol-tema");
    if (guardado) document.documentElement.setAttribute("data-theme", guardado);
  } catch (e) { /* sin localStorage: queda el tema del sistema */ }

  function icono() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t === "dark") return "☀ claro";
    if (t === "light") return "☾ oscuro";
    return "◐ tema";
  }

  function montar() {
    if (document.querySelector(".nav-maestro")) return; // ya existe (página con nav propia)
    var nav = document.createElement("nav");
    nav.className = "nav-maestro";
    nav.setAttribute("aria-label", "Secciones del proyecto");
    SECCIONES.forEach(function (s) {
      var a = document.createElement("a");
      a.className = "nav-maestro__link" + (s.id === actual ? " activo" : "");
      a.href = s.href;
      a.textContent = s.txt;
      if (s.id === actual) a.setAttribute("aria-current", "page");
      nav.appendChild(a);
    });
    var b = document.createElement("button");
    b.className = "nav-maestro__tema";
    b.type = "button";
    b.textContent = icono();
    b.title = "Cambiar entre claro y oscuro";
    b.onclick = function () {
      var t = document.documentElement.getAttribute("data-theme");
      var oscuroPorSistema = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var nuevo = t ? (t === "dark" ? "light" : "dark") : (oscuroPorSistema ? "light" : "dark");
      document.documentElement.setAttribute("data-theme", nuevo);
      try { localStorage.setItem("arbol-tema", nuevo); } catch (e) { /* no se recuerda */ }
      b.textContent = icono();
    };
    nav.appendChild(b);
    document.body.insertBefore(nav, document.body.firstChild);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", montar);
  else montar();
})();
