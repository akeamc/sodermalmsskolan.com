import styled from "styled-components";
import { GenericUser } from "../../../lib/models/User";
import { useProgressiveImage } from "../ProgressiveImage";

interface CardMeta {
  authors?: GenericUser[];
  date: Date;
}

export const Card = styled.div`
  background-color: var(--background);
  box-shadow: var(--shadow-small);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease;
  overflow: hidden;

  &:hover {
    box-shadow: var(--shadow-hover);
  }
`;

export const CardHero = styled.div<{ backgroundImage?: string }>`
  min-height: 240px;
  background: var(--accents-2);
  background-size: cover;
  background-position: center;
  background-image: ${(props) =>
    props.backgroundImage &&
    `url("${useProgressiveImage(props.backgroundImage).src}")`};
`;

export const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const CardFooter = styled.div`
  padding: 12px 24px;
  border-top: 1px solid var(--accents-2);
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--accents-6);
  }
`;
