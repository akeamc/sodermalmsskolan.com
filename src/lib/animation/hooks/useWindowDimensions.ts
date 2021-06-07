import { useState, useEffect } from "react";

export interface WindowDimensions {
  width: number;
  height: number;
}

/**
 * Get the window dimensions.
 *
 * @returns {WindowDimensions} Window dimensions!
 */
const getWindowDimensions = (): WindowDimensions => ({
  width: window?.innerWidth,
  height: window?.innerHeight,
});

/**
 * Use the window dimensions. *Responsively.*
 *
 * @returns {WindowDimensions} The window dimensions.
 */
const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // eslint-disable-next-line require-jsdoc
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
