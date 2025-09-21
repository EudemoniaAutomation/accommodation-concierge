Endora Chat Interface – README

(Deutsch unten, English below)

🇩🇪 Deutsch
Zweck

Dieses Verzeichnis stellt die zentrale Technik für das Endora-Chat-Interface bereit.
Alle Landingpages (auch Kundenseiten) binden nur 1 Script ein und erhalten damit:

Chat-Bubble + Popup-Chat (synchron)

Webhook-POST an n8n

Typing-Indicator

Antwort-Parsing inkl. Voucher (QR-Code + expires_at)

Sicheres Sanitizing + Linkify + Light-Markdown

QR-Open-Flow (?openChat=1#openChat)

Fehlerbehandlung

Inhalte
/chat-interface-tech-config/v1/
  ├─ chat-interface-core.js   # gesamte Chat-Logik (zentrales Update)
  ├─ coreloader.js            # kleiner Loader, liest data-* und lädt den Core
  └─ clientcodesnippet.html   # Copy/Paste-Snippet für Kunden

Einbindung (empfohlen, über Loader)

Füge direkt vor </body> der Seite ein:

<script
  src="https://DEINE-DOMAIN/chat-interface-tech-config/v1/coreloader.js"
  data-webhook="https://automation.eudemonia-coaching.de/webhook/477363f3-7434-4c31-92e5-fb4da3db4150"
  data-brand="Endora Concierge"
  data-page-url="https://DEINE-DOMAIN/clients/MEIN_CLIENT/"  <!-- optional, aber empfohlen -->
  data-start-open="false">
</script>


Parameter (data-Attribute):

data-webhook (Pflicht): dein n8n-Webhook für diese Seite.

data-brand (optional): Titel im Chat-Header.

data-page-url (optional, empfohlen): feste Landingpage-URL als Kennung je Kunde.
→ Wird im Request als url gesendet. Fallback ist window.location.href.

data-start-open (optional): "true" öffnet den Chat direkt beim Laden.

Hinweis: Der Loader erzeugt bei Bedarf automatisch <div id="endora-chat-root"></div> und lädt einmalig chat-interface-core.js.

Alternative: Direkte Core-Einbindung (nur wenn nötig)

Wenn du ohne Loader arbeiten willst, ergänze in deiner Seite:

<div id="endora-chat-root"></div>
<script>
  window.ENDORA_CONFIG = {
    webhookUrl: "https://automation.eudemonia-coaching.de/webhook/477363f3-7434-4c31-92e5-fb4da3db4150",
    brandTitle: "Endora Concierge",
    pageUrl: "https://DEINE-DOMAIN/clients/MEIN_CLIENT/", // optional
    startOpen: false
  };
</script>
<script src="https://DEINE-DOMAIN/chat-interface-tech-config/v1/chat-interface-core.js"></script>

Versionierung & Cache

Breaking Changes → neuen Ordner v2/ anlegen und Seiten darauf umstellen.

Kleinere Fixes → gleiche Version, optional Cache-Bust:
/v1/coreloader.js?v=2025-09-21-1

Tests (Checkliste)

Script lädt ohne 404 (DevTools → Network).

Bubble sichtbar, Popup öffnet/ schließt, ?openChat=1#openChat öffnet Chat.

Nachricht → Request am Webhook, Antwort in Inline & Popup.

JSON-Antwort mit qr_url rendert Voucher inkl. QR.

Links im Bot-Text sind klickbar („Link“).

Bei data-page-url wird genau diese URL im Payload gesendet.

Typische Stolpersteine

CSP blockiert externe Scripts → Domain zur CSP erlauben.

Ad-/Script-Blocker → ggf. Kunden hinweisen.

Falscher Pfad: Prüfe, ob CNAME/.nojekyll korrekt sind und die URL stimmt.

🇬🇧 English
Purpose

This folder provides the central tech for the Endora chat interface.
Any landing page (including client sites) includes one script and gets:

Chat bubble + popup chat (synced)

Webhook POST to n8n

Typing indicator

Response parsing incl. vouchers (QR + expires_at)

Safe sanitizing + linkify + light-markdown

QR open flow (?openChat=1#openChat)

Error handling

Contents
/chat-interface-tech-config/v1/
  ├─ chat-interface-core.js   # full chat logic (central updates)
  ├─ coreloader.js            # tiny loader that reads data-* and loads the core
  └─ clientcodesnippet.html   # copy/paste snippet for customers

Recommended embed (via Loader)

Place right before </body>:

<script
  src="https://YOUR-DOMAIN/chat-interface-tech-config/v1/coreloader.js"
  data-webhook="https://automation.eudemonia-coaching.de/webhook/477363f3-7434-4c31-92e5-fb4da3db4150"
  data-brand="Endora Concierge"
  data-page-url="https://YOUR-DOMAIN/clients/MY_CLIENT/"  <!-- optional but recommended -->
  data-start-open="false">
</script>


Params (data attributes):

data-webhook (required): your n8n webhook for this page.

data-brand (optional): header title.

data-page-url (optional, recommended): fixed landing page URL as a per-client identifier.
→ Sent as url in the request. Fallback is window.location.href.

data-start-open (optional): "true" opens the chat on load.

Note: The loader auto-creates <div id="endora-chat-root"></div> if missing and loads chat-interface-core.js once.

Alternative: Direct Core embed (only if needed)

If you want to skip the loader, add:

<div id="endora-chat-root"></div>
<script>
  window.ENDORA_CONFIG = {
    webhookUrl: "https://automation.eudemonia-coaching.de/webhook/477363f3-7434-4c31-92e5-fb4da3db4150",
    brandTitle: "Endora Concierge",
    pageUrl: "https://YOUR-DOMAIN/clients/MY_CLIENT/", // optional
    startOpen: false
  };
</script>
<script src="https://YOUR-DOMAIN/chat-interface-tech-config/v1/chat-interface-core.js"></script>

Versioning & Cache

Breaking changes → create v2/ and switch pages to it.

Minor fixes → keep version, optionally cache-bust:
/v1/coreloader.js?v=2025-09-21-1

Tests (Checklist)

Script loads without 404 (DevTools → Network).

Bubble visible, popup open/close works; ?openChat=1#openChat opens chat.

Message → webhook request; response shows in inline & popup.

JSON response with qr_url renders voucher + QR.

Bot text links are clickable (“Link”).

With data-page-url, that exact URL is sent in the payload.

Common pitfalls

CSP blocks external scripts → allow your domain in CSP.

Ad/script blockers → inform customers if needed.

Wrong path: verify CNAME/.nojekyll and the exact script URL.
