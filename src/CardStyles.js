import styled from "styled-components";
import { motion } from "framer-motion";

const CardFront = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background: white;
  display: grid;
  grid-template-rows: repeat(2, 50px);
  place-items: center;
  border-radius: 5px;
  z-index: ${(props) => (props.foundation ? 0 : 100)};
  backface-visibility: hidden;
`;

const CardFont = styled.p`
  font-size: 22px;
  color: ${(props) => (props.red ? "red" : "black")};
`;

export { CardFont, CardFront };
