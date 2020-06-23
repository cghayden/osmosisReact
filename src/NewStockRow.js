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
    tableauStore,
    updateTableauStore,
    setDealing,
    setStockBounds,
    updateFoundationStore,
    setStartValue,
  } = useAppState();

  let stockRef = useRef();
  const { gameNumber } = useAppState();

  function setStockBoundsInContext() {
    const stockRect = stockRef.current.getBoundingClientRect();
    setStockBounds(stockRect);
  }

  useEffect(setStockBoundsInContext, [gameNumber]);

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

  function delay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("one card dealt");
      }, 1000);
    });
  }
  function timedDeal() {
    const stockCopy = [...stock];
    const tableauCopy = { ...tableauStore };
    //create the tableau piles
    let n = 1;
    while (n < 5) {
      Object.keys(tableauStore).forEach((key) => {
        const nextCard = stockCopy.pop();
        nextCard.startLocation = key;
        tableauCopy[key] = [...tableauCopy[key], nextCard];
        updateTableauStore(tableauCopy);
      });
      n += 1;
    }
    console.log("loop finished, time to deal f1: stockCopy:", stockCopy);
    // set/deal first foundation startingCard and set startValue for subsequent foundations
    const f1 = stockCopy.pop();
    const foundations = [
      { suit: f1.suit, cards: [f1], bounds: {} },
      { suit: null, cards: [], bounds: {} },
      { suit: null, cards: [], bounds: {} },
      { suit: null, cards: [], bounds: {} },
    ];
    updateFoundationStore(foundations);
    setStartValue(f1.value);

    // mark start location of each card left in stock ? -> see useDeal.js
    // ...
    updateStock(stockCopy);

    //set an empty promise in order to await this function, to delay the setting of dealing state.
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
          {stock.slice(stock.length - 4).map((card, i) => (
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
