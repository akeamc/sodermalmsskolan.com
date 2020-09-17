import React, { useRef, useEffect } from "react";

const isBrowser = typeof window !== `undefined`;

interface ScrollPosition {
  /**
   * The number of pixels between the left of the element and the viewport left. Thus, a negative number indicates that it has not yet been scrolled to.
   */
  x: number;

  /**
   * The number of pixels between the top of the element and the viewport top. Thus, a negative number indicates that it has not yet been scrolled to.
   */
  y: number;
}

function getScrollPosition(
  element?: React.MutableRefObject<HTMLElement>
): ScrollPosition {
  if (!isBrowser) return { x: 0, y: 0 };

  const target: HTMLElement = element?.current || document.body;
  const position = target.getBoundingClientRect();

  return { x: -position.x, y: -position.y };
}

interface ScrollHookOptions {
  throttle?: number;
  element?: React.MutableRefObject<HTMLElement>;
}

export function useScrollPosition(
  effect: (data: { previous: ScrollPosition; current: ScrollPosition }) => void,
  { throttle = 100, element }: ScrollHookOptions = {}
) {
  const position = useRef(getScrollPosition());

  let throttleTimeout = null;

  const callback = () => {
    const current = getScrollPosition(element);
    effect({ previous: position.current, current });
    position.current = current;
    throttleTimeout = null;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (throttle) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callback, throttle);
        }
      } else {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
