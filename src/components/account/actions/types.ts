import { FunctionComponent } from "react";

export interface AccountActionProps {
  oobCode: string;
  continueUrl: string;
}

export type AccountAction = FunctionComponent<AccountActionProps>;
