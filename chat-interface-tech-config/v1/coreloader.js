// /chat-interface-tech-config/v1/coreloader.js
(function () {
  // ensure root
  if (!document.getElementById("endora-chat-root")) {
    var root = document.createElement("div");
    root.id = "endora-chat-root";
    document.body.appendChild(root);
  }

  var cs = document.currentScript || (function(){var s=document.getElementsByTagName("script");return s[s.length-1];})();
  var attr = function(name, fb){ var v = cs.getAttribute(name); return v != null ? v : fb; };

  var startOpen = String(attr("data-start-open","false")).toLowerCase() === "true";

  // Merge config (data-* gewinnt)
  window.ENDORA_CONFIG = Object.assign({}, window.ENDORA_CONFIG || {}, {
    webhookUrl: attr("data-webhook", ""),            // Pflicht
    brandTitle: attr("data-brand", "Endora Concierge"),
    pageUrl: attr("data-page-url", ""),              // NEU: feste Landingpage-URL je Kunde
    startOpen: startOpen
  });

  if (!window.ENDORA_CONFIG.webhookUrl) {
    console.error("[Endora] loader.js: Missing data-webhook");
  }

  // Core nur einmal laden
  if (!document.querySelector('script[data-endora-core-loaded="1"]')) {
    var s = document.createElement("script");
    s.src = "/chat-interface-tech-config/v1/chat-interface-core.js";
    s.setAttribute("data-endora-core-loaded","1");
    document.head.appendChild(s);
  }
})();
