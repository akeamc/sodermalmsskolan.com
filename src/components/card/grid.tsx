import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";
import { Base } from "../grid/Base";
import { Col } from "../grid/Col";

interface CardGridProps {
  cards: ReactNode[];
}

const Grid = styled(Base)`
  grid-gap: 1rem;
`;

const CardGrid: FunctionComponent<CardGridProps> = ({ cards }) => {
  return (
    <Grid>
      {cards?.map((card, index) => (
        <Col key={index} xs={12} md={6} lg={4}>
          {card}
        </Col>
      ))}
    </Grid>
  );
};

export default CardGrid;
