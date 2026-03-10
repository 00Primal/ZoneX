const langBtns = document.querySelectorAll('.lang-btn');
const translatableElements = document.querySelectorAll('[data-pl]');

function setLanguage(lang) {
    translatableElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    langBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');

    localStorage.setItem('zoneX_lang', lang);
}

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.id.replace('lang-', '');
        setLanguage(lang);
    });
});

document.addEventListener('mousemove', (e) => {
    const grid = document.querySelector('.grid');
    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;
    if (grid) {
        grid.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

const savedLang = localStorage.getItem('zoneX_lang') || 'en';

setLanguage(savedLang);
