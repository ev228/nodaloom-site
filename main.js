// ============== TWEAKS DEFAULTS ==============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tone": "paper",
  "heroMode": "monument",
  "spine": true,
  "sectionLabels": "roman",
  "fragmentColumn": true,
  "showVideo": true
}/*EDITMODE-END*/;

const tweaks = { ...TWEAK_DEFAULTS };

// ============== I18N ==============
const supportedLangs = ['es', 'en'];
let currentLang = localStorage.getItem('tesyra.lang') || 'en';
if (!supportedLangs.includes(currentLang)) currentLang = 'en';

function applyLang(lang) {
  if (!supportedLangs.includes(lang)) return;
  currentLang = lang;
  localStorage.setItem('tesyra.lang', lang);
  document.documentElement.lang = lang;
  const dict = window.DICT && window.DICT[lang];
  if (!dict) return;
  document.querySelectorAll('[data-key]').forEach((el) => {
    const key = el.getAttribute('data-key');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.querySelectorAll('.lang-switch button').forEach((b) => {
    b.classList.toggle('on', b.dataset.lang === lang);
  });
}
document.querySelectorAll('.lang-switch button').forEach((b) => {
  b.addEventListener('click', () => applyLang(b.dataset.lang));
});

// ============== TWEAKS APPLICATION ==============
function applyTweaks() {
  const r = document.documentElement;

  // Tone — overall canvas
  if (tweaks.tone === 'paper') {
    r.style.setProperty('--paper', '#F0F4F1');
    r.style.setProperty('--vellum', '#F4F0E5');
    r.style.setProperty('--ink', '#14201C');
    document.body.style.background = 'var(--paper)';
  } else if (tweaks.tone === 'vellum') {
    r.style.setProperty('--paper', '#F4EFE2');
    r.style.setProperty('--vellum', '#EBE3CF');
    r.style.setProperty('--ink', '#1F1A12');
    document.body.style.background = 'var(--paper)';
  } else if (tweaks.tone === 'porcelain') {
    r.style.setProperty('--paper', '#FAF8F2');
    r.style.setProperty('--vellum', '#F2EEE3');
    r.style.setProperty('--ink', '#14201C');
    document.body.style.background = 'var(--paper)';
  } else if (tweaks.tone === 'ink') {
    r.style.setProperty('--paper', '#10181F');
    r.style.setProperty('--vellum', '#16222B');
    r.style.setProperty('--ink', '#F2F0E6');
    r.style.setProperty('--ink-soft', '#D8D6CB');
    r.style.setProperty('--muted', '#9DA6AA');
    r.style.setProperty('--muted-2', '#697379');
    r.style.setProperty('--rule', 'rgba(242,240,230,0.18)');
    r.style.setProperty('--rule-soft', 'rgba(242,240,230,0.10)');
    r.style.setProperty('--accent', '#6FB89D');
    r.style.setProperty('--accent-deep', '#9FCEB8');
    r.style.setProperty('--surface', '#16222B');
    r.style.setProperty('--paper-warm', '#16222B');
    r.style.setProperty('--carmine', '#D89186');
    r.style.setProperty('--bronze', '#D4A85F');
    document.body.style.background = 'var(--paper)';
    document.body.style.color = 'var(--ink)';
  }
  if (tweaks.tone !== 'ink') {
    r.style.removeProperty('--ink-soft');
    r.style.removeProperty('--muted');
    r.style.removeProperty('--muted-2');
    r.style.removeProperty('--rule');
    r.style.removeProperty('--rule-soft');
    r.style.removeProperty('--accent');
    r.style.removeProperty('--accent-deep');
    r.style.removeProperty('--surface');
    r.style.removeProperty('--paper-warm');
    r.style.removeProperty('--carmine');
    r.style.removeProperty('--bronze');
    document.body.style.removeProperty('color');
  }

  // Hero mode
  const heroH1L1 = document.querySelector('.hero h1 .line-1');
  const heroH1L2 = document.querySelector('.hero h1 .line-2');
  const heroStand = document.querySelector('.hero-standfirst');
  if (heroH1L1 && heroH1L2 && heroStand && window.DICT) {
    const d = window.DICT[currentLang] || window.DICT.en;
    if (tweaks.heroMode === 'monument') {
      heroH1L1.innerHTML = d['hero.l1'];
      heroH1L2.innerHTML = d['hero.l2'];
      heroStand.innerHTML = d['hero.standfirst'];
    } else if (tweaks.heroMode === 'thesis') {
      heroH1L1.innerHTML = currentLang === 'es' ? 'Estructura' : 'Structure';
      heroH1L2.innerHTML = currentLang === 'es' ? 'tu investigación.' : 'your research.';
      heroStand.innerHTML = currentLang === 'es'
        ? 'Tesyra te acompaña desde la lectura de fuentes hasta la escritura del artículo. Pensamiento estructurado asistido — no autocompletar.'
        : 'Tesyra walks with you from reading sources to writing the article. Structured thinking, assisted — not autocomplete.';
    } else if (tweaks.heroMode === 'question') {
      heroH1L1.innerHTML = currentLang === 'es' ? '¿Dónde quedó' : 'Where did';
      heroH1L2.innerHTML = currentLang === 'es' ? 'aquella idea?' : 'that idea go?';
      heroStand.innerHTML = currentLang === 'es'
        ? 'Tesyra captura cada hallazgo, lo clasifica, y lo coloca exactamente donde corresponde — para que cuando escribas, la estructura ya exista.'
        : 'Tesyra captures every insight, classifies it, and places it exactly where it belongs — so by the time you write, the structure already exists.';
    }
  }

  // Spine visibility
  const spine = document.querySelector('.spine');
  if (spine) spine.style.display = tweaks.spine ? '' : 'none';
  document.querySelectorAll('.tick').forEach((t) => {
    t.style.display = tweaks.spine ? '' : 'none';
  });

  // Section labels style
  document.querySelectorAll('.sect-num').forEach((el, i) => {
    const roman = ['§ I', '§ II', '§ III', '§ IV', '§ V'];
    const arabic = ['01', '02', '03', '04', '05'];
    if (tweaks.sectionLabels === 'arabic') {
      el.textContent = arabic[i] || '';
      el.style.fontFamily = 'var(--mono)';
      el.style.fontStyle = 'normal';
      el.style.fontSize = '14px';
      el.style.letterSpacing = '0.1em';
    } else if (tweaks.sectionLabels === 'hidden') {
      el.style.display = 'none';
    } else {
      el.textContent = roman[i] || '';
      el.style.fontFamily = '';
      el.style.fontStyle = '';
      el.style.fontSize = '';
      el.style.letterSpacing = '';
      el.style.display = '';
    }
  });

  // Fragment column
  const frags = document.querySelector('.fragments');
  if (frags) frags.style.display = tweaks.fragmentColumn ? '' : 'none';
  const gapGrid = document.querySelector('.gap-grid');
  if (gapGrid) gapGrid.style.gridTemplateColumns = tweaks.fragmentColumn ? '' : '1fr';

  // Video demo section
  const demo = document.querySelector('.demo-section');
  if (demo) {
    demo.style.display = tweaks.showVideo ? '' : 'none';
    const vid = demo.querySelector('video');
    if (vid && !tweaks.showVideo) {
      vid.pause();
    }
  }
}

// ============== TWEAKS PANEL ==============
function buildTweaksPanel() {
  const root = document.createElement('div');
  root.id = '__tweaks_panel';
  root.style.cssText = `
    position: fixed; right: 18px; bottom: 18px; z-index: 9999;
    width: 290px; max-height: 70vh; overflow: auto;
    background: rgba(20, 32, 28, 0.96); color: #F0F4F1;
    border-radius: 12px; padding: 18px 20px;
    font-family: 'Source Sans 3', system-ui, sans-serif;
    font-size: 13px;
    box-shadow: 0 10px 32px rgba(0,0,0,0.30);
    backdrop-filter: blur(8px);
    display: none;
  `;
  root.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-family:Literata,serif;font-style:italic;font-size:15px;font-weight:400">Tweaks</div>
      <button id="__tweaks_close" style="background:transparent;border:0;color:rgba(240,244,241,0.6);font-size:18px;cursor:pointer;padding:0;line-height:1">×</button>
    </div>
    ${section('Tono', radioGroup('tone', [
      ['paper',    'Papel (default)'],
      ['porcelain','Porcelana'],
      ['vellum',   'Vitela cálida'],
      ['ink',      'Tinta (oscuro)']
    ]))}
    ${section('Hero', radioGroup('heroMode', [
      ['monument', 'Monumento — Everything is there.'],
      ['thesis',   'Tesis — Structure your research.'],
      ['question', 'Pregunta — Where did that idea go?']
    ]))}
    ${section('Etiquetas de sección', radioGroup('sectionLabels', [
      ['roman',  '§ I, § II, § III'],
      ['arabic', '01, 02, 03'],
      ['hidden', 'Ocultas']
    ]))}
    ${section('Estructura', `
      ${toggle('spine', 'La espina (línea vertical verde)')}
      ${toggle('fragmentColumn', 'Columna de fragmentos en § I')}
      ${toggle('showVideo', 'Video demo bajo el hero')}
    `)}
  `;
  document.body.appendChild(root);

  function section(label, content) {
    return `<div style="margin-bottom:16px"><div style="font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(240,244,241,0.5);margin-bottom:8px">${label}</div>${content}</div>`;
  }
  function radioGroup(key, options) {
    return options.map(([v, l]) => `
      <label style="display:flex;align-items:center;gap:9px;padding:5px 0;cursor:pointer">
        <input type="radio" name="${key}" value="${v}" ${tweaks[key]===v?'checked':''} style="accent-color:#6FB89D">
        <span>${l}</span>
      </label>
    `).join('');
  }
  function toggle(key, label) {
    return `
      <label style="display:flex;align-items:center;gap:9px;padding:5px 0;cursor:pointer">
        <input type="checkbox" data-tweak="${key}" ${tweaks[key]?'checked':''} style="accent-color:#6FB89D">
        <span>${label}</span>
      </label>
    `;
  }

  root.querySelectorAll('input[type=radio]').forEach((i) => {
    i.addEventListener('change', () => {
      tweaks[i.name] = i.value;
      applyTweaks();
      persistTweaks();
    });
  });
  root.querySelectorAll('input[type=checkbox][data-tweak]').forEach((i) => {
    i.addEventListener('change', () => {
      tweaks[i.dataset.tweak] = i.checked;
      applyTweaks();
      persistTweaks();
    });
  });
  root.querySelector('#__tweaks_close').addEventListener('click', () => {
    root.style.display = 'none';
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch(e){}
  });
  return root;
}
function persistTweaks() {
  try {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { ...tweaks } }, '*');
  } catch(e){}
}

// ============== HOST EDIT-MODE PROTOCOL ==============
let panelEl = null;
window.addEventListener('message', (e) => {
  const msg = e.data || {};
  if (msg.type === '__activate_edit_mode') {
    if (!panelEl) panelEl = buildTweaksPanel();
    panelEl.style.display = 'block';
  } else if (msg.type === '__deactivate_edit_mode') {
    if (panelEl) panelEl.style.display = 'none';
  }
});
try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(e){}

// ============== REVEAL ==============
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08, rootMargin: '0px 0px -80px 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ============== INIT ==============
applyLang(currentLang);
applyTweaks();

// ============== DEMO VIDEO SOUND TOGGLE ==============
(function () {
  const btn = document.querySelector('.demo-sound');
  const vid = document.querySelector('.demo-frame video');
  if (!btn || !vid) return;
  const label = btn.querySelector('.sound-label');
  function sync() {
    const muted = vid.muted;
    btn.setAttribute('data-muted', muted ? 'true' : 'false');
    btn.setAttribute('aria-pressed', muted ? 'false' : 'true');
    if (label && window.DICT) {
      const d = window.DICT[currentLang] || window.DICT.en;
      const key = muted ? 'demo.sound.off' : 'demo.sound.on';
      if (d[key]) label.textContent = d[key];
    } else if (label) {
      label.textContent = muted ? 'Sound off' : 'Sound on';
    }
  }
  btn.addEventListener('click', () => {
    vid.muted = !vid.muted;
    if (!vid.muted) {
      const p = vid.play();
      if (p && p.catch) p.catch(() => { vid.muted = true; sync(); });
    }
    sync();
  });
  // Re-sync label when language changes
  document.querySelectorAll('.lang-switch button').forEach((b) => {
    b.addEventListener('click', () => setTimeout(sync, 0));
  });
  sync();
})();

// ============== DEMO VIDEO — start after 2s centered on screen ==============
(function () {
  const vid = document.querySelector('.demo-frame video');
  if (!vid) return;
  const DWELL_MS = 2000;
  let dwellTimer = null;
  let started = false;

  // "Centered" = the viewport's vertical midpoint falls within the video box.
  function isCentered() {
    const r = vid.getBoundingClientRect();
    if (r.height === 0) return false;
    const mid = window.innerHeight / 2;
    return r.top <= mid && r.bottom >= mid;
  }

  function evaluate() {
    if (started) return;
    if (isCentered()) {
      vid.preload = 'auto'; // buffer during the dwell so playback starts clean
      if (dwellTimer == null) {
        dwellTimer = window.setTimeout(() => {
          started = true;
          const p = vid.play();
          if (p && p.catch) p.catch(() => {});
          cleanup();
        }, DWELL_MS);
      }
    } else if (dwellTimer != null) {
      clearTimeout(dwellTimer);
      dwellTimer = null;
    }
  }

  function cleanup() {
    window.removeEventListener('scroll', evaluate);
    window.removeEventListener('resize', evaluate);
  }

  window.addEventListener('scroll', evaluate, { passive: true });
  window.addEventListener('resize', evaluate, { passive: true });
  evaluate(); // handle the case where the video is already centered on load
})();
