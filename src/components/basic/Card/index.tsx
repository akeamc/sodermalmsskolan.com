import { motion } from "framer-motion";
import styled from "styled-components";
import { useProgressiveImage } from "../ProgressiveImage";
import { Muted } from "../Typography";

export const Card = styled(motion.div)<{ $hoverable?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.small};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  overflow: hidden;

  &:hover {
    ${({ $hoverable = true }) => $hoverable && `transform: translateY(-4px)`}
  }
`;

export const CardLink = styled.a`
  display: flex;
  color: inherit;
  height: 100%;

  ${Card} {
    height: 100%;
    flex: 1;
  }
`;

export const CardHero = styled.div<{ backgroundImage?: string }>`
  min-height: 15rem;
  background: ${({ theme }) => theme.colors.border};
  background-size: cover;
  background-position: center;
  background-image: ${(props) =>
    props.backgroundImage &&
    `url("${useProgressiveImage(props.backgroundImage).src}")`};
`;

export const CardPadding = "1.5rem";

export const CardContent = styled.div`
  padding: ${CardPadding};
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const CardFooter = styled.div`
  padding: calc(${CardPadding} / 2) ${CardPadding};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const CardTitle = styled.h3``;

export const CardDescription = styled(Muted)`
  margin-bottom: 0;
`;
