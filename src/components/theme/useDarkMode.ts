import { StateSetter, usePersistedState } from "../../hooks/persistedstate";

export const useDarkMode = (): [boolean, StateSetter<boolean>] => {
  const [darkMode, setDarkMode] = usePersistedState<boolean>(
    "dark-mode",
    false
  );

  return [darkMode, setDarkMode];
};
