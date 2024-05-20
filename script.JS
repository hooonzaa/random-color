let currentUser = null;

const setBg = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    document.getElementById('color').innerText = "#" + randomColor;
};

const saveFavouriteColor = () => {
    const currentColor = document.getElementById('color').innerText;
    if (currentColor) {
        let favourites;
        if (currentUser) {
            favourites = JSON.parse(localStorage.getItem(currentUser)) || [];
        } else {
            favourites = JSON.parse(localStorage.getItem('guestFavourites')) || [];
        }
        if (!favourites.includes(currentColor)) {
            favourites.push(currentColor);
            if (currentUser) {
                localStorage.setItem(currentUser, JSON.stringify(favourites));
            } else {
                localStorage.setItem('guestFavourites', JSON.stringify(favourites));
            }
            showFavourites();
        }
    }
};

const showFavourites = () => {
    const favouritesList = document.getElementById('favouritesList');
    favouritesList.innerHTML = '';
    let favourites;
    if (currentUser) {
        favourites = JSON.parse(localStorage.getItem(currentUser)) || [];
    } else {
        favourites = JSON.parse(localStorage.getItem('guestFavourites')) || [];
    }
    favourites.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'favourite-item';
        colorDiv.innerHTML = `
            <span>${color}</span>
            <button onclick="removeFavouriteColor('${color}')">Remove</button>
        `;
        colorDiv.style.backgroundColor = color; // Set background color of the item
        favouritesList.appendChild(colorDiv);
    });
};

const removeFavouriteColor = (color) => {
    let favourites;
    if (currentUser) {
        favourites = JSON.parse(localStorage.getItem(currentUser)) || [];
    } else {
        favourites = JSON.parse(localStorage.getItem('guestFavourites')) || [];
    }
    favourites = favourites.filter(fav => fav !== color);
    if (currentUser) {
        localStorage.setItem(currentUser, JSON.stringify(favourites));
    } else {
        localStorage.setItem('guestFavourites', JSON.stringify(favourites));
    }
    showFavourites();
};

const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username] && users[username] === password) {
        currentUser = username;
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('colorActions').classList.remove('hidden');
        showFavourites();
    } else {
        alert('Invalid username or password.');
    }
};

const register = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
        alert('Username already exists.');
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful. Please login.');
    }
};

document.getElementById('genNew').addEventListener('click', setBg);
document.getElementById('favourite').addEventListener('click', saveFavouriteColor);
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('registerBtn').addEventListener('click', register);

window.onload = () => {
    setBg();
    showFavourites();
};
