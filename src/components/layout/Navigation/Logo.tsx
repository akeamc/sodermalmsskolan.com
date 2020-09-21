import { Logo, SmallLogo } from "../../basic/Logo";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import * as breakpoints from "../../../styles/breakpoints";

const Container = styled.a`
  height: 2rem;
  display: flex;
  align-items: center;
  color: inherit;
  transition: fill 0.2s;
`;

const Big = styled(Logo)`
  height: 1rem;
  fill: currentColor;
  display: none;

  @media (min-width: ${breakpoints.medium}) {
    display: block;
  }
`;

const Small = styled(SmallLogo)`
  height: 2rem;
  fill: currentColor;

  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

export const NavLogo: React.FunctionComponent = () => {
  return (
    <Link href="/" passHref>
      <Container>
        <Big />
        <Small />
      </Container>
    </Link>
  );
};
