document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('gameList');
    
    // Tworzenie nagłówka i kontenera ulubionych
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
        favContainer.innerHTML = '';
        let hasFavs = false;

        // Szukamy gier w oryginalnej liście (pomijając te w favContainer)
        const items = document.querySelectorAll('.game-list > .game-item, .game-list > .category-header + .game-item');

        items.forEach(item => {
            // Ignoruj przedmioty, które już są w kontenerze ulubionych podczas pętli
            if (item.parentElement.id === 'fav-container') return;

            const nameElement = item.querySelector('.game-name');
            if (!nameElement) return;
            
            const gameName = nameElement.innerText.trim();
            const isFav = favorites.includes(gameName);

            // Dodaj lub zaktualizuj gwiazdkę
            let star = item.querySelector('.fav-btn');
            if (!star) {
                star = document.createElement('div');
                star.className = 'fav-btn';
                star.innerHTML = '★';
                star.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFav(gameName);
                };
                item.prepend(star);
            }
            star.className = 'fav-btn' + (isFav ? ' active' : '');

            // Klonowanie do sekcji ulubionych
            if (isFav) {
                const clone = item.cloneNode(true);
                clone.onclick = () => item.click();
                clone.querySelector('.fav-btn').onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFav(gameName);
                };
                favContainer.appendChild(clone);
                hasFavs = true;
            }
        });

        favHeader.style.display = hasFavs ? 'block' : 'none';
    }

    function toggleFav(name) {
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
