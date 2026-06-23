// ===== MAIN.JS - Funcționalități Comune =====

// ===== BACK TO TOP =====
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SMOOTH SCROLL pentru linkuri interne =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== NAVBAR: închide meniul pe mobil după click =====
var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
var navbarCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      var bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  });
});

// ===== COUNTER ANIMAT (pentru index.html) =====
function animateCounter(el, target, duration) {
  var start = 0;
  var startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    // easing
    progress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    el.textContent = Math.floor(progress * target).toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(step);
}

// Pornire counter când secțiunea devine vizibilă
var counterSection = document.querySelector('.counter-section');
if (counterSection) {
  var countersStarted = false;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        document.querySelectorAll('[data-count]').forEach(function (el) {
          var target = parseInt(el.getAttribute('data-count'));
          animateCounter(el, target, 2000);
        });
      }
    });
  }, { threshold: 0.3 });
  observer.observe(counterSection);
}

// ===== TESTIMONIALE SLIDER SIMPLU =====
var slides = document.querySelectorAll('.testimonial-slide');
var currentSlide = 0;
if (slides.length > 0) {
  function showSlide(index) {
    slides.forEach(function (s) { s.style.display = 'none'; });
    slides[index].style.display = 'block';
  }
  showSlide(0);

  var prevBtn = document.getElementById('testimonial-prev');
  var nextBtn = document.getElementById('testimonial-next');

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }
  // Auto-slide
  setInterval(function () {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000);
}