import styled from "styled-components";

export const LeadText = styled.h2`
  font-size: 1.25rem;
  line-height: 1.6em;
  letter-spacing: -0.02em;
  color: var(--accents-4);
  font-weight: 400;
  margin-top: 24px;
`;

export const TextColorModifier = styled.div<{ bright?: boolean }>`
  ${({ bright }) =>
    bright &&
    `
    --foreground: white;
    color: var(--foreground);
    --accents-1: rgba(255, 255, 255, 0.95);
    --accents-2: rgba(255, 255, 255, 0.9);
    --accents-3: rgba(255, 255, 255, 0.85);
    --accents-4: rgba(255, 255, 255, 0.8);
    --accents-5: rgba(255, 255, 255, 0.75);
    --accents-6: rgba(255, 255, 255, 0.7);
    --accents-7: rgba(255, 255, 255, 0.65);
    --accents-8: rgba(255, 255, 255, 0.6);
  `}
`;

export const GradientText = styled.span<{
  startColor: string;
  endColor: string;
}>`
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: ${({ startColor, endColor }) =>
    `linear-gradient(90deg, ${startColor}, ${endColor});`};
`;

export const GridTitleContainer = styled.div`
  margin-bottom: 24px;
`;

export const GridTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const GridDescription = styled.p`
  margin: 0;
`;

export const GridTitleSection: React.FunctionComponent<{
  title: string | JSX.Element;
  description?: string | JSX.Element;
}> = ({ title, description }) => {
  return (
    <GridTitleContainer>
      <GridTitle>{title}</GridTitle>
      {description ? <GridDescription>{description}</GridDescription> : null}
    </GridTitleContainer>
  );
};

export const SmallBig = styled.h6`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 12px;
  line-height: 1.5em;
  font-weight: 700;
  color: var(--foreground);
`;
