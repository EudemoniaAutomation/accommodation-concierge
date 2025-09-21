// /chat-interface-tech-config/v1/coreloader.js
(function () {
  var cur = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  var d = (cur && cur.dataset) || {};
  var webhook = d.webhook || "";
  var brand = d.brand || "Accommodation Concierge";
  var startOpen = (d.startOpen === "true" || d.startOpen === "1");
  // Kanonische URL: bevorzugt data-page-url, sonst origin+pathname
  var pageUrl = d.pageUrl || (location.origin + location.pathname);

  // Merge in global config (Seiten können ENDORA_CONFIG vorher anlegen)
  window.ENDORA_CONFIG = Object.assign({}, window.ENDORA_CONFIG || {}, {
    webhookUrl: webhook,
    brandTitle: brand,
    startOpen: startOpen,
    pageUrl: pageUrl
  });

  // Core laden
  var s = document.createElement("script");
  s.src = "/chat-interface-tech-config/v1/chat-interface-core.js";
  s.async = true;
  document.head.appendChild(s);
})();
