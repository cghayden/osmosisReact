import React from "react";
import { AnimatePresence } from "framer-motion";
import StockCardFront from "./StockCardFront";
import StockCardBack from "./StockCardBack";
import { useAppState } from "./AppContext";

export default function StockRow() {
  const {
    stock,
    discardPile,
    updateDiscardPile,
    updateStock,
    wholeShuffledDeck,
    tableauStore,
    updateTableauStore,
    updateWholeDeck,
  } = useAppState();

  // useEffect(() => {
  //   console.log("stock: ", stock);
  //   console.log("discard pile: ", discardPile);
  // }, [stock, discardPile]);

  function resetStock() {
    const newStock = [...discardPile].reverse();
    updateStock(newStock);
    updateDiscardPile([]);
  }

  function flipCards(count) {
    const stockCopy = [...stock];
    const discardPileCopy = [...discardPile];
    const nextCards = stockCopy.splice(stockCopy.length - count);
    updateDiscardPile([...discardPileCopy, ...nextCards]);
    updateStock(stockCopy);
  }

  function flip() {
    if (stock.length === 0) {
      resetStock();
      return;
    }
    if (stock.length === 1) {
      flipCards(1);
      return;
    }
    if (stock.length === 2) {
      flipCards(2);
      return;
    }
    if (stock.length > 3 || stock.length === 3) {
      flipCards(3);
      return;
    }
  }

  function animateDeal() {
    const deckCopy = [...wholeShuffledDeck];
    let n = 1;
    const tableauCopy = { ...tableauStore };
    while (n < 5) {
      console.log("looping,", n);
      console.log("tableauCopy:", tableauCopy);
      Object.keys(tableauStore).forEach((key) => {
        const nextCard = deckCopy.pop(deckCopy.length - 1);
        tableauCopy[key] = [...tableauCopy[key], nextCard];
        // debugger;
        updateTableauStore(tableauCopy);
        updateWholeDeck(deckCopy);
      });
      n += 1;
    }
  }

  return (
    <div className="cardRow stockRow">
      <div className="cardPileAnchor stockPile" onClick={() => flip()}>
        <AnimatePresence>
          {wholeShuffledDeck
            .slice(wholeShuffledDeck.length - 4)
            .map((card, i) => (
              <StockCardBack key={card.uid} i={i} card={card} />
            ))}
        </AnimatePresence>
      </div>
      <div className="cardPileAnchor">
        {discardPile.map((card, i) => {
          return <StockCardFront key={card.uid} i={i} card={card} />;
        })}
      </div>
      <button onClick={() => animateDeal()}>Deal</button>
    </div>
  );
}
