import styled from "styled-components";
import { Section } from "../Section";
import { TextColorModifier } from "../../basic/Typography";

export const Hero = styled(Section)`
  margin-top: var(--section-spacing);
`;

export const HeroBackground = styled(TextColorModifier)<{
  backgroundImage?: string;
}>`
  background-image: ${(props) =>
    props.backgroundImage ? `url(${props.backgroundImage})` : ""};
  background-size: cover;
  background-position: center;
  overflow: auto;
  min-height: 500px;
`;
