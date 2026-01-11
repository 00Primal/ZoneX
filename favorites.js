document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('gameList');
    
    // 1. LICZNIK GIER
    const totalGames = document.querySelectorAll('.game-list > .game-item').length;
    const counterElement = document.getElementById('total-count');
    if (counterElement) counterElement.innerText = totalGames;

    // 2. SEKCOJA ULUBIONYCH
    const favHeader = document.createElement('div');
    favHeader.id = 'fav-category';
    favHeader.className = 'category-header';
    favHeader.innerText = '⭐ MOJE ULUBIONE';
    
    const favContainer = document.createElement('div');
    favContainer.id = 'fav-container';
    gameList.prepend(favContainer);
    gameList.prepend(favHeader);

    let favorites = JSON.parse(localStorage.getItem('zoneX_favs')) || [];

    function updateFavUI() {
        const items = document.querySelectorAll('.game-list > .game-item');
        favContainer.innerHTML = '';
        let hasFavs = false;

        items.forEach(item => {
            const nameElement = item.querySelector('.game-name');
            if (!nameElement) return;
            const gameName = nameElement.innerText.trim();
            const isFav = favorites.includes(gameName);

            // Dodaj gwiazdkę jeśli jej nie ma (tylko w głównej liście)
            if (!item.querySelector('.fav-btn')) {
                const star = document.createElement('div');
                star.className = 'fav-btn' + (isFav ? ' active' : '');
                star.innerHTML = '★';
                star.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFav(gameName, star);
                };
                item.prepend(star); // Gwiazdka na lewo
            } else {
                item.querySelector('.fav-btn').className = 'fav-btn' + (isFav ? ' active' : '');
            }

            // Kopiuj do sekcji ulubionych
            if (isFav && item.parentElement.id !== 'fav-container') {
                const clone = item.cloneNode(true);
                clone.onclick = () => item.click();
                clone.querySelector('.fav-btn').onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFav(gameName, item.querySelector('.fav-btn'));
                };
                favContainer.appendChild(clone);
                hasFavs = true;
            }
        });
        favHeader.style.display = hasFavs ? 'block' : 'none';
    }

    function toggleFav(name, btn) {
        if (favorites.includes(name)) {
            favorites = favorites.filter(f => f !== name);
        } else {
            favorites.push(name);
        }
        localStorage.setItem('zoneX_favs', JSON.stringify(favorites));
        updateFavUI();
    }

    updateFavUI();
});
