import { Card, CardContent } from "../basic/Card";
import React from "react";
import { SinglePeriod } from "../../lib/schedule/Period";
import styled, { keyframes } from "styled-components";
import { transparentize } from "polished";
import { useTime } from "../../lib/hooks/time";
import moment from "moment";

const SubjectName = styled.h2``;

const waveSvg = (
  color: string
) => `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="64">
<path d="m 0 32 C 64 32 64 0 128 0 C 192 0 192 32 256 32 L 256 64 L 0 64 z" stroke="none" fill="${color}"/>
</svg>`;

const waveAnimation = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-256px);
  }
`;

const Waves = styled.div<{ color: string }>`
  height: 12rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 8px 8px;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: -256px;
    height: 64px;
    background-image: url("data:image/svg+xml;utf8,${({ color }) =>
      waveSvg(transparentize(0.9, color))}");
    background-repeat: repeat-x;
    content: "";
    animation: ${waveAnimation} 5s infinite linear;

    @media (prefers-color-scheme: dark) {
      background-image: url("data:image/svg+xml;utf8,${({ color }) =>
        waveSvg(transparentize(0.75, color))}");
    }
  }
`;

export const PeriodCard: React.FunctionComponent<{
  period: SinglePeriod;
  groupName: string;
}> = ({ period }) => {
  const now = useTime(1000);

  const timeLeft = period.start.nextAbsolute(now).from(now);

  return (
    <Card hoverable={false}>
      <CardContent>
        <SubjectName>Nästa lektion: {period.subject.name}</SubjectName>
        <p>
          {period.subject.name} {period.start.format()}–{period.end.format()} i{" "}
          {period.room} ({timeLeft}).
        </p>
      </CardContent>
      <Waves color={period.subject.color} />
    </Card>
  );
};
