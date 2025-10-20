// assets/script.js
document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     NAV : burger + sous-menu
  ==========================*/
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.getElementById('nav-links');
  const dropBtn = document.querySelector('.dropdown > .dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');

  const openMenu  = () => { menu.classList.add('open');  toggle?.setAttribute('aria-expanded','true'); };
  const closeMenu = () => { menu.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); };

  if (toggle && menu) {
    // Clic burger
    toggle.addEventListener('click', () => {
      (toggle.getAttribute('aria-expanded') === 'true') ? closeMenu() : openMenu();
    });

    // Fermer quand on clique un lien (utile en mobile)
    menu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      if (!a.classList.contains('dropdown-toggle')) closeMenu();
    });

    // Clic en dehors de l'en-tête -> ferme le menu (mobile)
    document.addEventListener('click', (e) => {
      if (!e.target.closest('header') && menu.classList.contains('open')) closeMenu();
    });

    // Echap -> ferme
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  // Ouverture/fermeture du sous-menu "Compétences" en mobile (en desktop = hover CSS)
  if (dropdown && dropBtn && menu) {
    dropBtn.addEventListener('click', (e) => {
      // On ne gère au clic que si le menu est en colonne (mobile)
      const isMobile = getComputedStyle(menu).flexDirection === 'column';
      if (!isMobile) return;
      e.preventDefault();
      const isOpen = dropdown.classList.toggle('open');
      dropBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Fermer le sous-menu à Échap
    dropBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        dropBtn.setAttribute('aria-expanded', 'false');
        dropBtn.focus();
      }
    });
  }

  /* ======================================
     EXPÉRIENCES : "Voir plus / Voir moins"
  =======================================*/
  document.querySelectorAll('.toggle-details').forEach((btn) => {
    // état initial
    btn.setAttribute('aria-expanded', 'false');
    if (!btn.textContent.trim()) btn.textContent = '📄 Voir plus';

    btn.addEventListener('click', () => {
      const content = btn.closest('.timeline-content');
      if (!content) return;
      const details = content.querySelector('.details');
      if (!details) return;

      const isOpen = details.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.textContent = isOpen ? '▲ Voir moins' : '📄 Voir plus';
    });
  });
});
