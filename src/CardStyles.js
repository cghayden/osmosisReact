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
  grid-template-columns: 20px 1fr;
  place-items: center;
  border-radius: 5px;
  z-index: ${(props) => (props.foundation ? 0 : 100)};
  backface-visibility: hidden;
  color: ${(props) => (props.red ? "red" : "black")};

  .value,
  .suit {
    margin: 0;
  }
`;
const CardCorner = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  padding-top: 4px;
  padding-left: 4px;
  p {
    padding: 0;
    margin: 0;
  }
`;
const FullCardFaceDiv = styled.div`
  grid-row: 1/-1;
  grid-column: 1/-1;
  place-self: center;
`;
const CardFont = styled.p`
  font-size: 22px;
`;

export { CardFont, CardFront, FullCardFaceDiv, CardCorner };
