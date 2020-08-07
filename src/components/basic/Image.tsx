import styled from "styled-components";

export const Image = styled.img<{ borderRadius: number }>`
  border-radius: ${(props) => props.borderRadius || "8px"};
  width: 100%;
`;
