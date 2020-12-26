import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export type HighlightedTagContextData = [
  string,
  Dispatch<SetStateAction<string>>,
];

export const HighlightedTagContext = createContext<HighlightedTagContextData>(null);

export const { Provider: HighlightedTagProvider } = HighlightedTagContext;

export const useHighlightedTag = (): HighlightedTagContextData => useContext(HighlightedTagContext);
