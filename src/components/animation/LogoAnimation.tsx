import { motion, useTransform } from "framer-motion";
import React, { FunctionComponent } from "react";
import { ArrowDown } from "react-feather";
import LogoIcon from "../logo/LogoIcon";
import StickyScrollContainer, { StickyScrollContainerChild } from "./StickyScrollContainer";

export interface InnerLogoAnimationProps {
  duration: number;
  imgSrc: string;
}

export type LogoAnimationProps = Partial<InnerLogoAnimationProps>;

const MotionLogoIcon = motion(LogoIcon);

/**
 * The inner logo animation.
 *
 * @param {React.PropsWithChildren<InnerLogoAnimationProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered elements.
 */
const InnerLogoAnimation: StickyScrollContainerChild<InnerLogoAnimationProps> = ({
  imgSrc,
  scrollProgress,
  scrollY,
}) => {
  const imageOpacity = useTransform(scrollProgress, [0, 1], [1, 0]);
  const imageFilter = useTransform(scrollProgress, (value) => `blur(${value * 100}px)`);

  const logoOpacity = useTransform(imageOpacity, (value) => 1 - value);
  const logoScale = useTransform(scrollProgress, [0, 1], [0.5, 1]);

  const scrollPromptY = useTransform(scrollY, (value) => 0.25 * value);
  const scrollPromptOpacity = useTransform(scrollPromptY, [0, 25], [1, 0]);

  return (
    <div className="relative py-8 h-screen container">
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
        alt=""
        className="w-full h-full object-cover"
      />
      <motion.div
        style={{
          y: scrollPromptY,
          opacity: scrollPromptOpacity,
        }}
        className="absolute bottom-16 left-0 right-0 text-white flex flex-col justify-center items-center pointer-events-none"
      >
        <span className="tracking-wide">Skrolla</span>
        <ArrowDown className="animate-bounce mt-2" />
      </motion.div>
    </div>
  );
};

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
}) => (
  <StickyScrollContainer duration={duration}>
    {(props) => <InnerLogoAnimation {...props} duration={duration} imgSrc={imgSrc} />}
  </StickyScrollContainer>
);

export default LogoAnimation;
