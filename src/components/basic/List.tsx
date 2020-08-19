import styled from "styled-components";

export const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 0;

    &::before {
      content: "";
      padding: 0;
      margin: 0;
      display: none;
    }
  }
`;
