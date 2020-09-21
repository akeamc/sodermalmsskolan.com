import styled from "styled-components";
import * as breakpoints from "../../../styles/breakpoints";
import React from "react";
import { motion } from "framer-motion";

const Button = styled.button`
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  height: 40px;
  width: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${breakpoints.large}) {
    display: none;
  }
`;

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="1"
    stroke="var(--foreground)"
    strokeLinecap="round"
    {...props}
  />
);

export const Toggle: React.FunctionComponent<{
  toggle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOpen: boolean;
}> = ({ toggle, isOpen }) => {
  return (
    <Button onClick={toggle}>
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        animate={isOpen ? "open" : "closed"}
        initial={false}
      >
        <Path
          variants={{
            closed: { d: "M 0 8 L 24 8" },
            open: { d: "M 4 4 L 20 20" },
          }}
        />
        <Path
          variants={{
            closed: { d: "M 0 16 L 24 16" },
            open: { d: "M 4 20 L 20 4" },
          }}
        />
      </motion.svg>
    </Button>
  );
};
