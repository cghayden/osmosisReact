import React from "react";
import styled from "styled-components";

export default function MenuToggler(props) {
  return (
    <div {...props} role="button">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>
  );
}

const XSvg = styled.div`
  /* position: fixed;
  right: 30px;
  top: 50%;
  transform: translate3d(-50%, 0, 0); */
`;
