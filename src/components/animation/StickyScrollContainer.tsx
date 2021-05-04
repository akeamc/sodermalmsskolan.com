import { MotionValue, useTransform, useViewportScroll } from "framer-motion";
import React, { ComponentType, FunctionComponent, ReactElement } from "react";

export interface StickyScrollContainerChildProps {
  progress: MotionValue<number>;
  scrollY: MotionValue<number>;
}

export type StickyScrollContainerChild<
T = Record<string, never>,
> = ComponentType<StickyScrollContainerChildProps & T>;

export interface StickyScrollContainerProps {
  /**
   * Animation duration in pixels, i.e. how long the container should "stick".
   */
  duration: number;

  children: (StickyScrollContainerChildProps) => ReactElement;
}

/**
 * A sticky container used for sticky scroll animations.
 *
 * @param {React.PropsWithChildren<StickyScrollContainerProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered container.
 */
const StickyScrollContainer: FunctionComponent<StickyScrollContainerProps> = ({
  duration,
  children,
}) => {
  const { scrollY } = useViewportScroll();

  const progress = useTransform(scrollY, [0, duration], [0, 1]);

  return (
    <div
      className="relative"
      style={{
        height: `calc(100vh + ${duration}px)`,
      }}
    >
      <div className="h-screen sticky top-0">
        {children({
          scrollY,
          progress,
        })}
      </div>
    </div>
  );
};

export default StickyScrollContainer;
