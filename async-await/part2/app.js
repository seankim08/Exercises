async function getJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

let deckId;

async function createNewDeck() {
    const response = await getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/');
    deckId = response.deck_id;
    document.getElementById('draw-card').disabled = false;
}

async function drawCard() {
    const response = await getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    if (response.remaining === 0) {
       document.getElementById('draw-card').disabled = true;
    }
    const card = response.cards[0];
    displayCard(card);
}

function displayCard(card) {
    const cardContainer = document.getElementById('card-container');
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.alt = `${card.value} of ${card.suit}`;
    
    const cardDescription = document.createElement('p');
    cardDescription.textContent = `${card.value} of ${card.suit}`;
    
    cardElement.appendChild(cardImage);
    cardElement.appendChild(cardDescription);
    cardContainer.appendChild(cardElement);
}

// Expose functions to be called from HTML
window.createNewDeck = createNewDeck;
window.drawCard = drawCard;