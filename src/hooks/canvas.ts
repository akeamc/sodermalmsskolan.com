import { useRef, useEffect, MutableRefObject } from "react";

export type CanvasRenderFunction = (
  context: CanvasRenderingContext2D,
  frameCount: number
) => void;

const useCanvas = (
  draw: CanvasRenderFunction
): MutableRefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
