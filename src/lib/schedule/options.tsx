import React, {
  createContext,
  FunctionComponent,
  useContext,
} from "react";
import { ReactState } from "../state/ReactState";
import usePersistedState from "../state/usePersistedState";
import { CHOICES } from "./choice";

export interface ScheduleOptions {
  selectedCollections: Record<string, string>,
}

export type ScheduleContextInner = ReactState<ScheduleOptions>;

export const ScheduleContext = createContext<ScheduleContextInner>(null);

const { Provider } = ScheduleContext;

/**
 * Use the data provided by the schedule context.
 *
 * @returns {ScheduleContextInner} The data.
 */
export const useScheduleContext = (): ScheduleContextInner => useContext(ScheduleContext);

export const defaultSelectedCollections = Object.fromEntries(
  CHOICES.map(({ id, collections }) => [id, collections[0].id]),
);

/**
 * Provider for the schedule context with options for the schedule.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} The provider.
 */
export const ScheduleContextProvider: FunctionComponent = (props) => {
  const initialState: ScheduleOptions = {
    selectedCollections: defaultSelectedCollections,
  };

  const state = usePersistedState<ScheduleOptions>("scheduleOptions", initialState);

  return <Provider value={state} {...props} />;
};
