const suits = ["\u{2660}", "\u{2663}", "\u{2665}", "\u{2666}"];
const values = [
  "a",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

function makeDeck(suits, values) {
  const orderedDeck = [];
  let uid = 1;
  for (const suit of suits) {
    for (const value of values) {
      orderedDeck.push({ suit, value, uid });
      uid += 1;
    }
  }
  return orderedDeck;
}

function shuffleDeck(deck) {
  const shuffledDeck = [];
  const sourceDeck = [...deck];
  while (sourceDeck.length > 0) {
    const randomN = Math.floor(Math.random() * sourceDeck.length);
    const randomPick = sourceDeck.splice(randomN, 1);
    shuffledDeck.push(randomPick[0]);
  }
  return shuffledDeck;
}

// 1. make a deck
//2. shuffle the deck

function getShuffledDeck() {
  const orderedDeck = makeDeck(suits, values);
  return shuffleDeck(orderedDeck);
}

export { getShuffledDeck };
