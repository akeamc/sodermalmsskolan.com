import { Card, CardContent } from "../basic/Card";
import React from "react";
import { SinglePeriod } from "../../lib/schedule/Period";
import styled, { keyframes } from "styled-components";
import { transparentize } from "polished";
import { useTime } from "../../lib/hooks/time";

const SubjectName = styled.h2``;

const waveAnimation = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-256px);
  }
`;

const WaveContainer = styled.div`
  overflow: hidden;
  height: 64px;
  padding-top: 64px;
`;

const WaveFigure = styled.svg`
  animation: ${waveAnimation} 5s linear infinite;
  width: calc(100% + 256px);
`;

const WavePath = styled.path<{ $color: string }>`
  fill: ${({ $color }) => transparentize(0.9, $color)};

  @media (prefers-color-scheme: dark) {
    fill: ${({ $color }) => transparentize(0.75, $color)};
  }
`;

const Waves: React.FunctionComponent<{ color: string }> = ({ color }) => {
  return (
    <WaveContainer>
      <WaveFigure width="100%" height="64">
        <defs>
          <pattern
            id="waves"
            x="0"
            y="0"
            width="256"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <WavePath
              d="m 0 32 C 64 32 64 0 128 0 C 192 0 192 32 256 32 L 256 64 L 0 64 z"
              stroke="none"
              $color={color}
            />
          </pattern>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#waves)" />
      </WaveFigure>
    </WaveContainer>
  );
};

// const Waves = styled.div<{ $color: string }>`
//   height: 12rem;
//   width: 100%;
//   position: relative;
//   overflow: hidden;
//   border-radius: 0 0 8px 8px;

//   &::after {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: -256px;
//     height: 64px;
//     background-image: url("data:image/svg+xml;utf8,${({ $color }) =>
//       waveSvg(transparentize(0.9, $color))}");
//     background-repeat: repeat-x;
//     content: "";
//     animation: ${waveAnimation} 5s infinite linear;

//     @media (prefers-color-scheme: dark) {
//       background-image: url("data:image/svg+xml;utf8,${({ $color }) =>
//         waveSvg(transparentize(0.75, $color))}");
//     }
//   }
// `;

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
