import React, { useState, useEffect, createContext, useContext } from "react";
import { useDeal as deal } from "./useDeal";
const AppContext = createContext(null);

const { foundations, stock, tableaus } = deal();
// console.log("foundations:", foundations);

function AppStateProvider({ children }) {
  const [draggedCard, setDraggedCard] = useState({ card: null, from: null });
  const [foundationStore, updateFoundations] = useState();
  const [tableauStore, updateTableauStore] = useState();
  const [stockStore, updateStock] = useState();
  const [discardPile, updateDiscardPile] = useState([]);

  function dealNewGame() {
    const { foundations, stock, tableaus } = deal();
    updateFoundations(foundations);
    updateTableauStore(tableaus);
    updateStock(stock);
    updateDiscardPile([]);
  }

  useEffect(() => {
    updateFoundations(foundations);
    updateTableauStore(tableaus);
    updateStock(stock);
  }, []);
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
