import { motion, useTransform } from "framer-motion";
import React, {
  CSSProperties, FunctionComponent, ReactNode, useRef,
} from "react";
import classNames from "classnames";
import useTopOffset from "../../lib/animation/hooks/useTopOffset";
import Parallax, { ParallaxProps } from "./Parallax";

import styles from "./ParallaxImage.module.scss";

export interface ParallaxImageProps extends ParallaxProps {
  src: string;
  caption?: ReactNode;
  captionHeading?: ReactNode;
  aspectRatio?: number;
}

interface CSSVariables extends CSSProperties {
  "--aspect-ratio": number;
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
  caption,
  captionHeading,
  aspectRatio = 1,
  ...parallaxProps
}) => {
  const imageRef = useRef<HTMLDivElement>();
  const scrollY = useTopOffset(imageRef, { viewportOffset: 1, targetOffset: 1 });
  const imageScale = useTransform(scrollY, [0, 200], [1.25, 1]);

  return (
    <Parallax {...parallaxProps}>
      <figure className="w-64 md:w-96 flex flex-col">
        <div
          style={{ "--aspect-ratio": aspectRatio } as CSSVariables}
          className={classNames(styles.image, "relative w-full overflow-hidden rounded-xl")}
          ref={imageRef}
        >
          <motion.img
            src={src}
            style={{
              scale: imageScale,
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <figcaption className="font-medium mt-6">
          <h5 className="inline">{captionHeading}</h5>
          {" "}
          <span className="text-gray-500">{caption}</span>
        </figcaption>
      </figure>
    </Parallax>
  );
};

export default ParallaxImage;
