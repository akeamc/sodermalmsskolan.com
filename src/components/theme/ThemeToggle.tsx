import React from "react";
import { useDarkMode } from "./useDarkMode";

export const ThemeToggle: React.FunctionComponent = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "dark" : "light"}
    </button>
  );
};
