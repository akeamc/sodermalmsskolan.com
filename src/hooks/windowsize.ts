import { useState, useEffect } from "react";

type WindowDimensions = [number, number];

export const useWindowSize = (): WindowDimensions => {
  const [size, setSize] = useState<WindowDimensions>([0, 0]);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
