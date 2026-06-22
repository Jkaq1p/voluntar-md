// ===== PROJECTS.JS - Filtrare Proiecte & Timeline =====

// ===== FILTRARE PROIECTE =====
var domeniuBtns = document.querySelectorAll('.filter-btn:not(.filter-btn-green)');
var locatieBtns = document.querySelectorAll('.filter-btn-green');
var projectItems = document.querySelectorAll('.project-item');

var activeDomeniu = 'all';
var activeLocatie = 'all';

function applyFilters() {
  var vizibile = 0;

  projectItems.forEach(function (item) {
    var domeniu = item.getAttribute('data-domeniu') || '';
    var locatie = item.getAttribute('data-locatie') || '';

    var matchDomeniu = (activeDomeniu === 'all' || domeniu === activeDomeniu);
    var matchLocatie = (activeLocatie === 'all' || locatie === activeLocatie);

    if (matchDomeniu && matchLocatie) {
      item.style.display = 'block';
      vizibile++;
    } else {
      item.style.display = 'none';
    }
  });

  var counter = document.getElementById('projects-count');
  if (counter) {
    counter.textContent = vizibile + (vizibile === 1 ? ' proiect' : ' proiecte');
  }
}

domeniuBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    domeniuBtns.forEach(function (b) { b.classList.remove('active'); });
    this.classList.add('active');
    activeDomeniu = this.getAttribute('data-filter');
    applyFilters();
  });
});

locatieBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // dacă apeși din nou pe locația deja activă, o deselectezi (revii la "toate")
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      activeLocatie = 'all';
    } else {
      locatieBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      activeLocatie = this.getAttribute('data-filter');
    }
    applyFilters();
  });
});

// Rulează filtrarea inițială la încărcare
applyFilters();