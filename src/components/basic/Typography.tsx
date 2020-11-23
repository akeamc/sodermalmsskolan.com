import styled, { css } from "styled-components";
import React from "react";
import { motion } from "framer-motion";
import { lighten } from "polished";
import { FullPageWrapper } from "../layout/Container";

export const leadText = css`
  --size-sm: 1rem;
  --size-md: 1rem;
  --size-lg: 1.25rem;
  --size-xl: 1.25rem;
  line-height: 1.5;
  letter-spacing: -0.02em;
  font-weight: 400;
`;

export const mutedText = css`
  color: ${({ theme }) => theme.colors.muted};
`;

export const LeadText = styled.h2`
  ${leadText};
  ${mutedText};
  margin-top: 1.5rem;
`;

export const GridTitleContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const GridTitle = styled.h3`
  --size-sm: 2rem;
  --size-md: 2rem;
  --size-lg: 2.5rem;
  --size-xl: 2.5rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 16px;
`;

export const wideText = css`
  letter-spacing: 2px;
  font-size: 0.8125rem;
  text-transform: uppercase;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Muted = styled(motion.p)`
  ${mutedText};
`;

export const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => lighten(0.25, theme.colors.primary)};
  }
`;

export const GridDescription = styled(Muted)`
  margin: 0;
  line-height: 1.6;
  font-size: 0.875rem;
`;

export const GridTitleSection: React.FunctionComponent<{
  title: React.ReactNode;
  description?: React.ReactNode;
}> = ({ title, description }) => {
  return (
    <GridTitleContainer>
      <GridTitle>{title}</GridTitle>
      {description ? <GridDescription>{description}</GridDescription> : null}
    </GridTitleContainer>
  );
};

export const FullPageText: React.FunctionComponent<React.HTMLAttributes<
  HTMLParagraphElement
>> = ({ children }) => {
  return (
    <FullPageWrapper>
      <p>{children}</p>
    </FullPageWrapper>
  );
};
