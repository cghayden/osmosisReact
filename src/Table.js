import React from "react";
import styled from "styled-components";
import TableauPile from "./TableauPile";
import FoundationRow from "./FoundationRow";
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

const tableaus = {
  t1: [
    { suit: "a", value: 20 },
    { suit: "b", value: 21 },
    { suit: "c", value: 22 },
    { suit: "d", value: 23 },
  ],
  t2: [
    { suit: "e", value: 24 },
    { suit: "f", value: 25 },
    { suit: "g", value: 26 },
    { suit: "h", value: 27 },
  ],
};
const stack = [
  { suit: "a", value: 20 },
  { suit: "b", value: 21 },
  { suit: "c", value: 22 },
  { suit: "d", value: 23 },
];

const foundations = {
  f1: {
    uid: "f1",
    rowSuit: "c",
    cards: [{ uid: "fc1", suit: "c", value: "0" }],
  },
  f2: { uid: "f2", rowSuit: "d", cards: [] },
  f3: { uid: "f3", rowSuit: "h", cards: [] },
  f4: { uid: "f4", rowSuit: "s", cards: [] },
};

export default function Table() {
  return (
    <TableLayout>
      <TableauColumn>
        <TableauPile cards={stack} />
      </TableauColumn>
      <div>
        {Object.keys(foundations).map((key) => (
          <FoundationRow key={key} cards={foundations[key].cards} />
        ))}
      </div>
    </TableLayout>
  );
}
