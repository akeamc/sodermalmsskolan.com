import React from "react";
import styles from "./Grid.module.scss";

interface IContainerProps {
  children: JSX.Element | JSX.Element[];
}

export class Section extends React.Component<
  IContainerProps & { grid?: boolean }
> {
  render() {
    const { grid = true, children } = this.props;

    return (
      <section className={styles.section}>
        {grid ? <Grid>{children}</Grid> : { children }}
      </section>
    );
  }
}

/**
 * A grid container with 12 columns and an infinite number of rows. Designed to contain multiple instances of `GridArea`.
 */
export class Grid extends React.Component<IContainerProps> {
  render() {
    return <div className={styles.grid}>{this.props.children}</div>;
  }
}

/**
 * An area in a `Grid`.
 */
export class GridArea extends React.Component<
  IContainerProps & {
    spanMobile: number;
    spanTablet?: number;
    spanDesktop: number;
    spanDesktopLarge?: number;
    offsetMobile?: number;
    offsetTablet?: number;
    offsetDesktop?: number;
    offsetDesktopLarge?: number;
    spanY?: number;
  }
> {
  render() {
    const {
      spanMobile,
      spanTablet = spanMobile,
      spanDesktop,
      spanDesktopLarge = spanDesktop,
      offsetMobile = "",
      offsetTablet = offsetMobile,
      offsetDesktop = "",
      offsetDesktopLarge = offsetDesktop,
    } = this.props;

    const classes = [
      `col-${spanMobile}`,
      `col-offset-${offsetMobile}`,
      `col-${spanTablet}-md`,
      `col-offset-${offsetTablet}-md`,
      `col-${spanDesktop}-lg`,
      `col-offset-${offsetDesktop}-lg`,
      `col-${spanDesktopLarge}-xl`,
      `col-offset-${offsetDesktopLarge}-xl`,
    ];

    return <div className={classes.join(" ")}>{this.props.children}</div>;
  }
}

export class FillScreenWidth extends React.Component<
  IContainerProps,
  { windowWidth: number }
> {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
    };
  }

  handleResize = () => {
    this.setState({ windowWidth: document.body.clientWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  render() {
    const { windowWidth: clientWidth } = this.state;

    return (
      <div
        style={{
          marginLeft: "50%",
          transform: `translateX(-${clientWidth / 2}px)`,
          width: clientWidth,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
