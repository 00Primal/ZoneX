const langBtns = document.querySelectorAll('.lang-btn');
const translatableElements = document.querySelectorAll('[data-pl]');

function setLanguage(lang) {
    // Aktualizacja wszystkich tekstów z atrybutami data-pl/data-en
    translatableElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Wizualna aktualizacja przełącznika
    langBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Zapisz preferencję w przeglądarce
    localStorage.setItem('zoneX_lang', lang);
}

// Obsługa kliknięć w przełącznik
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.id.replace('lang-', '');
        setLanguage(lang);
    });
});

// Efekt poruszania siatką tła za myszką
document.addEventListener('mousemove', (e) => {
    const grid = document.querySelector('.grid');
    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;
    if (grid) {
        grid.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

// Inicjalizacja języka (domyślnie polski)
const savedLang = localStorage.getItem('zoneX_lang') || 'pl';
setLanguage(savedLang);