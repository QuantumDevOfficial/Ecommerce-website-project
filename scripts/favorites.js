export let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

export function saveToFavorite() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export function toggleFavorite(productId) {
    let favoriteElement;
    favorites.forEach((element) => {
        if (element.productId === productId) {
            favoriteElement = element;
        };
    });

    if (favoriteElement) {
        favorites = favorites.filter((remove)=> {
            return remove.productId !== productId;
        });
    }

    else {
        const todayFormat = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
        });

        favorites.push({
            productId: productId,
            dateAdded: todayFormat
        });
    };

    saveToFavorite();
};