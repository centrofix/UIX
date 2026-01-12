// Simple color generator and UI
(() => {
  const paletteEl = document.getElementById('palette');
  const generateBtn = document.getElementById('generate');
  const exportBtn = document.getElementById('export');
  const countInput = document.getElementById('count');

  const state = {
    colors: [],
    locked: new Set(),
  };

  function randomHex() {
    // Generate a visually pleasant random color (no very-dark nor very-light)
    const h = Math.floor(Math.random() * 360);
    const s = 60 + Math.floor(Math.random() * 20); // 60-80%
    const l = 40 + Math.floor(Math.random() * 20); // 40-60%
    return hslToHex(h, s, l);
  }

  function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
    const toHex = x => {
      const v = Math.round(x * 255).toString(16).padStart(2, '0');
      return v;
    };
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
  }

  function generate(n = 5) {
    const newColors = [];
    for (let i = 0; i < n; i++) {
      if (state.colors[i] && state.locked.has(i)) {
        newColors.push(state.colors[i]);
      } else {
        newColors.push(randomHex());
      }
    }
    state.colors = newColors;
    render();
  }

  function render() {
    paletteEl.innerHTML = '';
    state.colors.forEach((hex, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.background = hex;
      card.dataset.index = idx;

      const meta = document.createElement('div');
      meta.className = 'meta';

      const hexEl = document.createElement('div');
      hexEl.className = 'hex';
      hexEl.textContent = hex;

      const actions = document.createElement('div');
      actions.className = 'actions';

      const lockBtn = document.createElement('button');
      lockBtn.className = 'lock';
      lockBtn.type = 'button';
      lockBtn.innerText = state.locked.has(idx) ? '🔒' : '🔓';
      lockBtn.title = 'Lock color';

      lockBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.locked.has(idx)) state.locked.delete(idx);
        else state.locked.add(idx);
        render();
      });

      actions.appendChild(lockBtn);
      meta.appendChild(hexEl);
      meta.appendChild(actions);
      card.appendChild(meta);

      // Click card to copy hex
      card.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(hex);
          showToast(`Copied ${hex}`);
        } catch {
          showToast(`Copy ${hex} (select manually)`);
        }
      });

      paletteEl.appendChild(card);
    });
  }

  function showToast(text, ms = 1200) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(t._timeout);
    t._timeout = setTimeout(() => t.classList.remove('show'), ms);
  }

  function exportCssVars() {
    if (!state.colors.length) {
      showToast('No colors to export');
      return;
    }
    const lines = state.colors.map((c, i) => `--uix-color-${i + 1}: ${c};`);
    const css = `:root {\n  ${lines.join('\n  ')}\n}\n`;
    // copy to clipboard
    navigator.clipboard?.writeText(css).then(() => {
      showToast('CSS variables copied to clipboard');
    }, () => {
      // fallback: show in new window
      const w = window.open('', '_blank');
      w.document.body.prepend(document.createElement('pre')).innerText = css;
    });
  }

  // Events
  generateBtn.addEventListener('click', () => {
    const n = Math.max(1, Math.min(12, parseInt(countInput.value || '5', 10)));
    // preserve locks only up to new length
    state.locked = new Set([...state.locked].filter(i => i < n));
    generate(n);
  });

  exportBtn.addEventListener('click', exportCssVars);

  // initialize
  generate(parseInt(countInput.value, 10) || 5);
})();
