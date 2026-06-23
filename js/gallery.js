// Filtrare galerie aici am implementat 
var galleryFilters = document.querySelectorAll('.gallery-filter');
var galleryItems = document.querySelectorAll('.gallery-item');
var galleryCols = document.querySelectorAll('.gallery-col');

galleryFilters.forEach(function (btn) {
    btn.addEventListener('click', function () {
        galleryFilters.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        var filter = this.getAttribute('data-filter');
        galleryCols.forEach(function (col) {
            if (filter === 'all' || col.getAttribute('data-category') === filter) {
                col.style.display = 'block';
            } else {
                col.style.display = 'none';
            }
        });
    });
});

// LIGHTBOX 
var lightbox = document.getElementById('lightbox');
var lightboxContent = document.getElementById('lightboxPlaceholder');
var lightboxCaption = document.getElementById('lightboxCaption');
var currentLightboxIndex = 0;
var galleryArray = Array.from(galleryItems);

function openLightbox(index) {
    if (!lightbox) return;
    currentLightboxIndex = index;
    var item = galleryArray[index];
    var caption = item.getAttribute('data-caption') || '';
    var img = item.querySelector('img');

    if (lightboxContent) {
        if (img) {
            lightboxContent.innerHTML = '<img src="' + img.src + '" alt="' + img.alt + '" style="max-width:100%;max-height:80vh;border-radius:12px;">';
            lightboxContent.style.background = 'transparent';
        } else {
            lightboxContent.innerHTML = '🖼️';
            lightboxContent.style.background = '#333';
        }
    }
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    var visible = galleryArray.filter(function (item) {
        return item.closest('.gallery-col') && item.closest('.gallery-col').style.display !== 'none';
    });
    var visIndex = visible.indexOf(galleryArray[currentLightboxIndex]);
    var newIndex = (visIndex + dir + visible.length) % visible.length;
    var newGlobalIndex = galleryArray.indexOf(visible[newIndex]);
    openLightbox(newGlobalIndex);
}

// Atașare click la fiecare item galerie
galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
        openLightbox(index);
    });
});

// aici is butoanele lightbox
var closeBtn = document.getElementById('lightboxClose');
var prevBtn = document.getElementById('lightbox-prev');
var nextBtn = document.getElementById('lightbox-next');

if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
if (prevBtn) prevBtn.addEventListener('click', function () { navigateLightbox(-1); });
if (nextBtn) nextBtn.addEventListener('click', function () { navigateLightbox(1); });

// inchide la click pe fundal
if (lightbox) {
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });
}

// Aici is tastele sageata
document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'Escape') closeLightbox();
});