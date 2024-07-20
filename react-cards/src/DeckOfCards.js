import React, { useState, useEffect } from 'react';
import Card from './Card';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

function DeckOfCards() {
  const [deckId, setDeckId] = useState(null);
  const [card, setCard] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function createNewDeck() {
      const response = await fetch(`${API_BASE_URL}/new/shuffle/`);
      const data = await response.json();
      setDeckId(data.deck_id);
      setRemaining(data.remaining);
    }
    createNewDeck();
  }, []);

  async function drawCard() {
    if (remaining === 0) {
      alert("Error: no cards remaining!");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/${deckId}/draw/`);
    const data = await response.json();
    setCard(data.cards[0]);
    setRemaining(data.remaining);
  }

  async function shuffleDeck() {
    setIsShuffling(true);
    const response = await fetch(`${API_BASE_URL}/${deckId}/shuffle/`);
    const data = await response.json();
    setRemaining(data.remaining);
    setCard(null);
    setIsShuffling(false);
  }

  return (
    <div>
      <button onClick={drawCard} disabled={!deckId || isShuffling}>
        Draw a card
      </button>
      <button onClick={shuffleDeck} disabled={!deckId || isShuffling}>
        Shuffle Deck
      </button>
      {card && <Card card={card} />}
      <p>Cards remaining: {remaining}</p>
    </div>
  );
}

export default DeckOfCards;