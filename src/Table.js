import React, { useContext } from "react";
import styled from "styled-components";
import TableauPile from "./TableauPile";
import FoundationRow from "./FoundationRow";
import StockRow from "./StockRow";
import { AppContext } from "./AppContext";

export default function Table() {
  const { foundationStore, tableauStore } = useContext(AppContext);

  return (
    <TableLayout>
      <TableauColumn>
        <TableauPile cards={tableauStore.t1} tid={"t1"} top={40} />
        <TableauPile cards={tableauStore.t2} tid={"t2"} top={180} />
        <TableauPile cards={tableauStore.t3} tid={"t3"} top={320} />
        <TableauPile cards={tableauStore.t4} tid={"t4"} top={460} />
      </TableauColumn>
      <div>
        {foundationStore.map((foundation, i) => (
          <FoundationRow key={i} cards={foundation.cards} foundationIndex={i} />
        ))}
      </div>
      <StockRow />
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
`;
