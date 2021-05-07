import React, { FunctionComponent } from "react";
import ParallaxGallery from "./ParallaxGallery";
import ParallaxImage from "./ParallaxImage";

/**
 * Gallery of all the foods.
 *
 * @returns {React.ReactElement} Rendered gallery.
 */
const FoodGallery: FunctionComponent = () => (
  <ParallaxGallery heading="Vi fotade skolmaten 10 000 gånger.">
    <ParallaxImage
      aspectRatio={3 / 4}
      src="https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg"
      y={-0.1}
      staticOnMobile
      captionHeading="Den första bilden"
      caption={(
        <>
          togs den 9 maj 2019. Precis som våra andra foton är den inte manipulerad på något
          sätt, vilket går i linje med vår policy mot censur och desinformation.
        </>
      )}
      className="md:col-span-2 md:row-span-2"
    />
    <ParallaxImage
      aspectRatio={3 / 4}
      src="https://cdn.discordapp.com/attachments/575993879837409290/692690136873566269/image0.jpg"
      captionHeading="Tallrikar av papper."
      caption={(
        <>
          I början av 2020 gick diskmaskinen sönder och vi tvingades att äta på papperstallrikar i
          några dagar.
        </>
      )}
    />
    <ParallaxImage
      aspectRatio={3 / 4}
      src="https://cdn.discordapp.com/attachments/575993879837409290/746316140262981672/image0.jpg"
      captionHeading="Glasglas!"
      caption={(
        <>
          Första dagen i årskurs nio överraskades vi av glas tillverkade av glas – de tidigare
          versionerna gjordes i plast och hade en tendens att färgas svagt bruna.
        </>
      )}
    />
  </ParallaxGallery>
);

export default FoodGallery;
