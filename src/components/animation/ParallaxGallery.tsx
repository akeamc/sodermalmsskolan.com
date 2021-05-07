import React, { FunctionComponent, ReactNode } from "react";
import SectionHeading from "./SectionHeading";

export interface ParallaxGalleryProps {
  heading: ReactNode;
}

/**
 * A fancy image gallery.
 *
 * @param {React.PropsWithChildren<ParallaxGalleryProps>} props Props.
 *
 * @returns {React.ReactElement} The fancy gallery.
 */
const ParallaxGallery: FunctionComponent<ParallaxGalleryProps> = ({
  heading,
  children,
}) => (
  <div className="my-16 container">
    <div className="md:mx-32 lg:mx-48">
      <SectionHeading>{heading}</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 my-16 xl:gap-32">
        {children}
      </div>
    </div>
  </div>
);

export default ParallaxGallery;
