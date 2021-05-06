import classNames from "classnames";
import React, { FunctionComponent } from "react";
import Parallax, { ParallaxProps } from "./Parallax";

export interface TumbleweedSpacerProps extends ParallaxProps {
  src: string;
}

/**
 * A tumbleweed-style spacer that reacts to scroll.
 *
 * ![Tumbleweed GIF](https://media.giphy.com/media/5x89XRx3sBZFC/source.gif)
 *
 * @param {React.PropsWithChildren<TumbleweedSpacerProps>} props Props.
 *
 * @returns {React.ReactElement} A tumbleweed!
 */
const TumbleweedSpacer: FunctionComponent<TumbleweedSpacerProps> = ({
  src,
  x = 1,
  y = 0,
  rotate = 0.1,
  scrollOptions = {
    viewportOffset: 0.5,
    targetOffset: 0.5,
  },
  className,
  ...parallaxProps
}) => (
  <Parallax
    x={x}
    y={y}
    rotate={rotate}
    scrollOptions={scrollOptions}
    className={classNames("h-96 flex items-center justify-center overflow-x-hidden", className)}
    {...parallaxProps}
  >
    <div className="w-64 h-64">
      <img alt="" className="max-w-full max-h-full mx-auto" src={src} />
    </div>
  </Parallax>
);

export default TumbleweedSpacer;
