import React, {
  createContext,
  FunctionComponent,
  useContext,
} from "react";
import { ReactState } from "../state/state";
import usePersistedState from "../state/usePersistedState";
import { CHOICE_NAMES } from "./choice";

export interface ScheduleOptions {
  collectionFilter: string[],
}

export type ScheduleContextInner = ReactState<ScheduleOptions>;

export const ScheduleContext = createContext<ScheduleContextInner>(null);

const { Provider } = ScheduleContext;

export const useScheduleContext = (): ScheduleContextInner => useContext(ScheduleContext);

export const ScheduleContextProvider: FunctionComponent = (props) => {
  const state = usePersistedState<ScheduleOptions>("schedule-options", {
    collectionFilter: CHOICE_NAMES,
  });

  return <Provider value={state} {...props} />;
};
