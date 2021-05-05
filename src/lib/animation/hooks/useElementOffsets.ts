import {
  MutableRefObject, useCallback, useEffect, useState,
} from "react";

export interface ElementOffsets {
  offsetLeft: number;
  offsetTop: number;
}

/**
 * React hook to use `offsetTop` and `offsetLeft` from elements. Responsive.
 *
 * @param {MutableRefObject<HTMLElement>} ref Target element.
 *
 * @returns {ElementOffsets} The computed offsets.
 */
const useElementOffsets = (ref: MutableRefObject<HTMLElement>): ElementOffsets => {
  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const [offsetTop, setOffsetTop] = useState<number>(0);

  const update = useCallback(() => {
    setOffsetLeft(ref.current?.offsetLeft ?? 0);
    setOffsetTop(ref.current?.offsetTop ?? 0);
  }, [ref]);

  useEffect(update, [update]);

  useEffect(() => {
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  });

  return {
    offsetLeft,
    offsetTop,
  };
};

export default useElementOffsets;
