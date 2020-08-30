import styled from "styled-components";
import React from "react";

const PeriodContainer = styled.div<{ color: string }>`
  padding: 1.25rem 1rem;
  box-sizing: border-box;
  border-left: 2px solid ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* The "color" property is a hex code. */
  ${({ color }) => `
    background-color: ${color}1f;
  `}
`;

const PeriodText = styled.div`
  display: flex;
  justify-content: space-between;
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
      <PeriodText>
        <Detail>{start}</Detail>
        <Detail>{title}</Detail>
        <Detail>{room}</Detail>
      </PeriodText>
    </PeriodContainer>
  );
};
