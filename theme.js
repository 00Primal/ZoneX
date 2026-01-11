const toggleBtn = document.getElementById('theme-toggle');

// Sprawdź zapisany motyw przy starcie
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});
