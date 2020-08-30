import styled from "styled-components";
import React from "react";
import { transparentize } from "polished";

const PeriodContainer = styled.div<{ color: string }>`
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  border-left: 2px solid ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ color }) => `
    background-color: ${transparentize(0.9, color)};

    @media (prefers-color-scheme: dark) {
      background-color: ${transparentize(0.75, color)};
    }
  `}
`;

const PeriodRow = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
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
      <PeriodRow>
        <Detail>{title}</Detail>
        <Detail>{room}</Detail>
      </PeriodRow>
      <PeriodRow>
        <Detail>{start}</Detail>
        <Detail>{end}</Detail>
      </PeriodRow>
    </PeriodContainer>
  );
};
