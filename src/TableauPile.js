import React from "react";
import TableauCard from "./TableauCard";
// import { useAppState } from "./AppContext";

export default function TableauPile({ cards = [], tid, top }) {
  // let tabRef = useRef();
  // const { gameNumber, tabBounds, setTabBounds } = useAppState();

  // function setBounds() {
  //   const tabRect = tabRef.current.getBoundingClientRect();
  //   const newTabBounds = { ...tabBounds, [tid]: tabRect };
  //   console.log("newTabBounds:", newTabBounds);
  //   setTabBounds(newTabBounds);
  // }

  // useEffect(setBounds, [gameNumber]);

  return (
    <div className="cardRow">
      {/* <div className="cardPileAnchor" ref={tabRef}> */}
      {cards.map((card, i) => {
        const left = i * 2 + 40;
        if (i === cards.length - 1) {
          return (
            <TableauCard
              key={i}
              i={i}
              card={card}
              tid={tid}
              top={top}
              left={left}
            />
          );
        } else {
          return (
            <TableauCard
              facedown={true}
              key={i}
              i={i}
              card={card}
              tid={tid}
              top={top}
              left={left}
            />
          );
        }
      })}
      {/* </div> */}
    </div>
  );
}
