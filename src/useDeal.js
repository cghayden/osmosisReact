// 2660 = spades, 2663 = clubs, 2665 = hearts, 2666 = diamonds
function useDeal() {
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

  function dealCards(suits, values) {
    // 1. make a deck
    const orderedDeck = makeDeck(suits, values);
    //2. shuffle the deck
    const shuffledDeck = shuffleDeck(orderedDeck);

    //3. assemble tableaus and set them to store
    const tableau1 = shuffledDeck.splice(0, 4);
    tableau1.forEach((card) => (card.startLocation = "t1"));
    const tableau2 = shuffledDeck.splice(0, 4);
    tableau2.forEach((card) => (card.startLocation = "t2"));

    const tableau3 = shuffledDeck.splice(0, 4);
    tableau3.forEach((card) => (card.startLocation = "t3"));

    const tableau4 = shuffledDeck.splice(0, 4);
    tableau4.forEach((card) => (card.startLocation = "t4"));

    const tableaus = { t1: tableau1, t2: tableau2, t3: tableau3, t4: tableau4 };

    //4. set foundations, with next card in shuffledDeck as the first card in the first foundation
    const f1 = shuffledDeck.shift();
    const foundations = [
      { suit: f1.suit, cards: [f1], bounds: {} },
      { suit: null, cards: [], bounds: {} },
      { suit: null, cards: [], bounds: {} },
      { suit: null, cards: [], bounds: {} },
    ];
    //5. set remainder of suffledDeck to stock
    const stock = shuffledDeck;
    stock.forEach((card) => (card.startLocation = "s"));
    // return foundations and stock to pass down to Table
    const startValue = foundations[0].cards[0].value;
    return {
      foundations,
      stock,
      tableaus,
      startValue,
    };
  }
  const { foundations, stock, tableaus, startValue } = dealCards(suits, values);

  return { foundations, stock, tableaus, startValue };
}

export { useDeal };
