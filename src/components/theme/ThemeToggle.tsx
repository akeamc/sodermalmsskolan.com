import React from "react";
import { Moon, Sun } from "react-feather";
import styled from "styled-components";
import { useDarkMode } from "./useDarkMode";

const Switch = styled.button`
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: block;
  color: ${({ theme }) => theme.colors.muted};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }

  svg {
    display: block;
    stroke: currentColor;
  }
`;

export const ThemeToggle: React.FunctionComponent = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <Switch onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <Moon /> : <Sun />}
    </Switch>
  );
};
