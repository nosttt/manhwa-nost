const content = document.getElementById('manhwa-list');
const searchInput = document.getElementById('search');
const genreFilter = document.getElementById('genre-filter');
const loadMoreButton = document.getElementById('load-more');

let manhwaData = [
    { title: 'Solo Leveling', description: 'A weak hunter becomes the strongest after a mysterious event.', genre: 'action', image: 'https://i.pinimg.com/736x/3f/fa/b4/3ffab46e26f3a82eaad117b911d6b98d.jpg' },
    { title: 'Tower of God', description: 'A boy enters a mysterious tower to find his friend.', genre: 'fantasy', image: 'https://i.pinimg.com/564x/90/97/23/9097234d2a0341653d5e86b46c34f024.jpg' },
    { title: 'The God of High School', description: 'High school students compete in a tournament with their martial arts skills.', genre: 'action', image: 'https://i.pinimg.com/564x/08/68/1d/08681d42740ec7290ab9c9cc848e05af.jpg' },
    { title: 'Lore Olympus', description: 'A modern retelling of the story of Hades and Persephone.', genre: 'romance', image: 'https://i.pinimg.com/564x/8b/83/fb/8b83fbf41f96a51dd8096b972666f436.jpg' },
    { title: 'My Dear Cold-Blooded King', description: 'A girl gets entangled with a mysterious king.', genre: 'romance', image: 'https://i.pinimg.com/564x/73/3d/c0/733dc0bceedc8d012cd8d4fbe28eb6da.jpg' },
    { title: 'The Remarried Empress', description: 'An empress finds love again after her husband’s betrayal.', genre: 'romance', image: 'https://i.pinimg.com/enabled_hi/564x/6d/2f/33/6d2f33a3971409e668c306a89cfe6ff5.jpg' },
    { title: 'My Wife is Wagatsuma-san', description: 'A romantic comedy about a boy and his childhood crush.', genre: 'romance', image: 'https://i.pinimg.com/enabled_hi/564x/7c/bb/42/7cbb42772d36266880dc719deb4ebe15.jpg' },
    { title: 'I Am a Hero', description: 'A man fights against a zombie apocalypse.', genre: 'horror', image: 'https://i.pinimg.com/564x/dc/0d/05/dc0d05c46c3360595b753aad31f0a02f.jpg' },
    { title: 'Bastard', description: 'A psychological thriller about a boy and his murderous father.', genre: 'horror', image: 'https://i.pinimg.com/564x/5b/67/3d/5b673dabaed823017f17b042f1bc9ef4.jpg' },
    { title: 'DICE: The Cube that Changes Everything', description: 'A boy gains the ability to change his life through dice.', genre: 'fantasy', image: 'https://i.pinimg.com/564x/ba/eb/c2/baebc277f24e09076f1bc4433df2988f.jpg' },
    // Add more manhwa entries as needed
];

let filteredData = manhwaData;
let currentIndex = 0;
const itemsPerPage = 9;

function displayManhwa() {
    const slice = filteredData.slice(currentIndex, currentIndex + itemsPerPage);
    slice.forEach(item => {
        const manhwaItem = document.createElement('div');
        manhwaItem.className = 'manhwa-item';
        manhwaItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="manhwa-image">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        content.appendChild(manhwaItem);
    });

    // Trigger animations for newly added items
    const manhwaItems = document.querySelectorAll('.manhwa-item');
    manhwaItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`; // Stagger animations
        item.style.opacity = '1'; // Show items
        item.style.transform = 'translateY(0)';
    });

    currentIndex += itemsPerPage;

    // Hide load more button if no more items to display
    if (currentIndex >= filteredData.length) {
        loadMoreButton.style.display = 'none';
    }
}

function filterManhwa() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;

    filteredData = manhwaData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm);
        const matchesGenre = selectedGenre ? item.genre === selectedGenre : true;
        return matchesSearch && matchesGenre;
    });

    // Reset current index and clear displayed items
    currentIndex = 0;
    content.innerHTML = '';
    loadMoreButton.style.display = 'block'; // Show button again
    displayManhwa();
}

// Initial display of manhwa
displayManhwa();

// Event listeners
searchInput.addEventListener('input', filterManhwa);
genreFilter.addEventListener('change', filterManhwa);
loadMoreButton.addEventListener('click', displayManhwa);
