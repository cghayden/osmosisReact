import styled from "styled-components";

const CardFont = styled.p`
  font-size: 22px;
  color: ${(props) => (props.red ? "red" : "black")};
`;

export default CardFont;
