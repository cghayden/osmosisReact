import React, { useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import StockCardFront from "./StockCardFront";
import StockCardBack from "./StockCardBack";
import { useAppState } from "./AppContext";

export default function StockRow() {
  // const [flipCount, updateFlipCount] = useState(1);
  const { stock, discardPile, updateDiscardPile, updateStock } = useAppState();

  useEffect(() => {
    console.log("stock: ", stock);
    console.log("discard pile: ", discardPile);
  }, [stock, discardPile]);

  function resetStock() {
    const newStock = [...discardPile].reverse();
    updateStock(newStock);
    updateDiscardPile([]);
  }
  function flip1() {
    const stockCopy = [...stock];
    const discardPileCopy = [...discardPile];
    const next1 = stockCopy.splice(stockCopy.length - 1);
    updateDiscardPile([...discardPileCopy, ...next1]);
    updateStock(stockCopy);
  }

  function flip2() {
    const stockCopy = [...stock];
    const last2 = stockCopy.splice(stockCopy.length - 2);
    updateStock(stockCopy);
    const discardCopy = [...discardPile, ...last2];
    updateDiscardPile(discardCopy);
  }
  function flip3() {
    const stockCopy = [...stock];
    const last3 = stockCopy.splice(stockCopy.length - 3).reverse();
    updateStock(stockCopy);
    const discardCopy = [...discardPile, ...last3];
    updateDiscardPile(discardCopy);
  }

  function flip() {
    if (stock.length === 0) {
      console.log("flip reset:");
      resetStock();
      return;
    }
    if (stock.length === 1) {
      console.log("flip1:");
      flip1();
      return;
    }
    if (stock.length === 2) {
      console.log("flip2:");
      flip2();
      return;
    }
    if (stock.length > 3 || stock.length === 3) {
      console.log("flip3:");
      flip3();
      return;
    }
  }
  return (
    <div className="cardRow stockRow">
      <div className="cardPileAnchor stockPile" onClick={() => flip()}>
        {/* <EmptyStock /> */}
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
    </div>
  );
}
const EmptyStock = styled.div`
  position: absolute;
  left: 0;
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background-color: pink;
`;
