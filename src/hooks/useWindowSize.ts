import { useCallback, useEffect, useState } from "react";

export interface WindowDimensions {
  width: number;
  height: number;
}

/**
 * Window size.
 *
 * @returns {WindowDimensions} Dimensions.
 */
const useWindowSize = (): WindowDimensions => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return windowSize;
};

export default useWindowSize;
