import React, { useEffect, useRef } from "react";
import { CanvasRenderFunction } from "../../hooks/canvas";
import { useKeyEvents } from "../../hooks/key";
import Canvas from "../basic/Canvas";

export type Vec2D<T = number> = [T, T];

export interface GameProps {
  mazeDimensions?: Vec2D;
  start?: Vec2D;
  cellSize?: number;
}

export enum Cell {
  Visited = 1 << 0,
  RightWall = 1 << 1,
  BottomWall = 1 << 2,
}

export interface Walls {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export const defaultCell: Cell = Cell.RightWall | Cell.BottomWall;

export type Grid = Cell[][];

const createGrid = ([width, height]: Vec2D): Grid => {
  // JS is very strange. The arrays must be cloned so that changing one array doesn't affect the entire grid. It took longer than I'd like to admit to find this bug.
  return Array.from({ length: width }).map(() =>
    Array.from({ length: height }).map(() => defaultCell)
  );
};

export const Game: React.FunctionComponent<GameProps> = ({
  mazeDimensions = [24, 16],
  cellSize = 24,
  ...props
}) => {
  const [mazeWidth, mazeHeight] = mazeDimensions;

  const start: Vec2D = props.start || [
    Math.floor(Math.random() * mazeWidth),
    Math.floor(Math.random() * mazeHeight),
  ];

  const [canvasWidth, canvasHeight] = mazeDimensions.map(
    (value) => value * cellSize
  );

  const gridRef = useRef<Grid>(createGrid(mazeDimensions));
  const stackRef = useRef<Vec2D[]>([start]);
  const playerPosRef = useRef<Vec2D>(start);
  const playerPosDeltaRef = useRef<Vec2D>([0, 0]);

  function isVisited([x, y]: Vec2D): boolean {
    return (gridRef.current[x][y] & Cell.Visited) === Cell.Visited;
  }

  function hasRightWall(cell: Cell): boolean {
    return (cell & Cell.RightWall) === Cell.RightWall;
  }

  function hasBottomWall(cell: Cell): boolean {
    return (cell & Cell.BottomWall) === Cell.BottomWall;
  }

  function getWalls([x, y]: Vec2D): Walls {
    const cell = gridRef.current[x][y];

    return {
      right: x === mazeWidth - 1 || hasRightWall(cell),
      bottom: y === mazeHeight - 1 || hasBottomWall(cell),
      left: x === 0 || hasRightWall(gridRef.current[x - 1][y]),
      top: y === 0 || hasBottomWall(gridRef.current[x][y - 1]),
    };
  }

  function removeWalls(a: Vec2D, b: Vec2D) {
    const [x1, y1] = a;
    const [x2, y2] = b;

    const dx = x1 - x2;
    const dy = y1 - y2;

    if (dx === 1) {
      gridRef.current[x2][y2] &= ~Cell.RightWall;
    } else if (dx === -1) {
      gridRef.current[x1][y1] &= ~Cell.RightWall;
    }

    if (dy === 1) {
      gridRef.current[x2][y2] &= ~Cell.BottomWall;
    } else if (dy === -1) {
      gridRef.current[x1][y1] &= ~Cell.BottomWall;
    }
  }

  function randomNeighbor([x, y]: Vec2D): Vec2D | null {
    const neighbors = [];

    // Left neighbor
    if (x !== 0 && !isVisited([x - 1, y])) neighbors.push([x - 1, y]);

    // Top neighbor
    if (y !== 0 && !isVisited([x, y - 1])) neighbors.push([x, y - 1]);

    // Right neighbor
    if (x !== mazeWidth - 1 && !isVisited([x + 1, y]))
      neighbors.push([x + 1, y]);

    // Bottom neighbor
    if (y !== mazeHeight - 1 && !isVisited([x, y + 1]))
      neighbors.push([x, y + 1]);

    return neighbors[Math.floor(Math.random() * neighbors.length)];
  }

  useKeyEvents(
    (key) => key === "ArrowRight" || key === "d",
    () => {
      playerPosDeltaRef.current[0]++;
    }
  );

  useKeyEvents(
    (key) => key === "ArrowLeft" || key === "a",
    () => {
      playerPosDeltaRef.current[0]--;
    }
  );

  useKeyEvents(
    (key) => key === "ArrowUp" || key === "w",
    () => {
      playerPosDeltaRef.current[1]--;
    }
  );

  useKeyEvents(
    (key) => key === "ArrowDown" || key === "s",
    () => {
      playerPosDeltaRef.current[1]++;
    }
  );

  const draw: CanvasRenderFunction = (ctx, _) => {
    const current = stackRef.current[stackRef.current.length - 1];

    const [currentX, currentY] = current || [];

    const mazeBuilt = !current;

    if (current) {
      gridRef.current[currentX][currentY] |= Cell.Visited;

      const next = randomNeighbor(current);

      if (next) {
        removeWalls(current, next);
        stackRef.current.push(next);
      } else {
        stackRef.current.pop();
      }
    }

    ctx.fillStyle = "#eaeaea";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const [playerPosX, playerPosY] = playerPosRef.current;

    if (mazeBuilt) {
      let [deltaX, deltaY] = playerPosDeltaRef.current;

      if (deltaX !== 0 || deltaY !== 0) {
        const walls = getWalls(playerPosRef.current);

        if ((deltaX > 0 && walls.right) || (deltaX < 0 && walls.left))
          deltaX = 0;

        if ((deltaY > 0 && walls.bottom) || (deltaY < 0 && walls.top))
          deltaY = 0;

        const newX = playerPosX + deltaX;
        const newY = playerPosY + deltaY;

        if (newX >= 0 && newX <= mazeWidth - 1) {
          playerPosRef.current[0] = newX;
        }

        if (newY >= 0 && newY <= mazeHeight - 1) {
          playerPosRef.current[1] = newY;
        }
      }
    }

    playerPosDeltaRef.current = [0, 0];

    for (let x = 0; x < mazeWidth; x++) {
      for (let y = 0; y < mazeHeight; y++) {
        const cell = gridRef.current[x][y];

        if (isVisited([x, y])) {
          ctx.fillStyle = "#fafafa";
        } else {
          ctx.fillStyle = "#eaeaea";
        }

        const cellX = x * cellSize;
        const cellY = y * cellSize;

        let w = cellSize;
        let h = cellSize;

        if (hasRightWall(cell)) w--;

        if (hasBottomWall(cell)) h--;

        ctx.fillRect(cellX, cellY, w, h);
      }
    }

    const [highlightX, highlightY] = (current || playerPosRef.current).map(
      (value) => value * cellSize + cellSize * 0.5
    );

    ctx.fillStyle = "#ff0000";

    const circle = new Path2D();
    circle.arc(highlightX, highlightY, cellSize * 0.25, 0, 2 * Math.PI);

    ctx.fill(circle);
  };

  return <Canvas draw={draw} width={canvasWidth} height={canvasHeight} />;
};
