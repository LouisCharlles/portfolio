document.body.classList.remove('no-js');

// Tema: respeita o sistema; o botão fixa a escolha
(function () {
  var root = document.documentElement, KEY = 'lc-theme';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
  document.getElementById('theme').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
  });
})();

// Filtro de projetos
(function () {
  var buttons = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.projects .card');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      cards.forEach(function (c) {
        var show = f === 'all' || c.dataset.tags.split(' ').indexOf(f) !== -1;
        c.hidden = !show;
        if (show) c.classList.add('in');
      });
    });
  });
})();

// Guarda o idioma escolhido manualmente
(function () {
  document.querySelectorAll('[data-lang-switch]').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('lc-lang', a.dataset.langSwitch); } catch (e) {}
    });
  });
})();

// Animação de entrada
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  els.forEach(function (e) { io.observe(e); });
})();

// Link ativo no menu
(function () {
  var links = document.querySelectorAll('.nav-links a');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && map[en.target.id]) {
        links.forEach(function (a) { a.classList.remove('active'); });
        map[en.target.id].classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
})();

// Copiar e-mail (mantém o mailto funcionando)
(function () {
  var mail = document.getElementById('mail'), ok = document.getElementById('copy-ok');
  mail.addEventListener('click', function () {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('luiscmacedo84@gmail.com').then(function () {
        ok.textContent = ok.dataset.msg || '✓';
        setTimeout(function () { ok.textContent = ''; }, 2600);
      }).catch(function () {});
    }
  });
})();

document.getElementById('year').textContent = new Date().getFullYear();
