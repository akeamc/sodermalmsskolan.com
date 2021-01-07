import { SerializedStyles } from "@emotion/react";

export interface StackProps {
  spacing?: string;
}

export type StackStyles = (props: StackProps) => SerializedStyles;
