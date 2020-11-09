import styled from "styled-components";
import React from "react";
import Link from "next/link";
import * as breakpoints from "../../styles/breakpoints";
import { lighten, transparentize } from "polished";
import { motion } from "framer-motion";

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

export const IconButton = styled(motion.a)<{ $disabled?: boolean }>`
  background-color: transparent;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.border : theme.colors.primary};
  display: inline-block;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.1s ease;

  &:hover {
    background-color: ${({ theme, $disabled }) =>
      !$disabled &&
      transparentize(theme.dark ? 0.75 : 0.9, theme.colors.primary)};
  }

  svg {
    height: 1.5em;
    width: 1.5em;
    display: block;
  }
`;

export const StyledButton = styled.a<{
  $secondary?: boolean;
  $background?: string;
  $foreground?: string;
  $height: number;
}>`
  display: inline-block;
  box-sizing: border-box;
  background-color: ${({ theme, $background }) =>
    $background || theme.colors.primary};
  color: ${({ theme, $foreground }) => $foreground || theme.colors.background};
  padding: 0 ${({ $height }) => `${$height / 2}rem`};
  border-radius: ${({ $height }) => `${$height / 2}rem`};
  line-height: ${({ $height }) => `${$height}rem`};
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $background }) =>
      lighten(0.1, $background || theme.colors.primary)};

    ${ButtonIcon} {
      transform: translateX(4px);
    }
  }

  ${({ $secondary, theme, $foreground, $background }) =>
    $secondary &&
    `
    background-color: ${transparentize(
      theme.dark ? 0.75 : 0.9,
      $background || theme.colors.primary
    )};
    color: ${$foreground || theme.colors.foreground};

    &:hover {
      background-color: ${transparentize(
        theme.dark ? 0.5 : 0.75,
        $background || theme.colors.primary
      )};
    }
  `}
`;

export interface ButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  secondary?: boolean;
  large?: boolean;
  href?: string;
  foreground?: string;
  background?: string;
  icon?: React.ReactNode;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  secondary,
  large,
  href,
  children,
  foreground,
  background,
  icon,
  ...rest
}) => {
  const height = large ? 3.5 : 3;

  const button = (
    <StyledButton
      $secondary={secondary}
      $height={height}
      $foreground={foreground}
      $background={background}
      {...rest}
    >
      {children}
      {icon && <ButtonIcon>{icon}</ButtonIcon>}
    </StyledButton>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        {button}
      </Link>
    );
  } else {
    return button;
  }
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
