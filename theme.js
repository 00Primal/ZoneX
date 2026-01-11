const toggleBtn = document.getElementById('theme-toggle');

function updateTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggleBtn.innerText = (theme === 'light') ? "TRYB: JASNY" : "TRYB: CIEMNY";
}

const savedTheme = localStorage.getItem('theme') || 'dark';
updateTheme(savedTheme);

toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    updateTheme(currentTheme === 'light' ? 'dark' : 'light');
});
