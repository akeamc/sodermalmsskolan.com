import { motion, useTransform } from "framer-motion";
import React, { FunctionComponent, useRef } from "react";
import useTopOffset from "../../lib/animation/hooks/useTopOffset";

/**
 * Fade in and slide up on scroll.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} Rendered animation.
 */
const FadeIn: FunctionComponent = ({
  children,
}) => {
  const ref = useRef();
  const offsetTop = useTopOffset(ref, { viewportOffset: 1 });
  const progress = useTransform(offsetTop, [0, 250], [0, 1]);
  const y = useTransform(progress, [0, 1], [20, 0]);

  return (
    <motion.div
      style={{
        opacity: progress,
        y,
      }}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
