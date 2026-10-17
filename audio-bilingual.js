/* HaryFi bilingual audio: German first, then the French translation. */
(function () {
  "use strict";
  if (window.__haryfiBilingualAudioLoaded) return;
  window.__haryfiBilingualAudioLoaded = true;

  const STYLE = `
    .haryfi-bilingual-audio{display:inline-flex;align-items:center;gap:.35rem;margin:.45rem .35rem .2rem 0;padding:.48rem .72rem;border:0;border-radius:10px;background:#173f9f;color:#fff;font:700 .88rem/1.2 system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 5px #0002}
    .haryfi-bilingual-audio:hover{background:#0f2f7d}
    .haryfi-bilingual-audio:focus-visible{outline:3px solid #f4b400;outline-offset:2px}
    .haryfi-audio-status{position:fixed;left:12px;bottom:12px;z-index:99999;max-width:calc(100vw - 24px);padding:9px 13px;border-radius:10px;background:#172033;color:#fff;font:500 13px system-ui,sans-serif;box-shadow:0 4px 18px #0003}
  `;
  const style = document.createElement("style");
  style.textContent = STYLE;
  document.head.appendChild(style);

  function cleanText(node, exclude) {
    const clone = node.cloneNode(true);
    clone.querySelectorAll("button,.haryfi-bilingual-audio,.fr,.translation,.audio,.haryfi-audio-status,script,style").forEach(el => el.remove());
    return (clone.innerText || clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  function chooseVoice(lang) {
    const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    const prefix = lang.toLowerCase().split("-")[0];
    return voices.find(v => v.lang.toLowerCase() === lang.toLowerCase())
      || voices.find(v => v.lang.toLowerCase().startsWith(prefix + "-"))
      || voices.find(v => v.lang.toLowerCase().startsWith(prefix));
  }

  let statusTimer;
  function status(message) {
    let el = document.querySelector(".haryfi-audio-status");
    if (!el) {
      el = document.createElement("div");
      el.className = "haryfi-audio-status";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.textContent = message;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => el.remove(), 3200);
  }

  function speakPair(german, french, button) {
    if (!("speechSynthesis" in window) || !window.SpeechSynthesisUtterance) {
      status("Die Audiofunktion wird in diesem Browser nicht unterstützt.");
      return;
    }
    window.speechSynthesis.cancel();
    button.disabled = true;
    button.textContent = "⏳ Audio läuft …";
    const utterances = [];
    if (german) {
      const de = new SpeechSynthesisUtterance(german);
      de.lang = "de-DE";
      de.rate = 0.85;
      const voice = chooseVoice("de-DE");
      if (voice) de.voice = voice;
      utterances.push(de);
    }
    if (french) {
      const fr = new SpeechSynthesisUtterance(french);
      fr.lang = "fr-FR";
      fr.rate = 0.95;
      const voice = chooseVoice("fr-FR");
      if (voice) fr.voice = voice;
      utterances.push(fr);
    }
    if (!utterances.length) {
      button.disabled = false;
      button.textContent = "🔊 Deutsch → Français";
      return;
    }
    utterances.forEach((u, i) => {
      u.onstart = () => status(i === 0 && german ? "🇩🇪 Deutsch" : "🇫🇷 Français");
      u.onerror = () => {
        button.disabled = false;
        button.textContent = "🔊 Deutsch → Français";
      };
    });
    utterances[utterances.length - 1].onend = () => {
      button.disabled = false;
      button.textContent = "🔊 Deutsch → Français";
    };
    utterances.forEach(u => window.speechSynthesis.speak(u));
  }

  function addButtons() {
    document.querySelectorAll(".fr,.translation").forEach(fr => {
      if (fr.dataset.haryfiAudioAdded === "1") return;
      const parent = fr.parentElement;
      if (!parent || parent.closest("button")) return;
      const german = cleanText(parent);
      const french = (fr.innerText || fr.textContent || "").replace(/\s+/g, " ").trim();
      if (!german && !french) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "haryfi-bilingual-audio";
      button.textContent = "🔊 Deutsch → Français";
      button.setAttribute("aria-label", "Zuerst Deutsch, danach Französisch anhören");
      button.addEventListener("click", () => speakPair(german, french, button));
      fr.dataset.haryfiAudioAdded = "1";
      fr.insertAdjacentElement("afterend", button);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addButtons, { once: true });
  } else addButtons();
  const observer = new MutationObserver(() => addButtons());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if ("speechSynthesis" in window) window.speechSynthesis.onvoiceschanged = () => {};
})();