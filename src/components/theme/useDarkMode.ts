import { Dispatch, SetStateAction } from "react";
import { usePersistedState } from "../../hooks/persistedstate";

export const useDarkMode = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [darkMode, setDarkMode] = usePersistedState<boolean>(
    "dark-mode",
    false
  );

  return [darkMode, setDarkMode];
};
