import styled from "styled-components";
import { motion } from "framer-motion";

const CardFront = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid darkgreen;
  box-shadow: 1px 1px 3px 0px hsl(120, 50%, 15%);
  background: var(--cardBackground);
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
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
const CardTopCorner = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 19px;
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  align-items: center;
  padding-top: 2px;
  padding-left: 0px;
  margin-left: -5px;
  p {
    padding: 0;
    margin: 0;
  }
`;

const CardBottomCorner = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 19px;
  grid-column: 3;
  grid-row: 2;
  align-self: end;
  align-items: center;
  padding-top: 2px;
  padding-left: 0px;
  margin-right: -6px;
  transform: rotateX(180deg) rotateY(180deg);
  p {
    padding: 0;
    margin: 0;
  }
`;

const CardFace = styled.div`
  grid-row: 1/-1;
  grid-column: 1/-1;
  place-self: center;
`;
const CardFaceFont = styled.p`
  font-size: 25px;
  /* padding: 18px 0 0 0; */
`;
const CardBack = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  box-shadow: 1px 2px 3px 0px hsl(120, 50%, 15%),
    -1px 1px 3px 0px hsl(120, 50%, 29%);
  transform-style: preserve-3d;
  background: blue;
`;

export {
  CardFaceFont,
  CardFront,
  CardFace,
  CardTopCorner,
  CardBottomCorner,
  CardBack,
};
