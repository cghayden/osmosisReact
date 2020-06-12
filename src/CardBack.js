import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

export default function CardBack({ i }) {
  return (
    <CardBackDiv
      offset={`${i * 5}px`}
      key={"back"}
      exit={{ rotateY: 90, translateX: -40, scale: 1.1 }}
      transition={{ duration: 0.2 }}
    />
  );
}

const CardBackDiv = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background-color: aqua;
  transform-style: preserve-3d;
`;
