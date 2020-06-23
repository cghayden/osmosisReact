import React, { useState, useEffect, createContext, useContext } from "react";
import { useDeal as deal } from "./useDeal";
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
  const [stock, updateStock] = useState([]);
  const [stockBounds, setStockBounds] = useState([]);
  const [discardPile, updateDiscardPile] = useState([]);

  const [foundationStore, updateFoundationStore] = useState([]);
  const [foundationStartValue, setStartValue] = useState();
  const [suitPlacements, updateSuitPlacements] = useState({});

  function dealNewGame() {
    setGameNumber((gameNumber) => (gameNumber += 1));
    updateStock(getShuffledDeck());

    // const { foundations, startValue } = deal();
    // updateFoundationStore(foundations);
    // setStartValue(startValue);
    updateDiscardPile([]);
    updateSuitPlacements({});
  }

  useEffect(dealNewGame, []);

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
        dealNewGame,
        suitPlacements,
        updateSuitPlacements,
        foundationStartValue,
        setStartValue,
        gameNumber,
        dealing,
        setDealing,
        stockBounds,
        setStockBounds,
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
