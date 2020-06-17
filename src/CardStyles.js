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
  font-size: 14px;
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
const CardBack = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background-color: var(--cardBack);
  background-image: repeating-linear-gradient(
      transparent,
      transparent 50px,
      purple 50px,
      purple 53px,
      transparent 53px,
      transparent 63px,
      purple 63px,
      purple 66px,
      transparent 66px,
      transparent 116px,
      rgba(0, 0, 0, 0.5) 116px,
      rgba(0, 0, 0, 0.5) 166px,
      rgba(255, 255, 255, 0.2) 166px,
      rgba(255, 255, 255, 0.2) 169px,
      rgba(0, 0, 0, 0.5) 169px,
      rgba(0, 0, 0, 0.5) 179px,
      rgba(255, 255, 255, 0.2) 179px,
      rgba(255, 255, 255, 0.2) 182px,
      rgba(0, 0, 0, 0.5) 182px,
      rgba(0, 0, 0, 0.5) 232px,
      transparent 232px
    ),
    repeating-linear-gradient(
      270deg,
      transparent,
      transparent 50px,
      purple 50px,
      purple 53px,
      transparent 53px,
      transparent 63px,
      purple 63px,
      purple 66px,
      transparent 66px,
      transparent 116px,
      rgba(0, 0, 0, 0.5) 116px,
      rgba(0, 0, 0, 0.5) 166px,
      rgba(255, 255, 255, 0.2) 166px,
      rgba(255, 255, 255, 0.2) 169px,
      rgba(0, 0, 0, 0.5) 169px,
      rgba(0, 0, 0, 0.5) 179px,
      rgba(255, 255, 255, 0.2) 179px,
      rgba(255, 255, 255, 0.2) 182px,
      rgba(0, 0, 0, 0.5) 182px,
      rgba(0, 0, 0, 0.5) 232px,
      transparent 232px
    );
  transform-style: preserve-3d;
`;

export { CardFont, CardFront, FullCardFaceDiv, CardCorner, CardBack };
