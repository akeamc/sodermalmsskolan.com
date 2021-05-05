import { MotionValue, useTransform, useViewportScroll } from "framer-motion";
import {
  MutableRefObject, useCallback, useEffect, useState,
} from "react";

/**
 * Framer Motion `useViewportScroll` adjusted to the element's top offset.
 *
 * @param {MutableRefObject<HTMLElement>} ref Target element.
 *
 * @returns {MotionValue<number>} Vertical scroll.
 */
const useRelativeViewportScroll = (ref: MutableRefObject<HTMLElement>): MotionValue<number> => {
  const [offsetTop, setOffsetTop] = useState<number>(0);

  const updateOffsetTop = useCallback(() => {
    setOffsetTop(ref.current?.offsetTop ?? 0);
  }, [ref]);

  useEffect(updateOffsetTop, [updateOffsetTop]);

  useEffect(() => {
    window.addEventListener("resize", updateOffsetTop);

    return () => {
      window.removeEventListener("resize", updateOffsetTop);
    };
  });

  const { scrollY: viewportScrollY } = useViewportScroll();

  const scrollY = useTransform(viewportScrollY, (value) => value - offsetTop);

  return scrollY;
};

export default useRelativeViewportScroll;
