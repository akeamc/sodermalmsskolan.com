import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Navigation } from "./Navigation";

export class Header extends React.Component<
  {
    children?: JSX.Element | JSX.Element[];
    style?: React.CSSProperties;
    className?: string;
    backgroundImage?: string;
    useCustomPadding?: boolean;
    fixedNav?: boolean;
  },
  {
    scrollPos: number;
  }
> {
  constructor(props) {
    super(props);

    this.state = {
      scrollPos: 0,
    };
  }

  render() {
    const {
      children,
      style = {},
      className = "",
      backgroundImage,
      useCustomPadding = false,
      fixedNav = false,
    } = this.props;

    const { scrollPos } = this.state;

    const useDarkNavbar = scrollPos <= 0 && fixedNav && !!backgroundImage;

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
  }

  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }

  listenToScroll = () => {
    this.setState({
      scrollPos: document.body.scrollTop || document.documentElement.scrollTop,
    });
  };
}
