// /chat-interface-tech-config/v1/coreloader.js
(function () {
  var cur = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();

  var d = (cur && cur.dataset) || {};
  var webhook   = d.webhook || "";
  var brand     = d.brand   || "Endora – digitaler Concierge";
  var startOpen = (d.startOpen === "true" || d.startOpen === "1");

  // Kanonische URL automatisch aus der aktuellen Seite ableiten
  function canonicalFromHere() {
    try {
      var u = new URL(window.location.href);
      u.search = "";   // Query weg
      u.hash   = "";   // Hash weg
      return u.origin + u.pathname; // origin + pathname
    } catch (_) {
      // Fallback, falls URL-API nicht verfügbar
      var raw = (window.location.href || "");
      return raw.split("#")[0].split("?")[0];
    }
  }

  var pageUrl = d.pageUrl || canonicalFromHere();

  // Globale Config mergen (falls Seite ENDORA_CONFIG definiert hat)
  window.ENDORA_CONFIG = Object.assign({}, window.ENDORA_CONFIG || {}, {
    webhookUrl: webhook,
    brandTitle: brand,
    startOpen:  startOpen,
    pageUrl:    pageUrl
  });

  // Core laden
  var s = document.createElement("script");
  s.src = "/chat-interface-tech-config/v1/chat-interface-core.js";
  s.async = true;
  document.head.appendChild(s);
})();
