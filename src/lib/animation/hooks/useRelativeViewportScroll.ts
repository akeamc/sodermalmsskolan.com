import { MotionValue, useTransform, useViewportScroll } from "framer-motion";
import { MutableRefObject } from "react";
import useElementOffsets from "./useElementOffsets";
import useWindowDimensions from "./useWindowDimensions";

export interface RelativeViewportScrollOptions {
  /**
   * How much to shift the zero value, in number of viewport heights.
   */
  viewportOffset?: number;

  /**
   * How much to shift the zero value of the scroll in terms of target element heights.
   */
  targetOffset?: number;
}

/**
 * Framer Motion `useViewportScroll` adjusted to the element's top offset.
 *
 * @param {MutableRefObject<HTMLElement>} ref Target element.
 * @param {RelativeViewportScrollOptions} options Options.
 *
 * @returns {MotionValue<number>} Vertical scroll.
 */
const useRelativeViewportScroll = (
  ref: MutableRefObject<HTMLElement>,
  {
    viewportOffset = 0,
    targetOffset = 0,
  }: RelativeViewportScrollOptions = {},
): MotionValue<number> => {
  const { offsetTop, offsetHeight } = useElementOffsets(ref);
  const { height: viewportHeight = 0 } = useWindowDimensions();

  const { scrollY: viewportScrollY } = useViewportScroll();

  const scrollY = useTransform(viewportScrollY, (value) => {
    const zeroOffset = (viewportHeight * viewportOffset) - (offsetHeight * targetOffset);

    return value - offsetTop + zeroOffset;
  });

  return scrollY;
};

export default useRelativeViewportScroll;
