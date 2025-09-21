// /chat-interface-tech-config/v1/chat-interface-core.js
(() => {
  // ---- Config ----
  const CFG = Object.assign(
    {
      webhookUrl: "https://automation.eudemonia-coaching.de/webhook/477363f3-7434-4c31-92e5-fb4da3db4150",
      brandTitle: "Accommodation Concierge",
      startOpen: false
    },
    (typeof window !== "undefined" && window.ENDORA_CONFIG) || {}
  );
  if (!CFG.webhookUrl) {
    console.error("[Endora] Missing webhookUrl in ENDORA_CONFIG");
  }

  // ---- Helpers (safe, design-neutral) ----
  const urlRegex = /\b(https?:\/\/[^\s<>]+[^\s<\.)])/gi;
  const escapeHtml = (s) =>
    (s || "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const stripHtml = (raw) => {
    if (!raw) return "";
    let s = raw.replace(/<a\b[^>]*>(.*?)<\/a>/gi, (_m, inner) => inner);
    s = s.replace(/<[^>]+>/g, "");
    return s;
  };
  function linkifyNamesAndUrls(text) {
    let html = escapeHtml(text || "");
    const patterns = [
      /([A-ZÄÖÜ][\wÀ-ž&'’.\- ]{1,60})\s*(?:\(|（)\s*(https?:\/\/[^\s<>]+[^\s<\.)])\s*(?:\)|）)/g,
      /([A-ZÄÖÜ][\wÀ-ž&'’.\- ]{1,60})\s*(?:[–—-]|:)\s*(https?:\/\/[^\s<>]+[^\s<\.)])/g
    ];
    const makeAnchor = (name, url) => `${escapeHtml(name.trim())} <a href="${url}" target="_blank" rel="noopener noreferrer">Link</a>`;
    patterns.forEach((re) => {
      html = html.replace(re, (_m, name, url) => makeAnchor(name, url));
    });
    html = html
      .split(/(<a\b[^>]*>.*?<\/a>)/gi)
      .map((seg) => (/^<a\b/i.test(seg) ? seg : seg.replace(urlRegex, (u) => `<a href="${u}" target="_blank" rel="noopener noreferrer">Link</a>`)))
      .join("");
    return html;
  }
  function mdLightToHtml(text) {
    const t = (text || "").replace(/\r\n/g, "\n");
    const lines = t.split("\n");
    const chunks = [];
    let currList = null;
    const pushPara = (para) => { if (para.trim()) chunks.push({ type: "p", text: para.trim() }); };
    const pushList = () => { if (currList && currList.length) chunks.push({ type: "ul", items: currList }); currList = null; };
    for (let raw of lines) {
      const line = raw.trimEnd();
      const bullet = /^[-•]\s+(.+)$/.exec(line);
      if (bullet) { if (!currList) currList = []; currList.push(bullet[1].trim()); }
      else if (line === "") { pushList(); chunks.push({ type: "br" }); }
      else { pushList(); if (chunks.length && chunks[chunks.length - 1].type === "p") { chunks[chunks.length - 1].text += " " + line.trim(); } else { chunks.push({ type: "p", text: line.trim() }); } }
    }
    pushList();
    let html = "";
    for (const c of chunks) {
      if (c.type === "p") html += `<p>${linkifyNamesAndUrls(c.text)}</p>`;
      else if (c.type === "ul") html += "<ul>" + c.items.map((it) => `<li>${linkifyNamesAndUrls(it)}</li>`).join("") + "</ul>";
      else if (c.type === "br") html += '<p style="margin:.35rem 0;"></p>';
    }
    return html || linkifyNamesAndUrls(t);
  }
  const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };

  // ---- DOM bootstrap (inject minimal markup if page has none) ----
  function ensureMarkup() {
    const root = document.getElementById("endora-chat-root");
    const hasInline = document.getElementById("inline-messages");
    const hasPopup = document.getElementById("popup-messages");
    if (hasInline && hasPopup) return; // page provided its own markup/design

    // Minimal neutral markup (no global CSS). You can style via your page CSS.
    const wrap = root || document.body.appendChild(el("div", ""));
    wrap.innerHTML = `
      <div id="endora-inline" style="max-width:400px;margin:0 auto;">
        <div id="inline-messages"></div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <input id="inline-input" placeholder="Ask me anything..." style="flex:1;padding:10px;border-radius:8px;border:1px solid #333;background:#111;color:#fff"/>
          <button id="inline-send" style="padding:10px 14px;border:0;border-radius:8px;background:#ff1044;color:#000;font-weight:700;cursor:pointer">Send</button>
        </div>
      </div>
      <div id="endora-qr" style="display:flex;justify-content:center;margin:14px 0;">
        <a id="apt-qr"><img id="apt-qr-img" alt="QR"/></a>
      </div>
      <div id="bubble-btn" title="Open chat" style="position:fixed;right:16px;bottom:16px;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:#ff1044;color:#000;font-weight:900;cursor:pointer;z-index:9999">💬
        <span id="bubble-badge" style="display:none;position:absolute;top:-6px;right:-6px;background:#00ff88;color:#000;font-size:10px;font-weight:bold;padding:2px 6px;border-radius:10px">1</span>
      </div>
      <div id="popup-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(2px);z-index:9998"></div>
      <div id="popup-wrap" style="display:none;position:fixed;z-index:9999;left:50%;top:50%;transform:translate(-50%,-50%);width:min(92vw,420px);max-height:80vh;background:#0b0b0b;border:1px solid #222;border-radius:14px;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#ff1044;color:#000;font-weight:800">
          <span>💬 ${escapeHtml(CFG.brandTitle)}</span>
          <button id="popup-close" style="background:transparent;border:0;font-size:24px;font-weight:900;cursor:pointer;color:#000">×</button>
        </div>
        <div id="popup-messages" style="padding:14px;overflow:auto;max-height:52vh;display:flex;flex-direction:column;gap:8px;background:#0b0b0b"></div>
        <div style="display:flex;gap:8px;padding:12px;border-top:1px solid #222;background:#0b0b0b">
          <input id="popup-input" placeholder="Ask about check-in, amenities..." style="flex:1;padding:10px;border-radius:8px;border:1px solid #333;background:#111;color:#fff"/>
          <button id="popup-send" style="padding:10px 14px;border:0;border-radius:8px;background:#ff1044;color:#000;font-weight:800;cursor:pointer">Send</button>
        </div>
      </div>
    `;
  }

  function qs(id) { return document.getElementById(id); }

  // ---- Initialize (after DOM ready) ----
  function init() {
    ensureMarkup();

    const inline = {
      messages: qs("inline-messages"),
      input: qs("inline-input"),
      send: qs("inline-send")
    };
    const popup = {
      wrap: qs("popup-wrap"),
      overlay: qs("popup-overlay"),
      messages: qs("popup-messages"),
      input: qs("popup-input"),
      send: qs("popup-send"),
      closeBtn: qs("popup-close")
    };
    const bubbleBtn = qs("bubble-btn");
    const bubbleBadge = qs("bubble-badge");
    const QR_IMG = qs("apt-qr-img");
    const QR_LINK = qs("apt-qr");

    function openPopup() {
      if (popup.wrap) popup.wrap.style.display = "block";
      if (popup.overlay) popup.overlay.style.display = "block";
      if (bubbleBadge) bubbleBadge.style.display = "none";
      setTimeout(() => popup.input && popup.input.focus(), 20);
    }
    function closePopup() {
      if (popup.wrap) popup.wrap.style.display = "none";
      if (popup.overlay) popup.overlay.style.display = "none";
    }
    function togglePopup() {
      if (!popup.wrap) return;
      (popup.wrap.style.display === "block") ? closePopup() : openPopup();
    }
    bubbleBtn && bubbleBtn.addEventListener("click", togglePopup);
    popup.closeBtn && popup.closeBtn.addEventListener("click", closePopup);
    popup.overlay && popup.overlay.addEventListener("click", closePopup);
    QR_LINK && QR_LINK.addEventListener("click", (e) => { e.preventDefault(); openPopup(); });

    // QR target
    (function setQr() {
      if (!QR_IMG) return;
      const base = (location.href || "").split("#")[0];
      const url = new URL(base);
      url.searchParams.set("openChat", "1");
      const target = url.toString() + "#openChat";
      const src1 = "https://quickchart.io/qr?text=" + encodeURIComponent(target) + "&size=512&margin=8&ecLevel=H&format=png&dark=%23000000&light=%23ffffff00";
      const src2 = "https://chart.googleapis.com/chart?cht=qr&chs=512x512&chld=H|1&chl=" + encodeURIComponent(target);
      QR_IMG.onerror = function () {
        if (QR_IMG.dataset.fallback !== "1") {
          QR_IMG.dataset.fallback = "1";
          QR_IMG.src = src2;
        }
      };
      QR_IMG.src = src1;
    })();

    function tryOpenFromUrl() {
      const s = new URLSearchParams(location.search || "");
      if (location.hash === "#openChat" || s.get("openChat") === "1") openPopup();
    }
    window.addEventListener("hashchange", tryOpenFromUrl);
    tryOpenFromUrl();
    if (CFG.startOpen) openPopup();

    // render helpers
    function appendMsgHtml(target, html, sender) {
      const m = el("div", "msg " + sender);
      m.innerHTML = html;
      target.appendChild(m);
      target.scrollTop = target.scrollHeight;
    }
    function appendMsgText(target, text, sender) {
      const m = el("div", "msg " + sender);
      m.textContent = text;
      target.appendChild(m);
      target.scrollTop = target.scrollHeight;
    }
    function showTyping(target) {
      const wrap = el("div", "msg bot");
      const t = el("div", "typing");
      t.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
      wrap.appendChild(t);
      target.appendChild(wrap);
      target.scrollTop = target.scrollHeight;
      return wrap;
    }
    function removeTyping(node) { if (node && typeof node.remove === "function") node.remove(); }

    function addBotAll(rawText) {
      const clean = stripHtml(rawText || "");
      const html = mdLightToHtml(clean);
      inline.messages && appendMsgHtml(inline.messages, html, "bot");
      popup.messages && appendMsgHtml(popup.messages, html, "bot");
      if (popup.wrap && popup.wrap.style.display !== "block" && bubbleBadge) {
        bubbleBadge.style.display = "block";
        bubbleBadge.textContent = "1";
      }
    }
    function renderVoucherMessage(v) {
      const exp = v && v.expires_at ? new Date(v.expires_at).toLocaleString() : "";
      const html = `<p><strong>🎟️ Your voucher is ready</strong></p>${exp ? `<p>Valid until: ${exp}</p>` : ""}<p><img src="${v.qr_url}" alt="Voucher QR" style="width:180px;height:180px;border-radius:8px;display:block;margin-top:8px"/></p>`;
      inline.messages && appendMsgHtml(inline.messages, html, "bot");
      popup.messages && appendMsgHtml(popup.messages, html, "bot");
      if (popup.wrap && popup.wrap.style.display !== "block" && bubbleBadge) {
        bubbleBadge.style.display = "block";
        bubbleBadge.textContent = "1";
      }
    }

    addBotAll(`Welcome! 👋 I'm ${CFG.brandTitle}. Ask me anything about your stay.`);

    async function sendMessage(from) {
      const input = from === "popup" ? popup.input : inline.input;
      const text = (input && input.value || "").trim();
      if (!text) return;

      inline.messages && appendMsgText(inline.messages, text, "user");
      popup.messages && appendMsgText(popup.messages, text, "user");
      if (input) input.value = "";

      const typingInline = inline.messages && showTyping(inline.messages);
      const typingPopup = popup.messages && showTyping(popup.messages);

      try {
        const res = await fetch(CFG.webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain; q=0.9, */*; q=0.8"
          },
          body: JSON.stringify({
            question: text,
            // --- Mini-Patch: feste Page-URL aus Config, Fallback auf aktuelle URL ---
            url: (CFG.pageUrl && CFG.pageUrl.length ? CFG.pageUrl : window.location.href),
            meta: { source: from }
          })
        });
        const ct = (res.headers.get("content-type") || "").toLowerCase();
        let data = null, answer = "";
        if (ct.includes("application/json")) {
          try { data = await res.json(); } catch {}
        } else {
          try { answer = await res.text(); } catch {}
        }
        removeTyping(typingInline);
        removeTyping(typingPopup);

        if (data && (data.type === "voucher_issued" || data.qr_url)) {
          renderVoucherMessage(data);
        } else {
          answer = answer || (data?.answer || data?.text || data?.message || data?.content || "");
          addBotAll(answer || "No response received.");
        }
      } catch (e) {
        removeTyping(typingInline);
        removeTyping(typingPopup);
        addBotAll("Error sending message.");
      }
    }

    // wire events
    qs("inline-send") && qs("inline-send").addEventListener("click", () => sendMessage("inline"));
    qs("popup-send") && qs("popup-send").addEventListener("click", () => sendMessage("popup"));
    qs("inline-input") && qs("inline-input").addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage("inline"); });
    qs("popup-input") && qs("popup-input").addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage("popup"); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
