import { MotionValue, useTransform, useViewportScroll } from "framer-motion";
import { MutableRefObject } from "react";
import useWindowDimensions from "./useWindowDimensions";

export interface UseTopOffsetOptions {
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
 * @param {UseTopOffsetOptions} options Options.
 *
 * @returns {MotionValue<number>} Vertical scroll.
 */
const useTopOffset = (
  ref: MutableRefObject<HTMLElement>,
  {
    viewportOffset = 0,
    targetOffset = 0,
  }: UseTopOffsetOptions = {},
): MotionValue<number> => {
  const { height: viewportHeight = 0 } = useWindowDimensions();

  const { scrollY: viewportScrollY } = useViewportScroll();

  const scrollY = useTransform(viewportScrollY, () => {
    const rect = ref.current?.getBoundingClientRect();
    const top = rect?.top ?? 0;
    const height = rect?.height ?? 0;

    const zeroOffset = (viewportHeight * viewportOffset) - (height * targetOffset);

    return zeroOffset - top;
  });

  return scrollY;
};

export default useTopOffset;
