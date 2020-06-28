import React, { useState, createContext, useContext, useEffect } from "react";
import { dealDeck } from "./dealDeck";
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
  const [stock, updateStock] = useState();
  const [stockBounds, setStockBounds] = useState([]);
  const [discardPile, updateDiscardPile] = useState([]);
  const [foundationStore, updateFoundationStore] = useState([]);
  const [foundationStartValue, setStartValue] = useState();
  const [suitPlacements, updateSuitPlacements] = useState({});

  // function placeTabCard(tabKey, card) {
  // }

  useEffect(firstDeal, []);

  async function firstDeal() {
    const { tQ, foundations, stock: st, startValue: sv } = dealDeck();
    updateStock(st);
    const tabKeys = [
      "t1",
      "t2",
      "t3",
      "t4",
      "t1",
      "t2",
      "t3",
      "t4",
      "t1",
      "t2",
      "t3",
      "t4",
      "t1",
      "t2",
      "t3",
      "t4",
    ];

    const tableauStoreCopy = { ...tableauStore };
    const dealInterval = setInterval(function () {
      if (!tabKeys.length) {
        clearInterval(dealInterval);
        updateFoundationStore(foundations);
        setStartValue(sv);
        setDealing(false);
      } else {
        const card = tQ.pop();
        const tabKey = tabKeys.pop();
        card.startLocation = tabKey;
        tableauStoreCopy[tabKey] = tableauStoreCopy[tabKey].concat(card);
        updateTableauStore((tableauStore) => ({
          ...tableauStore,
          [tabKey]: tableauStore[tabKey].concat(card),
        }));
      }
    }, 100);
  }

  async function clearTable() {
    const emptyTableau = {
      t1: [],
      t2: [],
      t3: [],
      t4: [],
    };
    updateTableauStore(emptyTableau);
    updateDiscardPile([]);
    updateSuitPlacements({});
    updateFoundationStore([]);
    updateStock([]);
  }

  async function newDeal() {
    setDealing(true);
    setGameNumber((gameNumber) => (gameNumber += 1));
    // 1 clear table
    clearTable();
    await wait(200);
    firstDeal();
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
        firstDeal,
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

// async function deal() {
//   const dealInterval =
//   const stockCopy = getShuffledDeck();
//   const newTableau = {
//     t1: [],
//     t2: [],
//     t3: [],
//     t4: [],
//   };
//   let n = 1;
//   while (n < 5) {
//     Object.keys(newTableau).forEach((key) => {
//       const nextCard = stockCopy.pop();
//       nextCard.startLocation = key;
//       newTableau[key] = [...newTableau[key], nextCard];
//     });
//     n += 1;
//   }
//   updateTableauStore(newTableau);
//   // console.log("stockCopy:", stockCopy);
//   updateStock(stockCopy);
//   await wait(200);
//   const f1 = stockCopy.pop();
//   const foundations = [
//     { suit: f1.suit, cards: [f1], bounds: {} },
//     { suit: null, cards: [], bounds: {} },
//     { suit: null, cards: [], bounds: {} },
//     { suit: null, cards: [], bounds: {} },
//   ];
//   updateFoundationStore(foundations);
//   setStartValue(f1.value);
// }
