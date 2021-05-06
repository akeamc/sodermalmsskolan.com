import React, { FunctionComponent } from "react";
import ParallaxImage from "./ParallaxImage";
import SectionHeading from "./SectionHeading";

/**
 * A fancy image gallery.
 *
 * @returns {React.ReactElement} The fancy gallery.
 */
const ParallaxGallery: FunctionComponent = () => (
  <div className="my-16 container">
    <div className="md:mx-32 lg:mx-48">
      <SectionHeading>Vallfärden till Björkeby</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 my-16 xl:gap-32">
        <ParallaxImage
          aspectRatio={3 / 4}
          y={0}
          src="https://cdn.discordapp.com/attachments/575993879837409290/775684513430110218/20201110_123305.jpg"
          captionHeading="Nästan Fisk Björkeby."
          caption="Efter att södermalmsskolan.com grundades serverades aldrig Fisk Björkeby igen – åtminstone inte under samma namn. Den sågs senast den femte februari 2020."
        />
        <ParallaxImage
          aspectRatio={4 / 3}
          y={-0.2}
          src="https://blogg.södermalmsskolan.com/content/images/2020/06/DSC02598.JPG"
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
        />
        <ParallaxImage
          aspectRatio={4 / 3}
          y={0}
          src="https://blogg.xn--sdermalmsskolan-8sb.com/content/images/2020/06/Bj-rkeby.jpg"
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
          aspectRatio={4 / 3}
          y={0}
          src="https://blogg.södermalmsskolan.com/content/images/2020/06/DSC02721.JPG"
          className="col-start-1 col-span-full"
          caption="Vissa av oss tog sitt förnuft till fånga och reste hem kommunalt, medan andra vandrade tillbaka också."
        />
      </div>
    </div>
  </div>
);

export default ParallaxGallery;
