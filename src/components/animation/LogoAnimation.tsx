import { motion, useTransform, useViewportScroll } from "framer-motion";
import React, { FunctionComponent } from "react";
import { ArrowDown } from "react-feather";
import LogoIcon from "../logo/LogoIcon";

export interface LogoAnimationProps {
  duration?: number;
  imgSrc?: string;
}

const MotionLogoIcon = motion(LogoIcon);

/**
 * Scroll-based animation for the logo.
 *
 * @param {React.PropsWithChildren<LogoAnimationProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered components.
 */
const LogoAnimation: FunctionComponent<LogoAnimationProps> = ({
  duration = 1000,
  imgSrc = "https://media.discordapp.net/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg",
}) => {
  const { scrollY } = useViewportScroll();
  const animationProgress = useTransform(scrollY, [0, duration], [0, 1], {
    clamp: false,
  });
  const containerY = useTransform(scrollY, [0, duration], [0, duration]);

  const imageOpacity = useTransform(animationProgress, [0, 1], [1, 0]);
  const imageFilter = useTransform(animationProgress, (value) => `blur(${value * 100}px)`);

  const logoOpacity = useTransform(imageOpacity, (value) => 1 - value);
  const logoScale = useTransform(animationProgress, [0, 1], [0.5, 1], {
    clamp: false,
  });

  const scrollPromptY = useTransform(scrollY, (value) => 0.25 * value);
  const scrollPromptOpacity = useTransform(scrollPromptY, [0, 25], [1, 0]);

  return (
    <div
      style={{
        paddingBottom: duration,
      }}
      className="mb-8"
    >
      <motion.div
        style={{
          y: containerY,
        }}
        className="h-screen relative"
      >
        <MotionLogoIcon
          style={{
            width: "40%",
            // Weird type errors if the variable is not casted to any, dhmu.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            opacity: logoOpacity as any,
            x: "-50%",
            y: "-50%",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scale: logoScale as any,
          }}
          className="absolute inset-1/2"
        />
        <motion.img
          src={imgSrc}
          style={{
            opacity: imageOpacity,
            filter: imageFilter,
          }}
          className="w-full h-full object-cover"
        />
        <motion.div
          style={{
            y: scrollPromptY,
            opacity: scrollPromptOpacity,
          }}
          className="absolute bottom-4 left-0 right-0 text-white flex flex-col justify-center items-center"
        >
          <span className="tracking-wide">Skrolla</span>
          <ArrowDown className="animate-bounce mt-2" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LogoAnimation;
