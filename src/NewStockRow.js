import React, { useRef, useEffect } from "react";
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
    setDealing,
  } = useAppState();

  let stockRef = useRef();
  const { gameNumber } = useAppState();

  function setStockBounds() {
    const stockRect = stockRef.current.getBoundingClientRect();
    console.log("stockRect:", stockRect);
    // const newFoundationStore = [...foundationStore];
    // newFoundationStore[foundationIndex].bounds = rowClientRect;
    // updateFoundationStore(newFoundationStore);
  }
  useEffect(setStockBounds, [gameNumber]);

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

  function timedDeal() {
    const deckCopy = [...wholeShuffledDeck];
    let n = 1;
    const tableauCopy = { ...tableauStore };
    while (n < 5) {
      Object.keys(tableauStore).forEach((key) => {
        const nextCard = deckCopy.pop(deckCopy.length - 1);
        nextCard.startLocation = key;
        tableauCopy[key] = [...tableauCopy[key], nextCard];
        updateTableauStore(tableauCopy);
        updateWholeDeck(deckCopy);
      });
      n += 1;
    }
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
    <div className="cardRow stockRow">
      <div
        className="cardPileAnchor stockPile"
        onClick={() => flip()}
        ref={stockRef}
      >
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
