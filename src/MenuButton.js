import React from "react";
import styled from "styled-components";

export default function MenuButton({ toggleOptions }) {
  return (
    <ShowMenuButton
      onClick={() => toggleOptions((showOptions) => !showOptions)}
    >
      Menu
    </ShowMenuButton>
  );
}

const ShowMenuButton = styled.button`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  width: 80px;
  height: 40px;
  background: darkgreen;
  color: white;
  font-size: 22px;
  grid-column: 1/-1;
  justify-self: center;
  z-index: calc(var(--optionsZx) + 1);
`;
