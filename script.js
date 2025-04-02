// Learning items with their images and audio
const learningItems = [
    {
        name: 'Dog',
        image: 'images/dog.jpg',
        sound: 'sounds/dog.mp3',
    },
    {
        name: 'Cat',
        image: 'images/cat.jpg',
        sound: 'sounds/cat.mp3',
    },
    {
        name: 'Duck',
        image: 'images/duck.jpg',
        sound: 'sounds/duck.mp3',
    },
    {
        name: 'Cow',
        image: 'images/cow.jpg',
        sound: 'sounds/cow.mp3',
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('itemsContainer');
    
    try {
        // Fetch items from the API
        const response = await fetch('https://toddler-learning-app.onrender.com/api/items');
        const items = await response.json();
        
        // Create and append item cards
        items.forEach(item => {
            const card = createItemCard(item);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
});

// Create an item card
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    
    const img = document.createElement('img');
    img.src = `https://toddler-learning-app.onrender.com/api/items/${item.id}/image`;
    img.alt = item.name;
    
    card.appendChild(img);
    
    // Add click event to play sound
    card.addEventListener('click', () => {
        playSound(`https://toddler-learning-app.onrender.com/api/items/${item.id}/sound`);
        
        // Add a visual feedback when clicked
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    });
    
    return card;
}

// Play sound function
function playSound(soundUrl) {
    const audio = new Audio(soundUrl);
    audio.play().catch(error => {
        console.error('Error playing sound:', error);
    });
} 