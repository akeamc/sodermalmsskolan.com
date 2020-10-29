import styled from "styled-components";
import { ProgressiveImage } from "./ProgressiveImage";

export const Image = styled(ProgressiveImage)<{ borderRadius?: number }>`
  border-radius: ${(props) => props.borderRadius || "1rem"};
  width: 100%;
`;
