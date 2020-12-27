import React, {
  createContext,
  FunctionComponent,
  useContext,
} from "react";
import { ReactState } from "../state/state";
import usePersistedState from "../state/usePersistedState";
import { CHOICES } from "./choice";

export interface ScheduleOptions {
  selectedCollections: Record<string, string>,
}

export type ScheduleContextInner = ReactState<ScheduleOptions>;

export const ScheduleContext = createContext<ScheduleContextInner>(null);

const { Provider } = ScheduleContext;

export const useScheduleContext = (): ScheduleContextInner => useContext(ScheduleContext);

export const defaultSelectedCollections = Object.fromEntries(
  CHOICES.map(({ id, collections }) => [id, collections[0].id]),
);

export const ScheduleContextProvider: FunctionComponent = (props) => {
  const initialState: ScheduleOptions = {
    selectedCollections: defaultSelectedCollections,
  };

  const state = usePersistedState<ScheduleOptions>("scheduleOptions", initialState);

  return <Provider value={state} {...props} />;
};
