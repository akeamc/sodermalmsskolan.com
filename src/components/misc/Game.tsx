import React, { useState } from "react";
import { CanvasRenderFunction } from "../../hooks/canvas";
import Canvas from "../basic/Canvas";

type CellCoordinates = [number, number];

export interface GameProps {
  mazeWidth?: number;
  mazeHeight?: number;
  start?: CellCoordinates;
  cellSize?: number;
}

enum Cell {
  Visited = 1 << 0,
  SouthWall = 1 << 1,
  EastWall = 1 << 2,
}

const defaultCell = Cell.SouthWall | Cell.EastWall;

type Grid = Cell[][];

export const Game: React.FunctionComponent<GameProps> = ({
  mazeWidth = 12,
  mazeHeight = 12,
  cellSize = 24,
  start = [0, 0],
}) => {
  const grid: Grid = new Array(mazeWidth).fill(
    new Array(mazeHeight).fill(defaultCell)
  );

  let stack = [start];

  let finished = false;

  const isVisited = ([x, y]: CellCoordinates): boolean => {
    return (grid[x][y] & Cell.Visited) === Cell.Visited;
  };

  const randomNeighbor = ([x, y]: CellCoordinates): CellCoordinates | null => {
    // const cell = grid[x][y];

    let neighbors = [];

    if (y !== 0 && !isVisited([x, y - 1])) {
      console.log("north");
      neighbors.push([x, y - 1]);
    }

    if (x !== mazeWidth - 1 && !isVisited([x + 1, y])) {
      console.log("east");
      neighbors.push([x + 1, y]);
    }

    if (y !== mazeHeight - 1 && !isVisited([x, y + 1])) {
      console.log("south");
      neighbors.push([x, y + 1]);
    }

    if (x !== 0 && !isVisited([x - 1, y])) {
      console.log("wesr");
      neighbors.push([x - 1, y]);
    }

    throw neighbors;

    let neighbor =
      neighbors.length > 0
        ? neighbors[Math.floor(Math.random() * neighbors.length)]
        : null;

    return neighbor;
  };

  const removeWalls = (a: CellCoordinates, b: CellCoordinates) => {
    let [x1, y1] = a;
    let [x2, y2] = b;

    let dx = x1 - x2;
    let dy = y1 - y2;

    if (dx === 0) {
      if (dy === 1) {
        grid[x1][y1] &= ~Cell.SouthWall;
      }

      if (dy === -1) {
        grid[x2][y2] &= ~Cell.SouthWall;
      }
    }

    if (dy === 0) {
      if (dx === 1) {
        grid[x1][y1] &= ~Cell.EastWall;
      }

      if (dx === -1) {
        grid[x2][y2] &= ~Cell.EastWall;
      }
    }
  };

  const draw: CanvasRenderFunction = (ctx, frameCount) => {
    if (!finished) {
      let current = stack[stack.length - 1];

      if (current) {
        let [x, y] = current;

        grid[x][y] = grid[x][y] | Cell.Visited;

        console.log(current, grid, grid[x][y] | Cell.Visited);

        // grid[x][y] |= Cell.Visited;

        let next = randomNeighbor(current);

        if (next) {
          removeWalls(current, next);

          stack.push(next);
        } else {
          stack.pop();
        }
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (let x = 0; x < mazeWidth; x++) {
        for (let y = 0; y < mazeHeight; y++) {
          let cell = grid[x][y];

          let w =
            (cell & Cell.EastWall) === Cell.EastWall ? cellSize - 1 : cellSize;
          let h =
            (cell & Cell.SouthWall) === Cell.SouthWall
              ? cellSize - 1
              : cellSize;

          if (current?.[0] === x && current?.[1] === y) {
            ctx.fillStyle = "#ff0000";
          } else if (isVisited([x, y])) {
            ctx.fillStyle = "#00ff00";
          } else {
            ctx.fillStyle = "#000000";
          }

          ctx.fillRect(x * cellSize, y * cellSize, w, h);
        }
      }

      finished = stack.length === 0;
    }
  };

  return (
    <Canvas
      draw={draw}
      width={mazeWidth * cellSize}
      height={mazeHeight * cellSize}
    />
  );
};
