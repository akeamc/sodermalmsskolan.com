import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import * as breakpoints from "../../../styles/breakpoints";
import { UnstyledList } from "../../basic/List";
import { useLinks } from "../Footer/Links";

const Container = styled(motion.div)`
  position: fixed;
  top: var(--navigation-height);
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;

  @media (min-width: ${breakpoints.large}) {
    display: none;
  }
`;

const Wrapper = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 24px;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  height: 100%;
  pointer-events: all;
  box-sizing: border-box;
  max-width: 300px;
  margin-left: auto;
`;

const ListTitle = styled(motion.h4)`
  font-size: 1.25rem;
  letter-spacing: -0.020625rem;
  font-weight: 600;
  margin: 1.5em 0 0.5em;
`;

const List = styled(UnstyledList)`
  &:first-child {
    ${ListTitle} {
      margin-top: 0;
    }
  }
`;

const Anchor = styled(motion.a)`
  li {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    height: 48px;
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.foreground};
    user-select: none;
  }
`;

const Menu = styled.div`
  min-height: 100%;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const listItemVariants = {
  open: (delay) => ({
    y: 0,
    opacity: 1,
    transition: { delay, ease: "easeOut", duration: 0.2 },
  }),
  closed: {
    y: "50%",
    opacity: 0,
    transition: { ease: "easeInOut", duration: 0.2 },
  },
};

export const MobileNav: React.FunctionComponent<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const categories = useLinks();

  const wrapperAnimationDuration = 0.3;

  return (
    <Container animate={isOpen ? "open" : "closed"} initial={false}>
      <Overlay
        variants={{
          open: { opacity: 1, pointerEvents: "all" },
          closed: { opacity: 0, pointerEvents: "none" },
        }}
        transition={{ ease: "easeInOut", duration: wrapperAnimationDuration }}
        onClick={onClose}
      />
      <Wrapper
        variants={{
          open: {
            x: 0,
          },
          closed: {
            x: "100%",
          },
        }}
        transition={{ ease: "easeOut", duration: wrapperAnimationDuration }}
      >
        <Menu>
          {categories.map((category, categoryIndex) => {
            const initialDelay = 0.2;

            return (
              <List key={categoryIndex}>
                <ListTitle variants={listItemVariants} custom={initialDelay}>
                  {category.name}
                </ListTitle>
                {category.items.map((item, itemIndex) => {
                  const delay = itemIndex * 0.05 + initialDelay;

                  return (
                    <Link href={item.href} key={itemIndex}>
                      <Anchor>
                        <motion.li variants={listItemVariants} custom={delay}>
                          {item.name}
                        </motion.li>
                      </Anchor>
                    </Link>
                  );
                })}
              </List>
            );
          })}
        </Menu>
      </Wrapper>
    </Container>
  );
};
