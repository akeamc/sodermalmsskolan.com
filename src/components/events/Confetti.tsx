import Confetti from "react-confetti";
import React from "react";

interface WindowDimensions {
  width: number;
  height: number;
}

export default class WindowConfetti extends React.Component<
  {},
  WindowDimensions
> {
  constructor(props) {
    super(props);

    this.state = {
      width: 400,
      height: 400,
    };
  }

  getWindowDimensions(): WindowDimensions {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  }

  handleResize = () => {
    const dimensions = this.getWindowDimensions();

    this.setState(dimensions);
  };

  componentDidMount = () => {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleResize);
  };

  render() {
    const { width, height } = this.state;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <Confetti width={width} height={height}></Confetti>
      </div>
    );
  }
}
