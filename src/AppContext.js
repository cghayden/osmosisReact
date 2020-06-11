import React, { useState, useEffect, createContext, useContext } from "react";
import { useDeal as deal } from "./useDeal";
const AppContext = createContext(null);

function AppStateProvider({ children }) {
  const [draggedCard, setDraggedCard] = useState({ card: null, from: null });
  const [foundationStore, updateFoundationStore] = useState([]);
  const [tableauStore, updateTableauStore] = useState();
  const [stockStore, updateStock] = useState();
  const [discardPile, updateDiscardPile] = useState([]);
  const [foundationStartValue, setStartValue] = useState();
  const [suitPlacements, updateSuitPlacements] = useState({});
  const [foundationRefs, setFoundationRefs] = useState([]);

  function dealNewGame() {
    const { foundations, stock, tableaus, startValue } = deal();
    updateFoundationStore(foundations);
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
        foundationRefs,
        setFoundationRefs,
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
