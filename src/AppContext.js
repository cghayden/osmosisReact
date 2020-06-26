import React, { useState, useEffect, createContext, useContext } from "react";
// import { useDeal as deal } from "./useDeal";
import { getShuffledDeck } from "./makeShuffledDeck";
const AppContext = createContext(null);

function AppStateProvider({ children }) {
  const [gameNumber, setGameNumber] = useState(1);
  const [dealing, setDealing] = useState(true);
  const [tableauStore, updateTableauStore] = useState({
    t1: [],
    t2: [],
    t3: [],
    t4: [],
  });
  const [stock, updateStock] = useState(getShuffledDeck());
  const [stockBounds, setStockBounds] = useState([]);
  const [discardPile, updateDiscardPile] = useState([]);
  const [foundationStore, updateFoundationStore] = useState([]);
  const [foundationStartValue, setStartValue] = useState();
  const [suitPlacements, updateSuitPlacements] = useState({});

  function timedDeal() {
    // updateStock(getShuffledDeck());
    setGameNumber((gameNumber) => (gameNumber += 1));
    updateDiscardPile([]);
    updateSuitPlacements({});
    const stockCopy = [...stock];
    const tableauCopy = { ...tableauStore };

    //create the tableau piles
    let n = 1;
    while (n < 5) {
      Object.keys(tableauStore).forEach((key) => {
        const nextCard = stockCopy.pop();
        nextCard.startLocation = key;
        tableauCopy[key] = [...tableauCopy[key], nextCard];
        updateTableauStore(tableauCopy);
      });
      n += 1;
    }
    console.log("loop finished, time to deal f1: stockCopy:", stockCopy);
    // set/deal first foundation startingCard and set startValue for subsequent foundations
    const f1 = stockCopy.pop();
    const foundations = [
      { suit: f1.suit, cards: [f1], bounds: {} },
      { suit: null, cards: [], bounds: {} },
      { suit: null, cards: [], bounds: {} },
      { suit: null, cards: [], bounds: {} },
    ];
    updateFoundationStore(foundations);
    setStartValue(f1.value);

    // mark start location of each card left in stock ? -> see useDeal.js
    // ...
    updateStock(stockCopy);

    //set an empty promise in order to await this function, to delay the setting of dealing state.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("finished dealing");
      }, 1000);
    });
  }

  async function animateDeal() {
    await timedDeal();
    //after deal is finished, set dealing to false so this state can be passed to tableau cards to orient their initial x,y location as being from the tableau pile, rather than the stock.
    setDealing(false);
  }

  return (
    <AppContext.Provider
      value={{
        foundationStore,
        updateFoundationStore,
        tableauStore,
        updateTableauStore,
        stock,
        updateStock,
        discardPile,
        updateDiscardPile,
        // dealNewGame,
        suitPlacements,
        updateSuitPlacements,
        foundationStartValue,
        setStartValue,
        gameNumber,
        dealing,
        setDealing,
        stockBounds,
        setStockBounds,
        animateDeal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppState() {
  const allState = useContext(AppContext);
  return allState;
}

export { AppStateProvider, AppContext, useAppState };
