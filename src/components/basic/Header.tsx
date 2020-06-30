import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Navigation } from "./Navigation";
import { useProgressiveBackground } from "./ProgressiveImage";

export const Header: React.FunctionComponent<{
  children?: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  className?: string;
  backgroundImage?: string;
  customPadding?: boolean;
  fixedNav?: boolean;
}> = ({
  children,
  style = {},
  className = "",
  backgroundImage,
  customPadding: customPadding = false,
  fixedNav = false,
}) => {
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
        ...(backgroundImage ? useProgressiveBackground(backgroundImage) : null),
        ...style,
      }}
    >
      <Navigation
        dark={scrollPos <= 0 && fixedNav && !!backgroundImage}
        fixed={fixedNav}
        lift={scrollPos > 0 && fixedNav}
      />
      {children ? (
        <>
          <section
            className={`${!customPadding ? "pt-4 pt-md-11" : ""} ${
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
