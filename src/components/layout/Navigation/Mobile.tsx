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
  background-color: var(--background);
  padding: 24px;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  height: 100%;
  pointer-events: initial;
  box-sizing: border-box;
`;

const ListTitle = styled.h4`
  font-size: 1.25rem;
  letter-spacing: -0.020625rem;
  font-weight: 600;
  margin: 1.5em 0;
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
    border-bottom: 1px solid var(--accents-2);
    height: 48px;
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: var(--foreground);
    user-select: none;
  }
`;

const Menu = styled.div`
  min-height: 100%;
`;

export const MobileNav: React.FunctionComponent<{ isOpen: boolean }> = ({
  isOpen,
}) => {
  const categories = useLinks();

  return (
    <Container animate={isOpen ? "open" : "closed"} initial={false}>
      <Wrapper
        variants={{
          open: {
            y: 0,
          },
          closed: {
            y: "100%",
          },
        }}
        transition={{ ease: "easeInOut" }}
      >
        <Menu>
          {categories.map((category, index) => (
            <List key={index}>
              <ListTitle>{category.name}</ListTitle>
              {category.items.map((item, index) => (
                <Link href={item.href} key={index}>
                  <Anchor>
                    <li>{item.name}</li>
                  </Anchor>
                </Link>
              ))}
            </List>
          ))}
        </Menu>
      </Wrapper>
    </Container>
  );
};
