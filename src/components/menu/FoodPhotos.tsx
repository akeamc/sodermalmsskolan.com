import React, { useEffect } from "react";
import { useFoodPhotos } from "../../lib/api/main/photos/Photo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Controller, Scene } from "react-scrollmagic";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { FoodPhoto } from "../../lib/discord/photos";

export const ScrollingCounter: React.FunctionComponent<{
  to: number;
  current: number;
  padding?: boolean;
}> = ({ to, current, padding = false }) => {
  let numbers = [];

  for (let i = 0; i <= to; i++) {
    numbers.push(
      <span key={i}>
        {i.toString().padStart(padding ? to.toString().length : 0, "0")}
      </span>
    );
  }

  let count = to + 1;

  return (
    <div className="scrolling-counter">
      <div
        className="numbers"
        style={{
          transform: `translateY(-${100 * (current / count)}%)`,
        }}
      >
        {numbers}
      </div>
    </div>
  );
};

export const FoodPhotos: React.FunctionComponent = () => {
  const { data: response } = useFoodPhotos({ limit: 100 });
  const loading = !response;

  const photos: FoodPhoto[] = response?.data || [null];

  const pixelsPerImage = 200;
  const sceneDuration = photos.length * pixelsPerImage;

  useEffect(() => {});

  for (const photo of photos) {
    if (typeof window != "undefined" && photo?.url) {
      let image = new Image();
      image.src = photo?.url;
    }
  }

  return (
    <Controller>
      <Scene duration={sceneDuration} triggerHook={0} pin>
        {(progress, event) => {
          let index = Math.floor(progress * photos.length);

          if (index >= photos.length) index = photos.length - 1;

          let { description, url, timestamp, width, height } =
            photos[index] || {};

          const inView = event.state == "DURING";

          description = description ? `"${description}"` : "(Ingen titel)";

          return (
            <Row className={`food-photos-container ${inView ? "in-view" : ""}`}>
              <Col className="d-none d-md-block" md={6}>
                <div className="food-photos-heading">
                  <h1 className="display-3 mb-4">Ett urval.</h1>
                  <p className="lead">
                    De senaste {photos.length} bilderna av maten som serveras på
                    Södermalmsskolan.
                  </p>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="background" />
                <div className="food-photos">
                  <div className="photo-container">
                    <div className="photo-box">
                      <div className="image-text image-number">
                        <h6>
                          <span className="current">
                            {loading ? (
                              <Skeleton width="20px" />
                            ) : (
                              <ScrollingCounter
                                to={photos.length}
                                current={index + 1}
                                padding
                              />
                              // (index + 1)
                              //   .toString()
                              //   .padStart(
                              //     photos.length.toString().length,
                              //     "0"
                              //   )
                            )}
                          </span>
                          <span className="total">
                            {" / "}
                            {loading ? (
                              <Skeleton width="20px" />
                            ) : (
                              photos.length
                            )}
                          </span>
                        </h6>
                      </div>
                      <div className="image-container">
                        {loading ? (
                          <div className="loading-placeholder" />
                        ) : (
                          <a className="image" href={url}>
                            <img src={url} className="main" />
                            <img src={url} className="blur" />
                          </a>
                        )}
                      </div>
                      <div className="image-text image-description">
                        <h6>
                          {loading ? (
                            <Skeleton width="100px" />
                          ) : (
                            <>
                              {moment(timestamp)
                                .locale("sv")
                                .format("D MMMM YYYY")}{" "}
                              {description}
                            </>
                          )}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          );
        }}
      </Scene>
    </Controller>
  );
};
