import React, { useEffect } from "react";
import { useFoodPhotos } from "../../lib/api/main/photos/Photo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Controller, Scene } from "react-scrollmagic";
import moment from "moment";
import { useImageLoadingStatus } from "../basic/ProgressiveImage";

export const FoodPhotos: React.FunctionComponent = () => {
  const { data: response } = useFoodPhotos({ limit: 100 });

  const photos = response?.data || [];

  const pixelsPerImage = 200;
  const sceneDuration = photos.length * pixelsPerImage;

  useEffect(() => {
    
  })

  for (const photo of photos) {
    let image = new Image();
    image.src = photo.url;
  }

  return (
    <Row>
      <Controller>
        <Scene duration={sceneDuration} triggerHook={0} pin>
          {(progress, event) => {
            let { description, url, timestamp } = photos[
              Math.floor(progress * (photos.length - 1))
            ] || {};
            const inView = event.state == "DURING";

            description = description ? `"${description}"` : "(Ingen titel)";

            return (
              <Col xs={12}>
                <div
                  className={`food-photos-container ${inView ? "in-view" : ""}`}
                >
                  <div className="background" />
                  <div className="food-photos">
                    <div className={`photo-container`}>
                      <div className="photo-box">
                        <div className="image-container">
                          <figure className="image">
                            <img src={url} className="main" />
                            <img src={url} className="blur" />
                          </figure>
                        </div>
                        <div className="image-description">
                          <h6>
                            {moment(timestamp)
                              .locale("sv")
                              .format("D MMMM YYYY")}{" "}
                            {description}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          }}
        </Scene>
      </Controller>
    </Row>
  );
};
