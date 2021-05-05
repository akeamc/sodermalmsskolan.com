import { MotionValue, useTransform } from "framer-motion";
import React, {
  ComponentType, FunctionComponent, ReactElement, useRef,
} from "react";
import useRelativeViewportScroll from "../../lib/animation/hooks/useRelativeViewportScroll";

export interface StickyScrollContainerChildProps {
  /**
   * Scroll progress *within* the sticky container.
   */
  scrollProgress: MotionValue<number>;

  /**
   * Vertical scroll. A number between `0` and `duration` (when the container is in view).
   */
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
  const containerRef = useRef<HTMLDivElement>();
  const scrollY = useRelativeViewportScroll(containerRef);

  const scrollProgress = useTransform(scrollY, [0, duration], [0, 1], {
    clamp: false,
  });

  return (
    <div
      className="relative"
      style={{
        height: `calc(100vh + ${duration}px)`,
      }}
      ref={containerRef}
    >
      <div className="h-screen sticky top-0">
        {children({
          scrollY,
          scrollProgress,
        })}
      </div>
    </div>
  );
};

export default StickyScrollContainer;
