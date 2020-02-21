import React from "react";

export class Image extends React.Component<{
  src: string;
  roundedCorners?: boolean;
}> {
  render() {
    const { src, roundedCorners = true } = this.props;

    return (
      <img
        src={src}
        style={{
          width: "100%",
          borderRadius: roundedCorners ? 5 : 0,
          display: "block"
        }}
      />
    );
  }
}
