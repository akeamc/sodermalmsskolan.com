import { useState, useEffect } from "react";
import pxcmprs from "../../lib/utils/pxcmprs";
import { Format } from "pxcmprs";
import React from "react";

/**
 * Loads an image in the background and returns `true` when the image has finished loading.
 * @param src
 */
export const useImageLoadingStatus = (src: string): boolean => {
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

/**
 * Loads an image in the background, returns the URL of a really low resolution image in the meantime.
 * @param src
 */
export const useProgressiveImage = (
  src = ""
): { loading: boolean; src: string; previewLoading: boolean } => {
  const wantedImageLoaded = useImageLoadingStatus(src);

  const preview = pxcmprs.generateUrl({
    source: src, // During pre-render, Next calls this function with no parameters for no apparent reason. Therefore, to prevent pxcmprs from throwing an error, an empty string is used as fallback.
    width: 10,
    format: Format.Jpeg,
  });

  const previewLoaded = useImageLoadingStatus(preview);

  return {
    src: wantedImageLoaded ? src : preview,
    loading: !wantedImageLoaded,
    previewLoading: !previewLoaded,
  };
};

export const useProgressiveBackground = (
  backgroundSrc: string
): React.CSSProperties => {
  const { src } = useProgressiveImage(backgroundSrc);

  return {
    backgroundColor: "#eee",
    backgroundImage: src ? `url(${src})` : null,
  };
};

export const ProgressiveImage: React.FunctionComponent<React.ImgHTMLAttributes<
  HTMLImageElement
>> = ({ src: wantedSrc, ...props }) => {
  const { src } = useProgressiveImage(wantedSrc);

  return <img {...props} src={src} />;
};
