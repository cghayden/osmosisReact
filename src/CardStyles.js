import styled from "styled-components";
import { motion } from "framer-motion";

const CardFront = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid darkgreen;
  box-shadow: 1px 2px 3px 0px hsl(120, 50%, 15%);
  background: var(--cardBackground);
  display: grid;
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
  /* border: 1px solid darkgreen; */
  box-shadow: 1px 2px 3px 0px hsl(120, 50%, 15%),
    -1px 1px 3px 0px hsl(120, 50%, 29%);

  /* background-color: var(--intersectingCircles-background);
  background-image: var(--intersectingCirles-image); */
  transform-style: preserve-3d;
  background: linear-gradient(45deg, blue, lightskyblue);
  /* background-color: #aaa;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23777' fill-opacity='0.7' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"); */
`;

export {
  CardFaceFont,
  CardFront,
  CardFace,
  CardTopCorner,
  CardBottomCorner,
  CardBack,
};
