document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-username]');
  if (!buttons.length) return;

  // create a single popup element and reuse it
  const popup = document.createElement('div');
  popup.className = 'discord-copy-popup';
  popup.setAttribute('role', 'status');
  popup.setAttribute('aria-live', 'polite');
  document.body.appendChild(popup);

  let hideTimer = null;

  async function copyText(text) {
    // Primary: Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Clipboard API failed, falling back:', err);
      }
    }

    // Fallback: textarea + execCommand (older browsers)
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (err) {
      console.error('Fallback copy failed', err);
      return false;
    }
  }

  function showPopupAbove(targetEl, message = 'Copied!') {
    popup.textContent = message;
    // ensure popup has content, measure size
    popup.classList.remove('show');
    popup.style.left = '0px';
    popup.style.top = '0px';

    // measure
    const rect = targetEl.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();

    // compute coordinates (prefer above)
    const margin = 8;
    let top = window.scrollY + rect.top - popupRect.height - 8;
    let left = window.scrollX + rect.left + (rect.width / 2) - (popupRect.width / 2);

    // constrain horizontally
    if (left < margin) left = margin;
    if (left + popupRect.width > window.innerWidth - margin) {
      left = window.innerWidth - popupRect.width - margin;
    }

    // if not enough space above, place below
    if (top < window.scrollY + margin) {
      top = window.scrollY + rect.bottom + 8;
    }

    popup.style.left = `${Math.round(left)}px`;
    popup.style.top = `${Math.round(top)}px`;

    // show
    popup.classList.add('show');

    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => popup.classList.remove('show'), 1400);
  }

  // attach handlers for click + keyboard activation (Enter / Space)
  buttons.forEach(btn => {
    btn.addEventListener('click', async (ev) => {
      ev.preventDefault();
      const username = btn.getAttribute('data-username') || btn.dataset.username;
      if (!username) return;
      const ok = await copyText(username);
      showPopupAbove(btn, ok ? 'Copied!' : 'Copy failed');
    });

    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
        ev.preventDefault();
        btn.click();
      }
    });
  });
});
