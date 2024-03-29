import React, { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import StockCardFront from './StockCardFront';
import StockCardBack from './StockCardBack';
import { useAppState } from './AppContext';

export default function StockRow() {
  const {
    stock = [],
    updateStock,
    setStockBounds,
    discardPile,
    updateDiscardPile,
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
    const nextCards = stockCopy.splice(stockCopy.length - count).reverse();
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
  return (
    <StockRowDiv>
      <div
        className='cardPileAnchor stockPileAnchor'
        onClick={() => flipCards(1)}
        ref={stockRef}
      >
        <AnimatePresence>
          {stock.slice(stock.length - 4).map((card, i) => (
            <StockCardBack
              key={card.uid}
              i={i}
              card={card}
              className='ladybird'
            />
          ))}
        </AnimatePresence>
      </div>
      <div className='cardPileAnchor discardPile'>
        {discardPile.map((card, i) => {
          return (
            <StockCardFront
              key={card.uid}
              i={i}
              card={card}
              drag={i === discardPile.length - 1 ? true : false}
            />
          );
        })}
      </div>
    </StockRowDiv>
  );
}

const StockRowDiv = styled.div`
  padding-left: 40px;
  display: flex;
  align-self: start;
  grid-column: 1/-1;
  @media all and (max-width: 480px) {
    padding-top: 40px;
  }
`;

const StockPile = styled.div`
  justify-self: right;
  background: url('restart-26-white.png') center no-repeat;
`;
