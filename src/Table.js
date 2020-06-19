import React from "react";
import styled from "styled-components";
import TableauPile from "./TableauPile";
import FoundationRow from "./FoundationRow";
import StockRow from "./StockRow";
import NewStockRow from "./NewStockRow";
import { useAppState } from "./AppContext";

export default function Table() {
  const { foundationStore, tableauStore = {}, dealNewGame } = useAppState();

  return (
    <TableLayout>
      <TableauColumn>
        <button onClick={() => dealNewGame()}>New Game</button>
        {Object.keys(tableauStore).map((key) => (
          <TableauPile key={key} cards={tableauStore[key]} />
        ))}
      </TableauColumn>
      <div>
        {foundationStore.map((foundation, i) => (
          <FoundationRow key={i} cards={foundation.cards} foundationIndex={i} />
        ))}
      </div>
      {/* <StockRow /> */}
      <NewStockRow />
    </TableLayout>
  );
}

const TableLayout = styled.div`
  background: green;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-template-rows: 4fr 2fr;
  padding: 20px 0;
`;
const TableauColumn = styled.div`
  border-right: 2px solid darkgreen;
  display: flex;
  flex-direction: column;
  place-items: center;
`;
