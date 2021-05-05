import React, { FunctionComponent } from "react";
import ParallaxImage from "./ParallaxImage";

/**
 * A fancy image gallery.
 *
 * @returns {React.ReactElement} The fancy gallery.
 */
const ParallaxGallery: FunctionComponent = () => (
  <div className="my-16 container">
    <ParallaxImage
      y={-0.1}
      src="https://blogg.xn--sdermalmsskolan-8sb.com/content/images/2020/06/Bj-rkeby.jpg"
      captionHeading={(
        <>
          <del>Fisk </del>
          Björkeby.
        </>
      )}
      caption={(
        <>
          Den 11 juni 2020 vandrade vi nästan fyra mil till Björkeby i Barkaby och tillbaka,
          till minne av den ökända maträtten
          {" "}
          <cite>Fisk Björkeby</cite>
          .
        </>
      )}
    />
  </div>
);

export default ParallaxGallery;
