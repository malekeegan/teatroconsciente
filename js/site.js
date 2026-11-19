/* ===========================================================
   Teatro Consciente — scripts compartidos
   Menú móvil · aparición al scroll · modal · carruseles · tabs
   =========================================================== */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    /* ---------- Menú móvil (hamburguesa + overlay) ---------- */
    var menu = document.querySelector('.tc-menu');
    var burger = document.querySelector('.tc-burger');
    function setMenu(open) {
      if (!menu) return;
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    if (burger) burger.addEventListener('click', function () { setMenu(true); });
    if (menu) {
      menu.querySelectorAll('[data-tc-menuclose], a').forEach(function (el) {
        el.addEventListener('click', function () { setMenu(false); });
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });

    /* ---------- Modal (Home) ---------- */
    var modal = document.querySelector('.tc-modal');
    if (modal) {
      modal.querySelectorAll('[data-tc-modalclose]').forEach(function (el) {
        el.addEventListener('click', function (ev) {
          if (ev.currentTarget === el) modal.classList.remove('open');
        });
      });
    }

    /* ---------- Aparición al hacer scroll ---------- */
    var reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length) {
      if (!('IntersectionObserver' in window)) {
        reveals.forEach(function (el) { el.classList.add('tc-shown'); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('tc-shown'); io.unobserve(e.target); }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        var vh = window.innerHeight || 800;
        reveals.forEach(function (el) {
          if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('tc-shown');
          else io.observe(el);
        });
      }
    }

    /* ---------- Carrusel (Teatro: sala) ---------- */
    var track = document.getElementById('sala-track');
    if (track) {
      function scrollSala(dir) {
        var max = track.scrollWidth - track.clientWidth;
        var nl = track.scrollLeft + dir * track.clientWidth;
        if (nl > max + 4) nl = 0; else if (nl < -4) nl = max;
        track.scrollTo({ left: nl, behavior: 'smooth' });
      }
      var pv = document.querySelector('[data-tc-prev]');
      var nx = document.querySelector('[data-tc-next]');
      if (pv) pv.addEventListener('click', function () { scrollSala(-1); });
      if (nx) nx.addEventListener('click', function () { scrollSala(1); });
    }

    /* ---------- Tabs (Obras: producciones / microteatro) ---------- */
    var tabs = document.querySelectorAll('[data-tc-tab]');
    if (tabs.length) {
      var ON = 'background:#B23A2A;color:#F4F1E9;';
      var OFF = 'background:none;color:#6f6a63;';
      function selectTab(name) {
        tabs.forEach(function (b) {
          var active = b.getAttribute('data-tc-tab') === name;
          b.style.cssText = b.getAttribute('data-tc-base') + (active ? ON : OFF);
        });
        var po = document.getElementById('tc-panel-obras');
        var pm = document.getElementById('tc-panel-micro');
        if (po) po.style.display = (name === 'obras') ? 'grid' : 'none';
        if (pm) pm.style.display = (name === 'micro') ? 'grid' : 'none';
      }
      tabs.forEach(function (b) {
        b.addEventListener('click', function () { selectTab(b.getAttribute('data-tc-tab')); });
      });
    }

    /* ---------- Carrusel de reseñas (Clases) ---------- */
    var dataEl = document.getElementById('tc-reviews-data');
    if (dataEl) {
      var reviews = [];
      try { reviews = JSON.parse(dataEl.textContent); } catch (e) {}
      var foto = document.getElementById('rv-foto');
      var quote = document.getElementById('rv-quote');
      var label = document.getElementById('rv-label');
      var pills = document.querySelectorAll('[data-tc-review]');
      function showReview(i) {
        var r = reviews[i]; if (!r) return;
        if (foto) { foto.src = r.src; foto.alt = r.name; }
        if (quote) quote.textContent = '“' + r.quote + '”';
        if (label) label.textContent = (r.name || '').toUpperCase();
        pills.forEach(function (p, k) {
          p.style.opacity = (k === i) ? '1' : '.42';
          p.style.outline = '1px solid ' + ((k === i) ? '#B23A2A' : 'transparent');
        });
      }
      pills.forEach(function (p, k) {
        p.addEventListener('click', function () { showReview(k); });
      });
      if (reviews.length) showReview(0);
    }

  });
})();
