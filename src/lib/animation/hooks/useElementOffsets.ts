import {
  MutableRefObject, useCallback, useEffect, useState,
} from "react";

export interface ElementOffsets {
  offsetLeft: number;
  offsetTop: number;
  offsetHeight: number;
  offsetWidth: number;
}

/**
 * React hook to use `offsetTop` and `offsetLeft` from elements. Responsive.
 *
 * @param {MutableRefObject<HTMLElement>} ref Target element.
 *
 * @returns {ElementOffsets} The computed offsets.
 */
const useElementOffsets = (ref: MutableRefObject<HTMLElement>): ElementOffsets => {
  const [offsets, setOffsets] = useState<ElementOffsets>({
    offsetLeft: 0,
    offsetTop: 0,
    offsetHeight: 0,
    offsetWidth: 0,
  });

  const update = useCallback(() => {
    setOffsets({
      offsetTop: ref.current?.offsetTop ?? 0,
      offsetLeft: ref.current?.offsetLeft ?? 0,
      offsetHeight: ref.current?.offsetHeight ?? 0,
      offsetWidth: ref.current?.offsetWidth ?? 0,
    });
  }, [ref]);

  useEffect(update, [update]);

  useEffect(() => {
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  });

  return offsets;
};

export default useElementOffsets;
