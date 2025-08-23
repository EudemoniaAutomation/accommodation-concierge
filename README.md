# accommodation-concierge README
Der Accommodation-Concierge ist ein leichter, stateless Chat-Assistant für Gäste-Landingpages. Er zieht sich lokalen (unterkunftsbezogenen) und globalen Kontext aus deinen Datenquellen, baut daraus einen sauberen Prompt und liefert die Antwort direkt als Klartext ins Chat-Frontend zurück.  ￼

⸻

🔎 Was das System macht (Kurzüberblick)
	1.	Webhook empfängt { question, url } aus dem Chat-Frontend.
	2.	Parse & Validate extrahiert die Frage und normalisiert die Seiten-URL zu landingPageId.
	3.	Lookup findet in deiner Lookup-Tabelle (z. B. Google Sheets) die passenden IDs/Konfigurationen (Local/Global/Links) zur landingPageId.
	4.	Build GPT Context (Local/Global) wandelt deine Inhalte in sauberes Markdown.
	5.	Prompt-Builder kombiniert Kontext + Nutzerfrage zu einem String.
	6.	OpenAI (Assistant oder Chat-Model) erzeugt die Antwort.
	7.	Respond to Webhook gibt nur Text zurück; das Frontend zeigt ihn direkt an.  ￼

⸻

🗂️ Repo-Aufbau (GitHub Pages)

Jede Kundenseite liegt als eigener Ordner mit einer eigenen index.html unter clients/:

accommodation-concierge/
└── clients/
    ├── testkunde.eudemonia-coaching/
    │   └── index.html
    └── testkunde2.eudemonia-coaching/
        └── index.html
  Regel: Ein Kunde = ein Ordner = eine index.html. Der Ordnername entspricht der Subdomain (z. B. testkunde.eudemonia-coaching). Die Seite ist dann erreichbar unter:
  https://concierge.eudemonia-coaching.de/clients/<ordnername>/

  
  Beispiel:
https://concierge.eudemonia-coaching.de/clients/testkunde2.eudemonia-coaching/  ￼

⸻

🚀 Quick Start: neue Kunden-Landingpage
	
 1.	Ordner anlegen
Lege unter clients/ einen neuen Ordner an, z. B. clients/dein-kunde.eudemonia-coaching/, und füge eine index.html hinein. Du kannst die index.html eines bestehenden Kunden kopieren und anpassen.  ￼
	
 2.	Webhook-URL eintragen
In deiner index.html steht im Script die Webhook-Produktiv-URL, z. B.:
const webhookUrl = "https://automation.eudemonia-coaching.de/webhook/chat-webhook";
Diese URL zeigt auf deinen n8n-Workflow (siehe unten „Backend / n8n“). Das Frontend sendet question und aktuelle url dorthin und erwartet Text zurück.  ￼
	
 3.	Lookup-Tabelle pflegen
Trage die Landingpage-URL (normalisiert) und die zugehörigen Local/Global IDs (z. B. Notion Page IDs) in deiner Lookup-Tabelle ein (siehe Abschnitt „Lookup & IDs“). Erst dann beantwortet der Bot Anfragen für diese Seite.  ￼
	
 4.	Commit & testen
Änderungen committen/pushen. Rufe anschließend
https://concierge.eudemonia-coaching.de/clients/<dein-ordner>/ auf und stelle eine Testfrage im Chat.
