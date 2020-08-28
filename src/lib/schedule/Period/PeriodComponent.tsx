import styled from "styled-components";
import React from "react";

const PeriodContainer = styled.div<{ color: string }>`
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 2px solid ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* The "color" property is a hex code. */
  ${({ color }) => `
    background-color: ${color}1f;
  `}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Header = styled(Row)``;

const Footer = styled(Row)`
  flex-direction: row-reverse;
`;

const Detail = styled.small``;

export const PeriodComponent: React.FunctionComponent<{
  start: string;
  end: string;
  room: string;
  title: string;
  color: string;
}> = ({ start, end, room, title, color }) => {
  return (
    <PeriodContainer color={color}>
      <Header>
        <Detail>{start}</Detail>
        <Detail>{room}</Detail>
      </Header>
      <p>{title}</p>
      <Footer>
        <Detail>{end}</Detail>
      </Footer>
    </PeriodContainer>
  );
};
