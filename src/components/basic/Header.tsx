import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Navigation } from "./Navigation";
import { useProgressiveImage } from "../utils/progressive-image";

export const Header: React.FunctionComponent<{
  children?: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  className?: string;
  backgroundImage?: string;
  useCustomPadding?: boolean;
  fixedNav?: boolean;
}> = (props) => {
  const {
    children,
    style = {},
    className = "",
    backgroundImage,
    useCustomPadding = false,
    fixedNav = false,
  } = props;

  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = () => {
    setScrollPos(document.body.scrollTop || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const useDarkNavbar = scrollPos <= 0 && fixedNav && !!backgroundImage;

  // const imageLoaded = backgroundImage
  //   ? useProgressiveImage(backgroundImage)
  //   : false;

  let wrapperClassList = ["header-wrapper"];

  if (backgroundImage) {
    wrapperClassList.push("header-wrapper-background", "text-light");
  }

  if (fixedNav) {
    wrapperClassList.push("header-wrapper-fixed-navbar");
  }

  return (
    <div
      className={wrapperClassList.join(" ")}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
        ...style,
      }}
    >
      <Navigation dark={useDarkNavbar} fixed={fixedNav} />
      {children ? (
        <>
          <section
            className={`${!useCustomPadding ? "pt-4 pt-md-11" : ""} ${
              backgroundImage ? "pb-4 pb-md-11" : ""
            } ${className}`}
          >
            <Container>
              <Row className="align-items-center">{children}</Row>
            </Container>
          </section>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
