import React, { FunctionComponent } from "react";
import ParallaxGallery from "./ParallaxGallery";
import ParallaxImage from "./ParallaxImage";

/**
 * A gallery of *The Hike*.
 *
 * @returns {React.ReactElement} The rendered gallery.
 */
const HikeGallery: FunctionComponent = () => (
  <ParallaxGallery heading="Vi vandrade till Björkeby, Järfälla.">
    <ParallaxImage
      aspectRatio={3 / 4}
      src="/assets/fish.jpg"
      captionHeading="Nästan Fisk Björkeby."
      caption="Efter att södermalmsskolan.com grundades serverades aldrig Fisk Björkeby igen – åtminstone inte under samma namn. Den sågs senast den femte februari 2020."
    />
    <ParallaxImage
      aspectRatio={3 / 2}
      y={-0.2}
      src="/assets/school.jpg"
      captionHeading="Vallfärden."
      caption={(
        <>
          Den 11 juni 2020 vandrade vi nästan två mil till Björkeby i Järfälla och tillbaka,
          till minne av den ökända maträtten
          {" "}
          <cite>Fisk Björkeby</cite>
          .
        </>
      )}
      className="md:mt-16 lg:col-span-2"
      staticOnMobile
    />
    <ParallaxImage
      aspectRatio={3 / 2}
      src="/assets/bjorkeby.jpg"
      className="col-start-1 col-span-full md:-mx-32"
      captionHeading={(
        <>
          <del>Fisk </del>
          Björkeby.
        </>
      )}
      caption="Strax efter klockan tre den elfte juni 2020 nådde vi vår destination – Björkebyskolan."
    />
    <ParallaxImage
      aspectRatio={3 / 2}
      src="/assets/hike.jpg"
      className="col-start-1 col-span-full"
      caption="Vissa av oss tog sitt förnuft till fånga och reste hem kommunalt, medan andra vandrade tillbaka också."
    />
  </ParallaxGallery>
);

export default HikeGallery;
