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

export class Grid extends React.Component<IContainerProps> {
  render() {
    return <div className={styles.grid}>{this.props.children}</div>;
  }
}

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
      offsetDesktopLarge = offsetDesktop
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

    return (
      <div
        className={classes.join(" ")}
      >
        {this.props.children}
      </div>
    );
  }
}
