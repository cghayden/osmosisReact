import React, { useContext, useState } from "react";
import styled from "styled-components";
import TableauPile from "./TableauPile";
import FoundationRow from "./FoundationRow";
import StockRow from "./StockRow";
import { AppContext } from "./AppContext";
import Options from "./Options";
import MenuToggler from "./MenuToggler";

export default function Table() {
  const { foundationStore, tableauStore } = useContext(AppContext);
  const [showOptions, toggleOptions] = useState(false);

  return (
    <TableLayout>
      <TableauColumn>
        <TableauPile cards={tableauStore.t1} tid={"t1"} top={40} />
        <TableauPile cards={tableauStore.t2} tid={"t2"} top={180} />
        <TableauPile cards={tableauStore.t3} tid={"t3"} top={320} />
        <TableauPile cards={tableauStore.t4} tid={"t4"} top={460} />
      </TableauColumn>
      <div className="foundations">
        {foundationStore.map((foundation, i) => {
          const top = i * 140 + 40;
          return (
            <FoundationRow
              key={i}
              cards={foundation.cards}
              foundationIndex={i}
              top={top}
            />
          );
        })}
      </div>
      <StockRow />
      <MenuToggler onClick={() => toggleOptions(!showOptions)} />
      <Options open={showOptions} toggleOptions={toggleOptions} />
    </TableLayout>
  );
}

const TableLayout = styled.div`
  background: green;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-template-rows: 580px 140px;
`;
const TableauColumn = styled.div`
  border-right: 2px solid darkgreen;
`;
