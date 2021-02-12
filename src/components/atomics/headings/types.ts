import { HTMLElementProps } from "../../../styles/overrides";

export type HeadingProps<
  P extends Record<string, unknown>,
> = HTMLElementProps<HTMLHeadingElement> & P;
