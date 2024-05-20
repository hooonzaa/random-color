const setBg = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    color.innerHTML = "#" + randomColor;
};

const saveFavouriteColor = () => {
    const currentColor = document.getElementById('color').innerText;
    if (currentColor) {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (!favourites.includes(currentColor)) {
            favourites.push(currentColor);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            showFavourites();
        } 
    }
};

const showFavourites = () => {
    const favouritesList = document.getElementById('favouritesList');
    favouritesList.innerHTML = '';
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    favourites.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'favourite-item';
        colorDiv.innerHTML = `
            <span>${color}</span>
            <button onclick="removeFavouriteColor('${color}')">Remove</button>
        `;
        favouritesList.appendChild(colorDiv);
    });
};

const removeFavouriteColor = (color) => {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    favourites = favourites.filter(fav => fav !== color);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    showFavourites();
};

document.getElementById('genNew').addEventListener('click', setBg);
document.getElementById('favourite').addEventListener('click', saveFavouriteColor);
document.getElementById('showList').addEventListener('click', showFavourites);

window.onload = () => {
    setBg();
    showFavourites();
};
