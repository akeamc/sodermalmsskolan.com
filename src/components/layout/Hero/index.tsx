import styled from "styled-components";
import { Section } from "../Section";

export const Hero = styled(Section)`
  margin-top: var(--section-spacing);
`;

export const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.foreground};
`;
