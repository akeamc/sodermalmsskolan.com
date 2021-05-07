import classNames from "classnames";
import { animate } from "framer-motion";
import React, {
  DetailedHTMLProps, FunctionComponent, HTMLAttributes, useEffect, useRef,
} from "react";

type SpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export interface CounterProps extends SpanProps {
  from?: number;
  to: number | number[];
  decimals?: number;
  duration?: number;
}

/**
 * Count up to a value, with tabular numbers!
 *
 * @param {React.PropsWithChildren<CounterProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered counter.
 */
const Counter: FunctionComponent<CounterProps> = ({
  from = 0,
  to,
  duration = 2,
  decimals = 1,
  className,
  ...props
}) => {
  const ref = useRef<HTMLSpanElement>();

  useEffect(() => {
    const node = ref.current;

    const controls = animate(from, to, {
      duration,
      onUpdate: (value) => {
        if (node) {
          node.textContent = value.toLocaleString(undefined, {
            maximumFractionDigits: decimals,
          });
        }
      },
    });

    return () => controls.stop();
  }, [decimals, duration, from, to]);

  return (
    <span className={classNames("tabular-nums", className)} ref={ref} {...props} />
  );
};

export default Counter;
