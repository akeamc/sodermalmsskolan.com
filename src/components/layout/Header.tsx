import { Row } from "../grid/Row";
import { LeadText } from "../basic/Typography";
import { Navigation } from "../basic/Navigation";
import styled from "styled-components";

export interface HeaderProps {
  title: string;
  lead: string;
  image: string;
}

export const TextPane = styled.div`
  margin: calc(2 * var(--section-spacing)) 0;
  grid-column: span 12;

  @media (min-width: 768px) {
    grid-column: 7 / span 5;
  }
`;

export const ImagePane = styled.div<{ image: string }>`
  background-size: cover;
  background-position: center;
  background-image: ${({ image }) => `url(${image})`};
  grid-column: span 12;

  @media (min-width: 768px) {
    grid-column: 1 / span 5;
  }
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
`;

export const Lead = styled(LeadText)`
  margin: 0;
`;

export const SplitHeader: React.FunctionComponent<HeaderProps> = ({
  title,
  lead,
  image,
}) => {
  return (
    <>
      <Navigation />
      <div>
        <Row>
          <ImagePane image={image} />
          <TextPane>
            <Title>{title}</Title>
            <Lead>{lead}</Lead>
          </TextPane>
        </Row>
      </div>
    </>
  );
};
