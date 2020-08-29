import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useAppState } from "./AppContext";
import CloseButton from "./CloseButton";
const variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
  // closed: { y: "100vh" },
  // open: { y: 100 },
};

export default function Options({ open, toggleOptions }) {
  const { newDeal } = useAppState();

  return (
    <AnimatePresence>
      {open && (
        <OptionsPanel
          variants={variants}
          initial={"closed"}
          animate={"open"}
          exit={"closed"}
          transition={{ duration: 0.2 }}
        >
          <div className="optionsBody">
            <div className="optionsHeader">
              <CloseButton
                onClick={() => toggleOptions((showOptions) => !showOptions)}
              />
            </div>

            <OptionButtons>
              <ul>
                <button
                  onClick={() => {
                    toggleOptions(false);
                    newDeal();
                  }}
                >
                  Deal A New Game
                </button>
                {/* <button onClick={() => console.log("clicked option2")}>
    Option2
    </button>
    */}
              </ul>
            </OptionButtons>
            <h1>Osmosis Solitaire</h1>
            <div></div>
            <p className="directions">
              In Osmosis, the game begins with four reserve piles and one card
              in the first foundation. The goal of the game is to move all cards
              to the foundations. Foundations are built by suit, in any order,
              Foundations two, three, and four must start with the same rank as
              the first card in the first foundation, and a card can only be
              played in foundations two, three, and four if the rank of that
              card is already in the foundation immediately above it. Cards are
              dealt from the stock three at a time, and you can recycle the
              stock as many times as you like until you have no more plays, or
              you win the game. Good luck!
            </p>
          </div>
        </OptionsPanel>
      )}
    </AnimatePresence>
  );
}

const OptionsPanel = styled(motion.div)`
  position: fixed;
  height: 100%;
  background: var(--modalOverlay);
  padding: 20px 20px;
  z-index: var(--optionsZx);

  .optionsBody {
    height: 90vh;
    background: whitesmoke;
    color: black;
    border-radius: 5px;
    padding: 10px;
    h1 {
      padding: 20px 0;
      margin: 0;
      text-align: center;
    }
    .optionsHeader {
      height: 30px;
      display: grid;
      place-items: end;
    }
    .directions {
      line-height: 2;
      margin: 0;
    }
  }
`;

const OptionButtons = styled.div`
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    button {
      border-radius: 5px;
      padding: 5px 15px;
      color: whitesmoke;
      background: green;
      font-size: 16px;
      border: none;
    }
  }
`;
