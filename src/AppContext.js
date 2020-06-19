import React, { useState, useEffect, createContext, useContext } from "react";
import { useDeal as deal } from "./useDeal";
import { getShuffledDeck } from "./makeShuffledDeck";
const AppContext = createContext(null);

function AppStateProvider({ children }) {
  const [foundationStore, updateFoundationStore] = useState([]);
  const [tableauStore, updateTableauStore] = useState({
    t1: [],
    t2: [],
    t3: [],
    t4: [],
  });
  const [stock, updateStock] = useState([]);
  const [discardPile, updateDiscardPile] = useState([]);
  const [foundationStartValue, setStartValue] = useState();
  const [suitPlacements, updateSuitPlacements] = useState({});
  const [gameNumber, setGameNumber] = useState(1);
  const [wholeShuffledDeck, updateWholeDeck] = useState([]);

  // useEffect(() => {
  //   const wholeShuffledDeck = getShuffledDeck();
  //   setNewDeck(wholeShuffledDeck);
  // }, [gameNumber]);

  function dealNewGame() {
    updateWholeDeck(getShuffledDeck());
    // const { foundations, stock, tableaus, startValue } = deal();
    // updateFoundationStore(foundations);
    // updateTableauStore(tableaus);
    // updateStock(stock);
    // updateDiscardPile([]);
    // setStartValue(startValue);
    // updateSuitPlacements({});
    // setGameNumber((gameNumber) => (gameNumber += 1));
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
        gameNumber,
        wholeShuffledDeck,
        updateWholeDeck,
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
