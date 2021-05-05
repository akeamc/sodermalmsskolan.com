import { motion, useTransform } from "framer-motion";
import React, {
  DetailedHTMLProps, FunctionComponent, HTMLAttributes, useRef,
} from "react";
import useRelativeViewportScroll from "../../lib/animation/hooks/useRelativeViewportScroll";

export interface ParallaxProps extends DetailedHTMLProps<
HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  xVelocity?: number;
  yVelocity?: number;
}

/**
 * A parallax container.
 *
 * @param {React.PropsWithChildren<ParallaxProps>} props Props.
 *
 * @returns {React.ReactElement} Parallax!
 */
const Parallax: FunctionComponent<ParallaxProps> = ({
  xVelocity = 0,
  yVelocity = 0.5,
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>();
  const scrollY = useRelativeViewportScroll(containerRef);
  const x = useTransform(scrollY, (value) => value * xVelocity);
  const y = useTransform(scrollY, (value) => value * yVelocity);

  return (
    <div {...props} ref={containerRef}>
      <motion.div style={{
        x,
        y,
      }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Parallax;
