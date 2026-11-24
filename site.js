/* Teatro Consciente — scripts compartidos (sistema dual escritorio/mobile).
   Cada vista (.tc-view) se cablea por separado para no pisarse. */
(function () {
  'use strict';
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded',fn); }

  ready(function () {
    var views = document.querySelectorAll('.tc-view');
    var scopes = views.length ? Array.prototype.slice.call(views) : [document];

    scopes.forEach(function (root) {
      /* Menú móvil */
      var menu = root.querySelector('.tc-menu');
      function setMenu(open){ if(!menu) return; menu.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : ''; }
      root.querySelectorAll('[data-menu-open]').forEach(function(b){ b.addEventListener('click', function(){ setMenu(true); }); });
      if (menu){ menu.querySelectorAll('[data-menu-close], a').forEach(function(el){ el.addEventListener('click', function(){ setMenu(false); }); }); }

      /* Modal (Home) */
      var modal = root.querySelector('.tc-modal');
      if (modal){ modal.querySelectorAll('[data-modal-close]').forEach(function(el){ el.addEventListener('click', function(ev){ if(ev.currentTarget===el) modal.classList.remove('open'); }); }); }

      /* Carrusel sala (Teatro) */
      var track = root.querySelector('.sala-track');
      if (track){
        var sc=function(dir){ var max=track.scrollWidth-track.clientWidth; var nl=track.scrollLeft+dir*track.clientWidth; if(nl>max+4)nl=0; else if(nl<-4)nl=max; track.scrollTo({left:nl,behavior:'smooth'}); };
        var pv=root.querySelector('[data-sala-prev]'), nx=root.querySelector('[data-sala-next]');
        if(pv) pv.addEventListener('click', function(){ sc(-1); });
        if(nx) nx.addEventListener('click', function(){ sc(1); });
      }

      /* Tabs (Obras) */
      var tabs = root.querySelectorAll('[data-tab]');
      if (tabs.length){
        var ON='background:#B23A2A;color:#F4F1E9;', OFF='background:none;color:#6f6a63;';
        var base='font-family:inherit;font-size:11px;letter-spacing:.14em;padding:9px 20px;border-radius:40px;border:none;cursor:pointer;transition:background .2s,color .2s;';
        var sel=function(nm){
          tabs.forEach(function(t){ t.style.cssText = base + (t.getAttribute('data-tab')===nm ? ON : OFF); });
          root.querySelectorAll('.tc-panel').forEach(function(p){ p.style.display = (p.getAttribute('data-panel')===nm)?'grid':'none'; });
        };
        tabs.forEach(function(t){ t.addEventListener('click', function(){ sel(t.getAttribute('data-tab')); }); });
      }

      /* Reseñas (Clases) */
      var foto = root.querySelector('.rv-foto');
      if (foto){
        var reviews=[]; var de=document.getElementById('tc-reviews-data');
        if(de){ try{ reviews=JSON.parse(de.textContent); }catch(e){} }
        var quote=root.querySelector('.rv-quote'), label=root.querySelector('.rv-label');
        var pills=root.querySelectorAll('[data-review]');
        var show=function(i){ var r=reviews[i]; if(!r) return;
          foto.src=r.src; foto.alt=r.name;
          if(quote) quote.textContent='“'+r.quote+'”';
          if(label) label.textContent=(r.name||'').toUpperCase();
          pills.forEach(function(p,k){ p.style.opacity=(k===i)?'1':'.42'; p.style.outline='1px solid '+((k===i)?'#B23A2A':'transparent'); });
        };
        pills.forEach(function(p,k){ p.addEventListener('click', function(){ show(k); }); });
        if(reviews.length) show(0);
      }
    });

    /* Aparición al hacer scroll (global) */
    function revealPass(){
      var vh=window.innerHeight||800;
      document.querySelectorAll('[data-reveal]:not(.tc-shown)').forEach(function(el){
        if(el.offsetParent===null) return;
        if(el.getBoundingClientRect().top < vh*0.95) el.classList.add('tc-shown');
      });
    }
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('tc-shown'); io.unobserve(e.target); } }); },{threshold:0.1,rootMargin:'0px 0px -6% 0px'});
      document.querySelectorAll('[data-reveal]').forEach(function(el){ io.observe(el); });
    }
    revealPass(); window.addEventListener('resize', revealPass); window.addEventListener('load', revealPass);
  });
})();
