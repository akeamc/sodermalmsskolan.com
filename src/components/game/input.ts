import useKey from "../../hooks/key";

export interface DirectionalInput {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
}

export interface GameInput {
  directions: DirectionalInput;
  spacebar: boolean;
  shift: boolean;
  control: boolean;
}

export const useArrows = (): DirectionalInput => {
  return {
    up: useKey("ArrowUp"),
    right: useKey("ArrowRight"),
    down: useKey("ArrowDown"),
    left: useKey("ArrowLeft"),
  };
};

export const useWasd = (): DirectionalInput => {
  return {
    up: useKey("w"),
    right: useKey("d"),
    down: useKey("s"),
    left: useKey("a"),
  };
};

const useGameInput = (): GameInput => {
  const arrows = useArrows();
  const wasd = useWasd();

  return {
    directions: {
      up: arrows.up || wasd.up,
      right: arrows.right || wasd.right,
      down: arrows.down || wasd.down,
      left: arrows.left || wasd.left,
    },
    spacebar: useKey(" "),
    shift: useKey("Shift"),
    control: useKey("Control"),
  };
};

export default useGameInput;
