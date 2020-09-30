import styled from "styled-components";
import React from "react";

export const LeadText = styled.h2`
  font-size: 1.25rem;
  line-height: 1.6em;
  letter-spacing: -0.02em;
  color: var(--accents-4);
  font-weight: 400;
  margin-top: 24px;
`;

export const brightTextStyles = `--foreground: white;
color: var(--foreground);
--accents-1: rgba(255, 255, 255, 0.95);
--accents-2: rgba(255, 255, 255, 0.9);
--accents-3: rgba(255, 255, 255, 0.85);
--accents-4: rgba(255, 255, 255, 0.8);
--accents-5: rgba(255, 255, 255, 0.75);
--accents-6: rgba(255, 255, 255, 0.7);
--accents-7: rgba(255, 255, 255, 0.65);
--accents-8: rgba(255, 255, 255, 0.6);`;

export const TextColorModifier = styled.div<{ bright?: boolean }>`
  ${({ bright }) => bright && brightTextStyles}
`;

export const GridTitleContainer = styled.div`
  margin-bottom: 24px;
`;

export const GridTitle = styled.h3`
  --size-sm: 2rem;
  --size-md: 2rem;
  --size-lg: 2.5rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 16px;
`;

export const GridDescription = styled.p`
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
