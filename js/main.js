/* ==========================================================================
   Koom Digital — comportements globaux
   Vanilla JS, sans dépendances — léger pour les connexions 3G
   ========================================================================== */
(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     Navigation mobile
     ---------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------------------
     Sélecteur de langue (structure prête — FR actif, EN à venir)
     ---------------------------------------------------------------------- */
  var langButtons = document.querySelectorAll('.lang-toggle button');
  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      langButtons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  /* ----------------------------------------------------------------------
     Animations au scroll — fade + slide-up via IntersectionObserver
     ---------------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-group]');

  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----------------------------------------------------------------------
     Filtre du portfolio (Entreprises / Institutions / Tous)
     ---------------------------------------------------------------------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('[data-project-type]');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        filterButtons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');

        projectCards.forEach(function (card) {
          var type = card.getAttribute('data-project-type');
          var show = filter === 'all' || filter === type;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ----------------------------------------------------------------------
     Formulaires de contact — honeypot anti-spam + confirmation locale
     (pas de reCAPTCHA, conformément au cahier des charges)
     ---------------------------------------------------------------------- */
  var forms = document.querySelectorAll('[data-contact-form]');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var status = form.querySelector('.form-status');
      var honeypot = form.querySelector('input[name="societe_web"]');

      // Le champ honeypot doit rester vide — un bot le remplira
      if (honeypot && honeypot.value.trim() !== '') {
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (status) {
        status.textContent = 'Merci ! Votre message a bien été envoyé. Nous vous répondrons sous peu — vous pouvez aussi nous écrire directement sur WhatsApp pour une réponse plus rapide.';
        status.classList.remove('is-error');
        status.classList.add('is-success', 'is-visible');
        status.setAttribute('role', 'status');
      }

      form.reset();
    });
  });

  /* ----------------------------------------------------------------------
     Année courante dans le footer
     ---------------------------------------------------------------------- */
  var yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
