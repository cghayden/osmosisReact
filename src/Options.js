import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAppState } from "./AppContext";

const variants = {
  closed: { translateY: 200 },
  open: { translateY: 0 },
};

export default function Options({ open, toggleOptions }) {
  const { animateDeal } = useAppState();

  return (
    <OptionsPanel
      variants={variants}
      initial={"open"}
      animate={open ? "open" : "open"}
      transition={{ duration: 0.3 }}
    >
      <ul>
        <button
          onClick={() => {
            toggleOptions(false);
            animateDeal();
          }}
        >
          Deal
        </button>
        <button onClick={() => console.log("clicked option2")}>Option2</button>
        <button onClick={() => console.log("clicked option3")}>Option3</button>
        <button onClick={() => console.log("clicked option4")}>Option4</button>
      </ul>
    </OptionsPanel>
  );
}

const OptionsPanel = styled(motion.div)`
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100vw;
  background: whitesmoke;
  ul {
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
