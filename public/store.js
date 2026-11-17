// JM Coaches demo store. Same interface as the live app's server client
// (load / sync / poll / upload), but everything stays in this browser's
// localStorage so the prototype runs with no backend. First load copies the
// demo data from seed.js; "Reset demo data" on the Profile screen restores it.
window.Store = (function () {
  "use strict";
  const KEY = "jmcoaches-demo-state-v1";
  let onErr = null;

  const clone = o => JSON.parse(JSON.stringify(o));
  function read() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }

  async function load() {
    const saved = read();
    return saved && saved.schema === window.JM_SEED.schema ? saved : clone(window.JM_SEED);
  }
  function sync(S) {
    try { localStorage.setItem(KEY, JSON.stringify(S)); }
    catch (e) { console.warn("save failed", e); if (onErr) onErr(e); }
  }
  function poll() { /* single device: nothing to pull */ }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) { /* private mode */ } }

  // Photos are shrunk and kept inline as data URLs; the id is the URL itself.
  function upload(file) {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error("No file"));
      const fr = new FileReader();
      fr.onerror = () => reject(new Error("Couldn't read the file"));
      fr.onload = () => {
        if (!/^image\//.test(file.type)) return resolve({ id: fr.result, name: file.name, type: file.type, size: file.size });
        const im = new Image();
        im.onload = () => {
          const k = Math.min(1, 900 / Math.max(im.width, im.height)), c = document.createElement("canvas");
          c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
          c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
          resolve({ id: c.toDataURL("image/jpeg", 0.72), name: file.name, type: "image/jpeg", size: file.size });
        };
        im.onerror = () => reject(new Error("Couldn't read the photo"));
        im.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }
  return { load, sync, poll, upload, reset, onError: fn => { onErr = fn; } };
})();
