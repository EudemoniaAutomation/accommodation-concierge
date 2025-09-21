 Endora Chat Interface · README

---

## 🇩🇪 Deutsch

### Überblick
Dieses Verzeichnis stellt die zentrale Technik für das Endora-Chat-Interface bereit.  
Es gibt drei Dateien, die unterschiedliche Aufgaben haben:

- **chat-interface-core.js**  
  Enthält die komplette Chat-Logik (Bubble, Popup, Webhook-Anbindung, QR-Codes, Voucher-Handling, Linkify, Markdown).

- **coreloader.js**  
  Ein kleiner Loader, der per `data-*` Attribute konfiguriert wird und automatisch den Core lädt.  
  Vorteil: Alle Seiten müssen nur ein einziges Script einbinden.

- **clientcodesnippet.html**  
  Beispiel-Snippet zum Copy/Paste für Kunden. Zeigt, wie der Loader eingebunden wird.

---

### Nutzung

**Empfohlen (über Loader):**
```html
<script
  src="https://YOUR-DOMAIN/chat-interface-tech-config/v1/coreloader.js"
  data-webhook="https://automation.eudemonia-coaching.de/webhook/xxxx"
  data-brand="Endora Concierge"
  data-page-url="https://YOUR-DOMAIN/clients/CLIENT_SLUG/"
  data-start-open="false">
</script>
```

**Alternative (direkter Core-Import):**
```html
<div id="endora-chat-root"></div>
<script>
  window.ENDORA_CONFIG = {
    webhookUrl: "https://automation.eudemonia-coaching.de/webhook/xxxx",
    brandTitle: "Endora Concierge",
    pageUrl: "https://YOUR-DOMAIN/clients/CLIENT_SLUG/", // optional
    startOpen: false
  };
</script>
<script src="https://YOUR-DOMAIN/chat-interface-tech-config/v1/chat-interface-core.js"></script>
```

---

## 🇬🇧 English

### Overview
This directory provides the central tech for the Endora chat interface.  
It contains three files with different purposes:

- **chat-interface-core.js**  
  Contains the full chat logic (bubble, popup, webhook integration, QR codes, voucher handling, linkify, markdown).

- **coreloader.js**  
  A small loader that is configured via `data-*` attributes and automatically loads the core.  
  Advantage: all pages only need to include one script.

- **clientcodesnippet.html**  
  Example snippet for copy/paste by clients. Shows how to include the loader.

---

### Usage

**Recommended (via loader):**
```html
<script
  src="https://YOUR-DOMAIN/chat-interface-tech-config/v1/coreloader.js"
  data-webhook="https://automation.eudemonia-coaching.de/webhook/xxxx"
  data-brand="Endora Concierge"
  data-page-url="https://YOUR-DOMAIN/clients/CLIENT_SLUG/"
  data-start-open="false">
</script>
```

**Alternative (direct core import):**
```html
<div id="endora-chat-root"></div>
<script>
  window.ENDORA_CONFIG = {
    webhookUrl: "https://automation.eudemonia-coaching.de/webhook/xxxx",
    brandTitle: "Endora Concierge",
    pageUrl: "https://YOUR-DOMAIN/clients/CLIENT_SLUG/", // optional
    startOpen: false
  };
</script>
<script src="https://YOUR-DOMAIN/chat-interface-tech-config/v1/chat-interface-core.js"></script>
```
