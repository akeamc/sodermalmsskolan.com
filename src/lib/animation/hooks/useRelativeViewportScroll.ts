import { MotionValue, useTransform, useViewportScroll } from "framer-motion";
import { MutableRefObject } from "react";
import useElementOffsets from "./useElementOffsets";

/**
 * Framer Motion `useViewportScroll` adjusted to the element's top offset.
 *
 * @param {MutableRefObject<HTMLElement>} ref Target element.
 *
 * @returns {MotionValue<number>} Vertical scroll.
 */
const useRelativeViewportScroll = (ref: MutableRefObject<HTMLElement>): MotionValue<number> => {
  const { offsetTop } = useElementOffsets(ref);

  const { scrollY: viewportScrollY } = useViewportScroll();

  const scrollY = useTransform(viewportScrollY, (value) => value - offsetTop);

  return scrollY;
};

export default useRelativeViewportScroll;
