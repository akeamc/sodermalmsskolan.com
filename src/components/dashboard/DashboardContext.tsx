import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  Reducer,
  useContext,
  useReducer,
} from "react";

export interface DashboardState {
  showSidebar: boolean;
}

export type DashboardAction = {
  type: "setSidebarState",
  show: boolean;
};

const initialDashboardState: DashboardState = {
  showSidebar: false,
};

export type DashboardContextValue = [DashboardState, Dispatch<DashboardAction>];

const DashboardContext = createContext<DashboardContextValue>([
  initialDashboardState,
  () => {},
]);

// eslint-disable-next-line require-jsdoc
const reducer: Reducer<DashboardState, DashboardAction> = (previous, action) => {
  if (action.type === "setSidebarState") {
    return {
      ...previous,
      showSidebar: action.show,
    };
  }

  return previous;
};

/**
 * Dashboard context provider.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} The rendered provider.
 */
export const DashboardContextProvider: FunctionComponent = (props) => {
  const [state, dispatch] = useReducer(reducer, initialDashboardState);

  return (
    <DashboardContext.Provider value={[state, dispatch]} {...props} />
  );
};

// eslint-disable-next-line require-jsdoc
export const useDashboardContext = (): DashboardContextValue => useContext(DashboardContext);

export default DashboardContext;
