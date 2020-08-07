import { useRef, useEffect } from "react";

const isBrowser = typeof window !== `undefined`;

function getScrollPosition() {
  if (!isBrowser) return { x: 0, y: 0 };

  return { x: window.scrollX, y: window.scrollY };
}

export function useScrollPosition(effect, wait) {
  const position = useRef(getScrollPosition());

  let throttleTimeout = null;

  const callback = () => {
    const current = getScrollPosition();
    effect({ previous: position.current, current });
    position.current = current;
    throttleTimeout = null;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callback, wait);
        }
      } else {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
