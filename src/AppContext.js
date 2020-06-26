import React, { useState, createContext, useContext } from "react";
import wait from "waait";
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

  function dealTableaus() {
    const stockCopy = [...stock];
    const newTableau = {
      t1: [],
      t2: [],
      t3: [],
      t4: [],
    };
    let n = 1;
    while (n < 5) {
      Object.keys(newTableau).forEach((key) => {
        const nextCard = stockCopy.pop();
        nextCard.startLocation = key;
        newTableau[key] = [...newTableau[key], nextCard];
      });
      n += 1;
    }
    updateTableauStore(newTableau);
    updateStock(stockCopy);
  }

  function setF1() {
    const stockCopy = [...stock];
    const f1 = stockCopy.pop();
    const foundations = [
      { suit: f1.suit, cards: [f1], bounds: {} },
      { suit: null, cards: [], bounds: {} },
      { suit: null, cards: [], bounds: {} },
      { suit: null, cards: [], bounds: {} },
    ];
    updateFoundationStore(foundations);
    setStartValue(f1.value);
    updateStock(stockCopy);
  }

  function clearTable() {
    updateDiscardPile([]);
    updateSuitPlacements({});
    updateFoundationStore([]);
    updateStock(getShuffledDeck());
  }

  async function firstDeal() {
    dealTableaus();
    await wait(500);
    setF1();
    setDealing(false);
  }

  async function newDeal() {
    setGameNumber((gameNumber) => (gameNumber += 1));
    //get new 52 card shuffled deck
    await wait(500);
    // 1 clear table
    clearTable();
    await wait(500);

    // 2 deal tableaus
    dealTableaus();
    //3 deal foundation
    await wait(500);
    console.log("tableau store:", tableauStore);

    setF1();

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
        suitPlacements,
        updateSuitPlacements,
        foundationStartValue,
        setStartValue,
        gameNumber,
        dealing,
        setDealing,
        stockBounds,
        setStockBounds,
        newDeal,
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

// return new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("finished dealing");
//   }, 1000);
// });
