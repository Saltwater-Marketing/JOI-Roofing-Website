// Mobile menu, submenus, and the gallery photo viewer.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });
  }
  document.querySelectorAll('.sub-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var sub = b.nextElementSibling;
      var open = sub.classList.toggle('is-open');
      b.setAttribute('aria-expanded', open);
    });
  });

  // Photo viewer: close, previous/next, counter, swipe, arrow keys
  document.querySelectorAll('[data-lightbox]').forEach(function (grid) {
    var links = Array.prototype.slice.call(grid.querySelectorAll('a'));
    var i = 0, box, img, count, startX = null;
    function show(n) {
      i = (n + links.length) % links.length;
      img.src = links[i].getAttribute('href');
      img.alt = links[i].querySelector('img').alt;
      count.textContent = (i + 1) + ' / ' + links.length;
    }
    function close() { box.remove(); document.removeEventListener('keydown', key); links[i].focus(); }
    function key(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(i + 1);
      if (e.key === 'ArrowLeft') show(i - 1);
    }
    links.forEach(function (a, n) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.innerHTML = '<img alt=""><button class="lb-close" aria-label="Close">×</button><button class="lb-prev" aria-label="Previous photo">‹</button><button class="lb-next" aria-label="Next photo">›</button><p class="lb-count"></p>';
        img = box.querySelector('img'); count = box.querySelector('.lb-count');
        box.querySelector('.lb-close').onclick = close;
        box.querySelector('.lb-prev').onclick = function () { show(i - 1); };
        box.querySelector('.lb-next').onclick = function () { show(i + 1); };
        box.addEventListener('click', function (ev) { if (ev.target === box) close(); });
        box.addEventListener('touchstart', function (ev) { startX = ev.touches[0].clientX; }, { passive: true });
        box.addEventListener('touchend', function (ev) {
          if (startX === null) return;
          var dx = ev.changedTouches[0].clientX - startX; startX = null;
          if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1);
        });
        document.body.appendChild(box);
        document.addEventListener('keydown', key);
        show(n);
        box.querySelector('.lb-close').focus();
      });
    });
  });
})();
