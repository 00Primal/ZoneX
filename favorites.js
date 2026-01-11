document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('gameList');
    
    // LICZNIK GIER - Liczy tylko te z głównej listy (bez ulubionych)
    const updateGameCounter = () => {
        const total = document.querySelectorAll('.game-list > .game-item').length;
        const display = document.getElementById('total-count');
        if (display) display.innerText = total;
    };

    // SEKCOJA ULUBIONYCH
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
        // Pobieramy wszystkie gry
        const items = document.querySelectorAll('.game-list > .game-item');
        favContainer.innerHTML = '';
        let hasFavs = false;

        items.forEach(item => {
            const nameElement = item.querySelector('.game-name');
            if (!nameElement) return;
            const gameName = nameElement.innerText.trim();
            const isFav = favorites.includes(gameName);

            // Dodaj gwiazdkę jeśli jej nie ma
            if (!item.querySelector('.fav-btn')) {
                const star = document.createElement('div');
                star.className = 'fav-btn' + (isFav ? ' active' : '');
                star.innerHTML = '★';
                star.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFav(gameName, star);
                };
                item.prepend(star); // Wstawia przed nazwę gry
            } else {
                item.querySelector('.fav-btn').className = 'fav-btn' + (isFav ? ' active' : '');
            }

            // Obsługa wyświetlania w ulubionych
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
        updateGameCounter();
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
