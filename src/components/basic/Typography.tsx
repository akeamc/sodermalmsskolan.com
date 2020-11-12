import styled from "styled-components";
import React from "react";
import { motion } from "framer-motion";
import { lighten } from "polished";
import { FullPageWrapper } from "../layout/Container";

export const LeadText = styled.h2`
  font-size: 1.25rem;
  line-height: 1.6em;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 400;
  margin-top: 24px;
`;

export const GridTitleContainer = styled.div`
  margin-bottom: 24px;
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

export const Muted = styled(motion.p)`
  color: ${({ theme }) => theme.colors.muted};
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
