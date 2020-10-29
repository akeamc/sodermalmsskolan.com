import styled from "styled-components";
import React from "react";
import Link from "next/link";
import * as breakpoints from "../../styles/breakpoints";
import { lighten, transparentize } from "polished";

const ButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  margin-top: -4px;
  margin-left: 1em;
  transition: transform 0.2s ease-in-out;

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

export const StyledButton = styled.a<{
  $secondary?: boolean;
  $height: number;
}>`
  display: inline-block;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0 ${({ $height }) => `${$height / 2}rem`};
  border-radius: ${({ $height }) => `${$height / 2}rem`};
  line-height: ${({ $height }) => `${$height}rem`};
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => lighten(0.1, theme.colors.primary)};

    ${ButtonIcon} {
      transform: translateX(4px);
    }
  }

  ${({ $secondary, theme }) =>
    $secondary &&
    `
    background-color: ${transparentize(0.9, theme.colors.primary)};;
    color: ${theme.colors.foreground};

    &:hover {
      background-color: ${transparentize(0.75, theme.colors.primary)};
    }
  `}
`;

export interface ButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  secondary?: boolean;
  colored?: boolean;
  large?: boolean;
  href: string;
  icon?: React.ReactNode;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  secondary,
  colored,
  large,
  href,
  children,
  icon,
  ...rest
}) => {
  const height = large ? 3.5 : 3;

  return (
    <Link href={href} passHref>
      <StyledButton $secondary={secondary} $height={height} {...rest}>
        {children}
        {icon && <ButtonIcon>{icon}</ButtonIcon>}
      </StyledButton>
    </Link>
  );
};

export const ButtonRow = styled.div<{ center?: boolean }>`
  display: inline-flex;
  flex-wrap: wrap;
  margin: -12px;
  justify-content: center;

  @media (min-width: ${breakpoints.large}) {
    justify-content: normal;
  }

  ${({ center }) =>
    center &&
    `
    justify-content: center;
  `}

  a {
    margin: 12px;
  }
`;
