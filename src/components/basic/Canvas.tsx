import React from "react";
import useCanvas, { CanvasRenderFunction } from "../../hooks/canvas";

export interface CanvasProps
  extends React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > {
  draw: CanvasRenderFunction;
}

const Canvas: React.FunctionComponent<CanvasProps> = ({ draw, ...rest }) => {
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
