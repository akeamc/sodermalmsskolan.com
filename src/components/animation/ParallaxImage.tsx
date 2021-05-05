import { motion, useTransform } from "framer-motion";
import React, { FunctionComponent, ReactNode, useRef } from "react";
import useTopOffset from "../../lib/animation/hooks/useTopOffset";
import Parallax, { ParallaxProps } from "./Parallax";

export interface ParallaxImageProps extends ParallaxProps {
  src: string;
  captionBruh?: ReactNode;
  captionHeadingBruh?: ReactNode;
}

/**
 * A parallax image with a caption.
 *
 * @param {React.PropsWithChildren<ParallaxImageProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered image.
 */
const ParallaxImage: FunctionComponent<ParallaxImageProps> = ({
  src,
  captionBruh: description,
  captionHeadingBruh: imageTitle,
  ...parallaxProps
}) => {
  const imageRef = useRef<HTMLDivElement>();
  const scrollY = useTopOffset(imageRef, { viewportOffset: 1, targetOffset: 1 });
  const imageScale = useTransform(scrollY, [0, 200], [1.25, 1]);

  return (
    <Parallax {...parallaxProps}>
      <figure className="w-64 md:w-96 flex flex-col">
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl" ref={imageRef}>
          <motion.img
            src={src}
            style={{
              scale: imageScale,
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <figcaption className="font-medium mt-6">
          <h5 className="inline">{imageTitle}</h5>
          {" "}
          <span className="text-gray-500">{description}</span>
        </figcaption>
      </figure>
    </Parallax>
  );
};

export default ParallaxImage;
