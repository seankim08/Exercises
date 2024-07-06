function getJSON(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}

let deckId;

function createNewDeck() {
    return getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(response => {
            deckId = response.deck_id;
            document.getElementById('draw-card').disabled = false;
        })
        .catch(error => {
            console.error('Error creating new deck:', error);
        });
}

function drawCard() {
    return getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => {
            if (response.remaining === 0) {
                document.getElementById('draw-card').disabled = true;
            }
            const card = response.cards[0];
            displayCard(card);
        })
        .catch(error => {
            console.error('Error drawing card:', error);
        });
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