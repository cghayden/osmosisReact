import React, { useState, useEffect, createContext, useContext } from "react";
import { useDeal as deal } from "./useDeal";
const AppContext = createContext(null);

function AppStateProvider({ children }) {
  const [draggedCard, setDraggedCard] = useState({ card: null, from: null });
  const [foundationStore, updateFoundations] = useState();
  const [tableauStore, updateTableauStore] = useState();
  const [stockStore, updateStock] = useState();
  const [discardPile, updateDiscardPile] = useState([]);
  const [foundationStartValue, setStartValue] = useState();
  const [suitPlacements, updateSuitPlacements] = useState({});

  function dealNewGame() {
    const { foundations, stock, tableaus, startValue } = deal();
    updateFoundations(foundations);
    updateTableauStore(tableaus);
    updateStock(stock);
    updateDiscardPile([]);
    setStartValue(startValue);
  }

  useEffect(dealNewGame, []);

  return (
    <AppContext.Provider
      value={{
        draggedCard,
        setDraggedCard,
        foundationStore,
        updateFoundations,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppState() {
  const allState = useContext(AppContext);
  // console.log("context:", allState);
  return allState;
}

export { AppStateProvider, AppContext, useAppState };
