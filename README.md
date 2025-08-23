# accommodation-concierge README
<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Accommodation-Concierge – README</title>
<style>
  :root{
    --ink:#e9f1ee; --muted:#aab7b1; --bg:#0f1211; --card:#161a19; --line:#23302b; --acc:#bff2da; --acc-ink:#0b1b15;
  }
  *{box-sizing:border-box}
  body{margin:0; font:16px/1.55 system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial; color:var(--ink); background:linear-gradient(180deg,rgba(191,242,218,.07),rgba(191,242,218,.00)), var(--bg)}
  a{color:var(--acc); text-decoration:none}
  a:hover{text-decoration:underline}
  .wrap{max-width:1000px; margin:48px auto; padding:0 20px}
  .hero{background:var(--card); border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:24px 22px; box-shadow:0 8px 30px rgba(0,0,0,.25)}
  h1{margin:0 0 6px; font-size:32px}
  .lead{color:var(--muted); margin:0 0 8px}
  .badgebar{display:flex; flex-wrap:wrap; gap:8px; margin-top:12px}
  .pill{display:inline-flex; align-items:center; gap:.45rem; padding:6px 12px; border-radius:999px; color:var(--acc); border:1px solid rgba(191,242,218,.25); background:rgba(191,242,218,.10); font-weight:700}
  section{margin-top:28px}
  h2{font-size:22px; margin:0 0 10px}
  h3{font-size:18px; margin:18px 0 10px}
  .card{background:var(--card); border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:18px; margin:14px 0}
  pre{margin:10px 0; overflow:auto; border-radius:10px; border:1px solid rgba(255,255,255,.08); background:#0c0f0e; padding:14px}
  code, pre code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:13px}
  .cols{display:grid; gap:16px}
  @media(min-width:900px){ .cols{grid-template-columns:1fr 1fr} }
  .list{padding-left:18px}
  .mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .structure code{white-space:pre}
  .hint{color:var(--muted)}
  .ascii{white-space:pre; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; background:#0c0f0e; padding:12px; border:1px solid rgba(255,255,255,.08); border-radius:10px}
  .hr{height:1px; background:linear-gradient(90deg,transparent, var(--line), transparent); margin:26px 0}
  .foot{color:var(--muted); font-size:14px; margin-top:24px}
</style>
</head>
<body>
  <div class="wrap">
    <header class="hero">
      <h1>Accommodation-Concierge – README</h1>
      <p class="lead">
        Leichtgewichtiges, mandantenfähiges Chat-Widget für Unterkünfte. Statische Landingpages (GitHub Pages)
        + <strong>n8n</strong> Workflow + <strong>Notion</strong> als Kontext + <strong>OpenAI</strong> Antwort.
      </p>
      <div class="badgebar">
        <span class="pill">🔒 URL-Gatekeeping (Kostenkontrolle)</span>
        <span class="pill">🧠 Local &amp; Global Kontext</span>
        <span class="pill">💬 Klartext-Response</span>
        <span class="pill">🔗 Linkify im Chat</span>
        <span class="pill">🗂️ GitHub Pages Mandanten</span>
        <span class="pill">🧾 Apps Script Backup</span>
      </div>
    </header>

    <section>
      <h2>✨ Features</h2>
      <ul class="list">
        <li>Mandantenfähig über Pfade <span class="mono">/clients/&lt;kunde&gt;/</span></li>
        <li>Striktes <strong>URL-Gatekeeping</strong> (keine AI-Kosten ohne Whitelisting in der DB)</li>
        <li>Kontext aus <strong>Local</strong> &amp; <strong>Global</strong> Notion-Datenbanken</li>
        <li>Frontend-Chat liest <strong>Klartext</strong> <em>oder</em> JSON → zeigt nur den Antwort-String</li>
        <li>Klickbare Links im Chat (Pretty-Label, Farbe <span class="mono">#bff2da</span>)</li>
        <li>Apps Script: URL-Normalisierung + tägliches <strong>CSV-Backup</strong> in Google Drive (Ein-Datei-Retention)</li>
      </ul>
    </section>

    <section>
      <h2>🏗️ Architektur</h2>
      <div class="ascii">
Client → Webhook → Parse/Validate → Lookup Sheet → IF?
                                 ↘ (No) → Respond "URL nicht in DB"

IF True → Notion (Local+Global) → Build GPT Prompt → OpenAI → Respond Klartext
      </div>
    </section>

    <section>
      <h2>📁 Repository-Struktur (Vorschlag)</h2>
      <div class="card structure">
        <code>accommodation-concierge/
├─ CNAME                          # Custom Domain (z.B. concierge.eudemonia-coaching.de)
├─ index.html                     # Optionaler Hub/Info (kann leer/Minimal)
├─ clients/
│  └─ &lt;kunde.domain&gt;/
│     └─ index.html              # Konkrete Kunden-Landingpage (Widget)
├─ README.md                      # Diese Datei
└─ docs/                          # (optional) Screenshots/Instruktionen
</code>
      </div>
      <p class="hint"><strong>Wichtig:</strong> Pro Kunden-Landingpage genau <em>eine</em> <span class="mono">index.html</span> im Ordner <span class="mono">clients/&lt;kunde.domain&gt;/</span>.</p>
    </section>

    <section>
      <h2>🚀 Quick Start</h2>
      <ol class="list">
        <li><strong>GitHub Pages aktivieren</strong> → Repo <em>Settings → Pages</em> → Branch <em>main</em> / Folder <em>root</em> → Save. <br/> <span class="hint">CNAME Datei im Repo mit deiner Domain (z.B. <span class="mono">concierge.eudemonia-coaching.de</span>).</span></li>
        <li><strong>Kunden-Seite anlegen</strong> → Ordner <span class="mono">clients/&lt;kunde.domain&gt;/index.html</span> erstellen → Widget-HTML einfügen.</li>
        <li><strong>Google Sheet pflegen (DB Lookup ID)</strong> → Spalte A: <span class="mono">landingPageId</span> (siehe Normalisierung) • B: Local DB Page ID • D: Global DB Page ID.<br/><span class="hint">Block-IDs (C/E) werden per Apps Script automatisch formatiert.</span></li>
        <li><strong>n8n-Webhook</strong> prüfen → <em>Respond immediately</em> aktiv • CORS erlaubt • Content-Type JSON.</li>
        <li><strong>Testen</strong> → URL in Sheet: vollständiger Flow • URL nicht in Sheet: „Diese URL ist nicht in unserer Datenbank.“</li>
      </ol>
    </section>

    <section>
      <h2>🔌 Frontend – Request/Response</h2>
      <div class="cols">
        <div class="card">
          <h3>Request (vom Widget)</h3>
<pre><code class="language-json">POST /webhook/chat-webhook
Content-Type: application/json

{
  "question": "Habt ihr heute Restaurant-Tipps?",
  "url": "https://concierge.example.com/clients/testkunde.example/#openChat",
  "meta": { "apartment": "Ihr Apartment", "source": "inline" }
}
</code></pre>
        </div>
        <div class="card">
          <h3>Response (vom n8n-Webhook)</h3>
          <ul class="list">
            <li><strong>True-Pfad</strong>: <span class="mono">text/plain</span> (empfohlen) <em>oder</em> JSON (mit Feld <span class="mono">answer</span>)</li>
            <li><strong>False-Pfad</strong>: Klartext: <span class="mono">Diese URL ist nicht in unserer Datenbank.</span></li>
          </ul>
          <p class="hint">Das Widget liest <em>beides</em> (JSON/Text) und zeigt nur den String an.</p>
        </div>
      </div>
    </section>

    <section>
      <h2>🔎 URL-Normalisierung (zwei Ebenen)</h2>
      <h3>1) n8n (Parse &amp; Validate Request)</h3>
      <p><strong>Ziel-Key:</strong> <span class="mono">domain[/first | clients/first]</span>, wobei <u>abschließende 1-Zeichen-Segmente</u> entfernt werden (nur wenn der Pfad mehrere Segmente hat).</p>
      <div class="card">
<pre><code class="language-text">https://concierge.eudemonia-coaching.de/clients/testkunde.eudemonia-coaching/#openChat
→ concierge.eudemonia-coaching.de/clients/testkunde.eudemonia-coaching

https://foo.bar/a
→ foo.bar/a      (einziges Segment bleibt erhalten)

https://foo.bar/x/a
→ foo.bar/x      (letztes 1-Zeichen-Segment entfernt)

https://login.ionos.de/?redirect_url=...
→ login.ionos.de (Query/Redirect abgeschnitten)
</code></pre>
      </div>

      <h4>Copy-Paste Code (n8n Code-Node „Parse &amp; Validate Request“)</h4>
      <div class="card">
<pre><code class="language-js">// Parse & Normalize (robust, minimal & kompatibel)

const question =
  typeof $json.body?.question === 'string' ? $json.body.question.trim() :
  typeof $json.params?.query?.question === 'string' ? $json.params.query.question.trim() :
  typeof $json.query?.question === 'string' ? $json.query.question.trim() :
  null;

const fullUrl =
  typeof $json.body?.url === 'string' ? $json.body.url.trim() :
  typeof $json.params?.query?.url === 'string' ? $json.params.query.url.trim() :
  typeof $json.query?.url === 'string' ? $json.query.url.trim() :
  $json.headers?.referer || $json.headers?.origin;

let landingPageId = null;
const debug = { fullUrl };

if (typeof fullUrl === 'string') {
  try {
    const stripped = fullUrl.replace(/[?#].*$/, ''); // Query & Hash weg
    const match = stripped.match(/^https?:\/\/(?:www\.)?([^\/]+)(\/.*)?$/i);

    if (match) {
      const domain = match[1].toLowerCase();
      const rawPath = (match[2] || '');
      const cleanPath = rawPath.replace(/\/+/g, '/').replace(/^\/+|\/+$/g, '').toLowerCase();
      let segs = cleanPath.split('/').filter(Boolean);

      // letztes 1-Zeichen-Segment entfernen (nur wenn mehrere Segmente vorhanden)
      if (segs.length > 1 && segs[segs.length - 1].length === 1) segs.pop();

      let keySegs;
      if (segs[0] === 'clients') keySegs = segs.slice(0, 2);  // clients/&lt;kunde&gt;
      else keySegs = segs.slice(0, 1);                        // /&lt;first&gt;

      const keyPath = keySegs.join('/');
      landingPageId = keyPath ? `${domain}/${keyPath}` : domain;

      debug.segments = segs;
      debug.key_segments = keySegs;
      debug.normalized = landingPageId;
    } else {
      debug.error = 'Regex match failed';
    }
  } catch (err) {
    debug.error = 'URL parsing failed';
    debug.reason = String(err?.message || err);
  }
}

if (!question || !landingPageId) {
  return [{ json: { error: 'Missing question or landingPageId', details: { question, landingPageId, fullUrl, debug } } }];
}

return [{ json: { question, landingPageId, debug } }];
</code></pre>
      </div>

      <h3>2) Google Apps Script (Spalte A im Sheet)</h3>
      <p>Bewahrt denselben Key, entfernt Duplikate, säubert Query/Hash/Mehrfach-Slashes, Sonderfall <span class="mono">login.ionos.de</span>.</p>
    </section>

    <section>
      <h2>🧠 n8n: Node-Aufbau (Minimal)</h2>
      <ol class="list">
        <li><strong>Webhook (Trigger)</strong> → Respond: <em>Respond immediately</em>, CORS <span class="mono">*</span>, JSON</li>
        <li><strong>Code: Parse &amp; Validate Request</strong> → liefert <span class="mono">{ question, landingPageId }</span></li>
        <li><strong>Lookup DB ID (Google Sheets)</strong> → sucht Zeile mit <span class="mono">landingPageId</span></li>
        <li><strong>IF: URL erlaubt?</strong>
          <ul class="list">
            <li>Bedingung 1: <span class="mono">{{ $items('Lookup DB ID').length }}</span> is greater than 0</li>
            <li><em>UND</em> Bedingung 2: <span class="mono">{{ ($items('Lookup DB ID')[0].json.localDbId || '').trim().length }}</span> is greater than 0</li>
            <li><strong>True</strong> → weiter (Notion → Build GPT Prompt → OpenAI)</li>
            <li><strong>False</strong> → <em>Respond to Webhook (If no DB)</em> mit <span class="mono">text/plain</span> „Diese URL ist nicht in unserer Datenbank.“</li>
          </ul>
        </li>
        <li><strong>Build GPT Context</strong> → erzeugt EIN Feld <span class="mono">prompt</span>:
<pre><code class="language-text">### CONTEXT
…Zusammengefasster Kontext…

### USER QUESTION
…Frage…
</code></pre>
        </li>
        <li><strong>Message a Model / Assistant</strong> → <em>Message Content</em> = <span class="mono">{{ $json.prompt }}</span></li>
        <li><strong>Respond to Webhook (True)</strong> → <span class="mono">text/plain</span> mit Antwortstring</li>
      </ol>
    </section>

    <section>
      <h2>📒 Google Sheet &amp; Apps Script</h2>

      <h3>Spalten</h3>
      <ul class="list">
        <li><strong>A</strong>: <span class="mono">landingPageId</span> (normalisierter Key)</li>
        <li><strong>B</strong>: <span class="mono">localDbId</span> (Notion Page ID) → <strong>C</strong>: <span class="mono">localBlockId</span> (auto)</li>
        <li><strong>D</strong>: <span class="mono">globalDbId</span> (Notion Page ID) → <strong>E</strong>: <span class="mono">globalBlockId</span> (auto)</li>
      </ul>

      <h3>Apps Script – Vollständiger Code</h3>
      <div class="card">
<pre><code class="language-js">/***********************
 * onEdit-Handler
 ***********************/
function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var editedRange = e.range;
  var col = editedRange.getColumn();
  var row = editedRange.getRow();

  if (row > 1) {
    if (col === 1) normalizeAndRemoveDuplicates(sheet);          // A: landingPageId
    if (col === 2) convertToBlockId(sheet, row, 2, 3);            // B → C
    if (col === 4) convertToBlockId(sheet, row, 4, 5);            // D → E
  }
}

/********************************************
 * Normalize LandingPageId + Duplikate meiden
 ********************************************/
function normalizeAndRemoveDuplicates(sheet) {
  var range = sheet.getRange("A2:A" + sheet.getLastRow());
  var values = range.getValues();

  var normalizedSet = new Set();
  var cleaned = values.map(function (row) {
    var url = row[0];
    if (!url || typeof url !== "string") return [""];

    var raw = url.trim().toLowerCase();

    // Query/Hash entfernen
    raw = raw.replace(/[?#].*$/, "");
    // Schema & www. entfernen, Mehrfach-Slashes reduzieren
    raw = raw.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/+/g, "/");
    // login.ionos.de Sonderfall: nur Domain behalten
    if (raw.indexOf("login.ionos.de") === 0) raw = "login.ionos.de";

    raw = raw.replace(/^\/+|\/+$/g, ""); // Leading/Trailing Slashes
    var segs = raw.split("/").filter(Boolean);

    // letztes 1-Zeichen-Segment entfernen (nur wenn mehrere Segmente vorhanden)
    if (segs.length > 1 && segs[segs.length - 1].length === 1) segs.pop();

    var domain = segs.shift() || "";
    var keySegs;
    if (segs[0] === "clients") keySegs = segs.slice(0, 2);
    else keySegs = segs.slice(0, 1);

    var key = domain + (keySegs.length ? "/" + keySegs.join("/") : "");

    if (!key || normalizedSet.has(key)) return [""];
    normalizedSet.add(key);
    return [key];
  });

  range.setValues(cleaned);
}

/********************************************
 * Convert Page ID → Block ID Format
 ********************************************/
function convertToBlockId(sheet, row, sourceCol, targetCol) {
  var rawId = sheet.getRange(row, sourceCol).getValue();
  if (typeof rawId !== "string" || rawId.trim() === "") return;

  var clean = rawId.replace(/-/g, "").trim();
  if (clean.length < 32) return;

  var blockId =
    clean.slice(0, 8) + "-" +
    clean.slice(8, 12) + "-" +
    clean.slice(12, 16) + "-" +
    clean.slice(16, 20) + "-" +
    clean.slice(20);

  sheet.getRange(row, targetCol).setValue(blockId);
}

/* =========================
   BACKUP – KONSTANTEN
   ========================= */
var BACKUP_FOLDER_ID = "1Plz-98lOr5Vc_Gyy7uCUsC2dpURaxkT_";
var BACKUP_FILE_NAME = "DB_ID_backup.csv";
var FAILURE_EMAIL     = "eudemonia.infinity@gmail.com";

/********************************************
 * CSV bauen
 ********************************************/
function sheetToCsv_(sheet) {
  var values = sheet.getDataRange().getValues();
  return values.map(function (row) {
    return row.map(function (cell) {
      var s = cell == null ? "" : String(cell);
      if (/[",\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
      return s;
    }).join(",");
  }).join("\n");
}

/********************************************
 * Backup-Datei finden/erstellen
 ********************************************/
function getOrCreateBackupFile_(folder) {
  var files = folder.getFilesByName(BACKUP_FILE_NAME);
  if (files.hasNext()) return files.next();
  return folder.createFile(BACKUP_FILE_NAME, "", MimeType.CSV);
}

/********************************************
 * Tägliches Backup (überschreibt CSV)
 ********************************************/
function runDailyBackup() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var csv = sheetToCsv_(sheet);

    var folder = DriveApp.getFolderById(BACKUP_FOLDER_ID);
    var file = getOrCreateBackupFile_(folder);
    file.setContent(csv);
    file.setDescription("Automatisches Backup – zuletzt aktualisiert: " + new Date().toISOString());
  } catch (err) {
    try {
      MailApp.sendEmail(
        FAILURE_EMAIL,
        "❗ Google Sheets Backup fehlgeschlagen",
        "Fehler:\n" + (err && err.stack ? err.stack : String(err))
      );
    } catch (_) {}
    throw err;
  }
}

/********************************************
 * Trigger einmalig anlegen (z. B. 03:30 CET)
 ********************************************/
function setupBackup() {
  var exists = ScriptApp.getProjectTriggers().some(function (t) {
    return t.getHandlerFunction && t.getHandlerFunction() === "runDailyBackup";
  });
  if (!exists) {
    ScriptApp.newTrigger("runDailyBackup")
      .timeBased()
      .atHour(3)
      .nearMinute(30)
      .everyDays(1)
      .create();
  }
}

/********************************************
 * TEST: Ordner-Schreibrechte prüfen (einmalig)
 ********************************************/
function testWriteToFolder() {
  var folder = DriveApp.getFolderById(BACKUP_FOLDER_ID);
  var file = folder.createFile("permission_check.txt", "OK @ " + new Date().toISOString(), MimeType.PLAIN_TEXT);
  Utilities.sleep(3000);
  try { file.setTrashed(true); } catch (_) {}
}
</code></pre>
      </div>

      <h3><code>appsscript.json</code> (Scopes)</h3>
      <div class="card">
<pre><code class="language-json">{
  "timeZone": "Europe/Berlin",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
    "https://www.googleapis.com/auth/script.external_request",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/script.send_mail"
  ]
}
</code></pre>
      </div>

      <p><strong>Einrichtung:</strong> In Apps Script Editor zuerst <span class="mono">setupBackup()</span> einmal ausführen (legt Trigger an).
         Optional <span class="mono">testWriteToFolder()</span> zum Autorisieren &amp; Drive-Zugriff prüfen.</p>
    </section>

    <section>
      <h2>➕ Neuer Mandant – Checkliste</h2>
      <ol class="list">
        <li>Ordner &amp; Seite: <span class="mono">clients/&lt;kunde.domain&gt;/index.html</span> erstellen, Widget einfügen.</li>
        <li>Sheet: <span class="mono">landingPageId</span>-Key eintragen (Normalisierung beachten), <span class="mono">localDbId</span>/<span class="mono">globalDbId</span> setzen.</li>
        <li>Notion: Kundenseite(n) anlegen; Page IDs ins Sheet (B/D).</li>
        <li>n8n: Webhook-URL stimmt? <em>Respond immediately</em> aktiv? IF-Gate korrekt?</li>
        <li>Test:
          <ul class="list">
            <li>Enterprise/Kundenseite in DB → GPT-Antwort erscheint im Chat.</li>
            <li>Kundenseite nicht in DB → „Diese URL ist nicht in unserer Datenbank.“</li>
            <li>Danach Kundenseite in DB eintragen und erneut testen.</li>
          </ul>
        </li>
      </ol>
    </section>

    <section>
      <h2>🔒 Sicherheit &amp; Kostenkontrolle</h2>
      <ul class="list">
        <li><strong>Gatekeeping</strong>: Ohne DB-Treffer kein AI-Call → schützt vor Spam/Kosten.</li>
        <li><strong>CORS</strong>: Webhook auf <span class="mono">*</span> setzen, falls mehrere Domains genutzt werden.</li>
        <li><strong>Links</strong>: Im Prompt nur Links verwenden, die der Kontext liefert (kein „Erfinden“).</li>
      </ul>
    </section>

    <section>
      <h2>🧰 Troubleshooting (Kurz)</h2>
      <ul class="list">
        <li><em>„Message content must be non-empty“</em> → Im AI-Node <strong>Message Content</strong> auf <span class="mono">{{ $json.prompt }}</span> mappen.</li>
        <li>Chat zeigt <em>„Keine Antwort erhalten.“</em> → Webhook-Response auf <span class="mono">text/plain</span> stellen (True <u>und</u> False Pfad).</li>
        <li>IF-Node triggert True bei leeren Lookups → „Always output data“ <strong>aus</strong>; Bedingung (length&gt;0 UND localDbId vorhanden).</li>
      </ul>
    </section>

    <section>
      <h2>🐳 Deployment (Server, Docker)</h2>
      <div class="card">
<pre><code class="language-bash"># Backup & Restart (im Compose-Verzeichnis)
docker compose stop
tar -czf _backups/n8n-$(date +%Y%m%d-%H%M).tar.gz .
docker compose up -d

# Update n8n
docker compose pull
docker compose up -d
</code></pre>
      </div>
    </section>

    <div class="hr"></div>
    <section class="foot">
      <p><strong>Lizenz:</strong> MIT (bei Bedarf anpassen).</p>
      <p><strong>Contributing:</strong> Issues &amp; PRs willkommen. Bitte reproduzierbare Schritte &amp; Logs beilegen.</p>
    </section>
  </div>
</body>
</html>
