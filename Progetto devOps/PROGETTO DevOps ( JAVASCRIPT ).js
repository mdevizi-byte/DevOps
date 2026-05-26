/* ── Custom cursor ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animCursor() {
  if(cursor && ring) {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  }
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button, .btn-main').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if(cursor && ring) {
      cursor.style.width  = '20px';
      cursor.style.height = '20px';
      ring.style.width    = '52px';
      ring.style.height   = '52px';
    }
  });
  el.addEventListener('mouseleave', () => {
    if(cursor && ring) {
      cursor.style.width  = '12px';
      cursor.style.height = '12px';
      ring.style.width    = '36px';
      ring.style.height   = '36px';
    }
  });
});

/* ── Promo Code ── */
const VALID_CODES = ['BLACK50', 'QUICKLAUNCH50', 'DECOLLA50', 'BF2026'];

function applyCode() {
  const input    = document.getElementById('promoInput');
  const feedback = document.getElementById('promoFeedback');
  const box      = document.getElementById('promoBox');
  const code     = input.value.trim().toUpperCase();

  if (!code) {
    feedback.textContent = '⚠ Inserisci un codice prima di procedere.';
    feedback.className   = 'promo-feedback err';
    input.classList.add('error');
    setTimeout(() => input.classList.remove('error'), 500);
    return;
  }

  if (VALID_CODES.includes(code)) {
    // SCONTO APPLICATO CON SUCCESSO
    input.classList.remove('error');
    input.classList.add('valid');
    box.classList.add('success');
    feedback.textContent = '';

    setTimeout(() => {
      document.getElementById('promoForm').style.display = 'none';
      document.getElementById('successCodeLabel').textContent = code;
      const banner = document.getElementById('successBanner');
      banner.classList.add('show');
    }, 400);

  } else {
    // ERRORE CODICE ERRATO
    input.classList.remove('valid');
    input.classList.add('error');
    feedback.textContent = '✕ Codice non valido. Riprova o contatta il supporto.';
    feedback.className   = 'promo-feedback err';
    setTimeout(() => input.classList.remove('error'), 500);
  }
}

// Attiva il tasto "Invio" sulla tastiera all'interno del form
document.getElementById('promoInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') applyCode();
});

// Cancella lo stato di errore quando l'utente ricomincia a scrivere
document.getElementById('promoInput').addEventListener('input', () => {
  document.getElementById('promoFeedback').textContent = '';
  document.getElementById('promoInput').classList.remove('error');
});