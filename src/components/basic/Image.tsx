import React from "react";

export class Image extends React.Component<{
  src: string;
  borderRadius?: number;
}> {
  render() {
    const { src, borderRadius = 5 } = this.props;

    return (
      <img
        src={src}
        style={{
          width: "100%",
          borderRadius,
          display: "block",
        }}
      />
    );
  }
}
