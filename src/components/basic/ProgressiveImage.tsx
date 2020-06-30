import { useState, useEffect } from "react";
import mediaproxy from "../../lib/utils/mediaproxy";
import { OutputFormat, Query } from "mediaproxy-js/lib/Query";

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
  src: string
): { loading: boolean; src: string; previewLoading: boolean } => {
  const wantedImageLoaded = useImageLoadingStatus(src);

  const preview = mediaproxy.generateUrl(
    new Query({
      source: src,
      width: 10,
      format: OutputFormat.Jpeg,
    })
  );

  const previewLoaded = useImageLoadingStatus(preview);

  return {
    src: wantedImageLoaded ? src : previewLoaded ? preview : null,
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

/**
 * Naming this interface `ProgressivePhotoProps` was very tempting.
 */
interface ProgressiveImageProps {}

export const ProgressiveImage: React.FunctionComponent<
  ProgressiveImageProps & React.ImgHTMLAttributes<HTMLImageElement>
> = ({ src: wantedSrc, ...props }) => {
  const { src } = useProgressiveImage(wantedSrc);

  return <img {...props} src={src} />;
};
