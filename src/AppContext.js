import React, { useState, useEffect, createContext, useContext } from "react";
import { useDeal as deal } from "./useDeal";
const AppContext = createContext(null);

function AppStateProvider({ children }) {
  const [foundationStore, updateFoundationStore] = useState([]);
  const [tableauStore, updateTableauStore] = useState();
  const [stockStore, updateStock] = useState();
  const [discardPile, updateDiscardPile] = useState([]);
  const [foundationStartValue, setStartValue] = useState();
  const [suitPlacements, updateSuitPlacements] = useState({});
  const [gameNumber, setGameNumber] = useState(1);

  function dealNewGame() {
    const { foundations, stock, tableaus, startValue } = deal();
    updateFoundationStore(foundations);
    updateTableauStore(tableaus);
    updateStock(stock);
    updateDiscardPile([]);
    setStartValue(startValue);
    updateSuitPlacements({});
    setGameNumber((gameNumber) => (gameNumber += 1));
  }

  useEffect(dealNewGame, []);

  return (
    <AppContext.Provider
      value={{
        foundationStore,
        updateFoundationStore,
        tableauStore,
        updateTableauStore,
        stockStore,
        updateStock,
        discardPile,
        updateDiscardPile,
        dealNewGame,
        suitPlacements,
        updateSuitPlacements,
        foundationStartValue,
        gameNumber,
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
