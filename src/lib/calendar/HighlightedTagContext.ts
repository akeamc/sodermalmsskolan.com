import {
  createContext,
  useContext,
} from "react";
import { ReactState } from "../state/state";

export type HighlightedTagContextData = ReactState<string>;

export const HighlightedTagContext = createContext<HighlightedTagContextData>(null);

export const { Provider: HighlightedTagProvider } = HighlightedTagContext;

export const useHighlightedTag = (): HighlightedTagContextData => useContext(HighlightedTagContext);
