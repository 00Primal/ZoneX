const toggleBtn = document.getElementById('theme-toggle');

// Funkcja ustawiająca motyw
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggleBtn.innerText = theme === 'light' ? "Tryb: Jasny" : "Tryb: Ciemny";
}

// Sprawdź zapisany motyw przy starcie
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});
