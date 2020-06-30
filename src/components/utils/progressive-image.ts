import { useState, useEffect } from "react";

export const useProgressiveImage = (src): boolean => {
  const [sourceLoaded, setSourceLoaded] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setSourceLoaded(src);
    };
  }, [src]);

  return !!sourceLoaded;
};
