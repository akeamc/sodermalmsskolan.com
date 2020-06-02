import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Navigation } from "./Navigation";

export class Header extends React.Component<{
  children: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  className?: string;
  backgroundImage?: string;
  useCustomPadding?: boolean;
}> {
  render() {
    let {
      children,
      style = {},
      className = "",
      backgroundImage,
      useCustomPadding = false,
    } = this.props;

    return (
      <div
        className={
          "header-wrapper" +
          (backgroundImage ? " header-wrapper-background text-light" : null)
        }
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
        }}
      >
        <Navigation dark={!!backgroundImage} />
        <section
          className={`${!useCustomPadding ? "pt-4 pt-md-11" : ""} ${
            backgroundImage ? "pb-4 pb-md-11" : ""
          } ${className}`}
          style={style}
        >
          <Container>
            <Row className="align-items-center">{children}</Row>
          </Container>
        </section>
      </div>
    );
  }
}
