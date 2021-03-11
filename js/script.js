// Fitness Pro interactions
(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation toggle
  const navToggle = $('.nav-toggle');
  const navLinks = $('#primary-menu');
  if (navToggle && navLinks){
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click (mobile)
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')){
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      }
    });
  }

  // Smooth scrolling for in-page anchors
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState(null, '', id);
    });
  });

  // Reveal-on-scroll animations
  const revealEls = $$('.reveal, .reveal-center');
  if ('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.18, rootMargin: '0px 0px -40px 0px'});
    revealEls.forEach(el => io.observe(el));
  } else {
    // Fallback: show all
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Back-to-top button visibility
  const toTop = $('.to-top');
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (toTop){
      if (y > 600) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
})();
