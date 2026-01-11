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
        const allItems = document.querySelectorAll('.game-list > .game-item');
        favContainer.innerHTML = '';
        let hasFavs = false;

        allItems.forEach(item => {
            const gameName = item.innerText.replace('★', '').trim();
            const isFav = favorites.includes(gameName);
            
            // Dodanie gwiazdki jeśli jej nie ma
            if (!item.querySelector('.fav-btn')) {
                const star = document.createElement('span');
                star.innerHTML = '★';
                star.className = 'fav-btn' + (isFav ? ' active' : '');
                star.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFav(gameName, star);
                };
                item.prepend(star);
            } else {
                // Aktualizacja stanu istniejącej gwiazdki
                item.querySelector('.fav-btn').className = 'fav-btn' + (isFav ? ' active' : '');
            }

            // Dodaj kopię do ulubionych
            if (isFav) {
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
