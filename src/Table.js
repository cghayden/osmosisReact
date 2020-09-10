import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import TableauPile from "./TableauPile";
import FoundationRow from "./FoundationRow";
import StockRow from "./StockRow";
import { AppContext } from "./AppContext";
import Options from "./Options";
import MenuToggler from "./MenuToggler";

export default function Table() {
  const { foundationStore, tableauStore, gameNumber } = useContext(AppContext);
  const [showOptions, toggleOptions] = useState(false);
  const [cardWidth, setCardWidth] = useState(98);

  let cardSizeRef = useRef();

  function setCardSize() {
    const cardSize = cardSizeRef.current.getBoundingClientRect();
    const measuredCardWidth = cardSize.right - cardSize.left;
    setCardWidth(measuredCardWidth);
  }
  useEffect(setCardSize, [gameNumber]);

  return (
    <TableLayout>
      <div className="hiddenCard" ref={cardSizeRef} />
      <TableauColumn>
        <TableauPile cards={tableauStore.t1} tid={"t1"} />
        <TableauPile cards={tableauStore.t2} tid={"t2"} />
        <TableauPile cards={tableauStore.t3} tid={"t3"} />
        <TableauPile cards={tableauStore.t4} tid={"t4"} />
      </TableauColumn>
      <FoundationColumn>
        {foundationStore.map((foundation, i) => {
          return (
            <FoundationRow
              cardWidth={cardWidth}
              key={i}
              cards={foundation.cards}
              foundationIndex={i}
            />
          );
        })}
      </FoundationColumn>
      <StockRow />
      <MenuToggler onClick={() => toggleOptions(!showOptions)} />
      <Options open={showOptions} toggleOptions={toggleOptions} />
    </TableLayout>
  );
}

const TableLayout = styled.div`
  padding-top: 20px;
  max-width: 660px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  @media all and (max-width: 480px) {
    padding-top: 60px;
  }
`;
const TableauColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, calc(var(--cardHeight) * 1.3));
  align-items: center;
  width: var(--tabColumnWidth);
  @media all and (max-width: 480px) {
    grid-template-rows: repeat(4, calc(var(--cardHeight) * 1.4));
  }
`;
const FoundationColumn = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, calc(var(--cardHeight) * 1.3));
  align-items: center;
  padding-left: 25px;

  @media all and (max-width: 480px) {
    padding-left: 2vw;
    grid-template-rows: repeat(4, calc(var(--cardHeight) * 1.4));
  }
`;
