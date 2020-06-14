import React from "react";
import { AnimatePresence } from "framer-motion";
import StockCard from "./StockCard";
import StockCardBack from "./StockCardBack";
import { useAppState } from "./AppContext";

export default function StockRow() {
  const { stock = [], discardPile = [] } = useAppState();

  return (
    <div className="cardRow stockRow">
      <div className="cardPileAnchor stockPile">
        {[...stock].splice(stock.length - 4).map((card, i) => {
          return (
            <AnimatePresence>
              <StockCardBack i={i} key={card.uid} />;
            </AnimatePresence>
          );
        })}
      </div>
      <div className="cardPileAnchor">
        {discardPile.map((card, i) => {
          return <StockCard key={card.uid} i={i} card={card} />;
        })}
      </div>
    </div>
  );
}
