import styled from "styled-components";
import { motion } from "framer-motion";

const CardFront = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background: var(--cardBackground);
  display: grid;
  /* grid-template-rows: repeat(3, calc(var(--cardHeight) / 3) px); */
  grid-template-rows: 1fr 1fr;
  grid-template-columns: calc(var(--cardWidth) * 0.4) 1fr calc(
      var(--cardWidth) * 0.4
    );
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
  font-size: calc(var(--cardHeight) * 0.18);
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
  font-size: calc(var(--cardHeight) * 0.18);
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
  font-size: calc(var(--cardHeight) * 0.24);
  /* padding: 18px 0 0 0; */
`;
const CardBack = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background-color: var(--cardBack);
  transform-style: preserve-3d;
`;

export {
  CardFaceFont,
  CardFront,
  CardFace,
  CardTopCorner,
  CardBottomCorner,
  CardBack,
};
