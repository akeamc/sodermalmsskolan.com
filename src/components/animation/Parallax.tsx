import { motion, useTransform } from "framer-motion";
import React, {
  DetailedHTMLProps, FunctionComponent, HTMLAttributes, useRef,
} from "react";
import useTopOffset, { UseTopOffsetOptions } from "../../lib/animation/hooks/useTopOffset";

export interface ParallaxProps extends DetailedHTMLProps<
HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  x?: number;
  y?: number;
  rotate?: number;
  scrollOptions?: UseTopOffsetOptions;
  staticOnMobile?: boolean;
}

/**
 * A parallax container.
 *
 * @param {React.PropsWithChildren<ParallaxProps>} props Props.
 *
 * @returns {React.ReactElement} Parallax!
 */
const Parallax: FunctionComponent<ParallaxProps> = ({
  x: xSpeed = 0,
  y: ySpeed = 0,
  rotate: rotationSpeed = 0,
  children,
  scrollOptions,
  staticOnMobile = false,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>();
  const scrollY = useTopOffset(containerRef, scrollOptions);
  const x = useTransform(scrollY, (value) => value * xSpeed);
  const y = useTransform(scrollY, (value) => value * ySpeed);
  const rotate = useTransform(scrollY, (value) => value * rotationSpeed);

  return (
    <div {...props} ref={containerRef}>
      <motion.div
        style={{
          x,
          y,
          rotate,
        }}
        className={staticOnMobile ? "to-md:!transform-none" : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Parallax;
