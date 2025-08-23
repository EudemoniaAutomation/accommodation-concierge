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

