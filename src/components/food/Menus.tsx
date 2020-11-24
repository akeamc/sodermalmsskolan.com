import styled from "styled-components";
import React, { useState } from "react";
import { Base } from "../grid/Base";
import { Col } from "../grid/Col";
import { ClientMenu, MenuTitle } from "../../lib/food/structures/client/Menu";
import { Dish } from "../../lib/food/structures/shared/Dish";
import { ClientDish } from "../../lib/food/structures/client/Dish";
import { Card, CardContent, CardTitle } from "../basic/Card";
import { Skeleton } from "../basic/Skeleton";
import { IconButton } from "../basic/Button";
import { ArrowDown } from "react-feather";
import { DishVotes } from "./Voting";
import { motion } from "framer-motion";
import { useLang } from "../../hooks/lang";
import { ResponsiveAd } from "../basic/Ad";

const DishList = styled.ul`
  margin-top: 1rem;
  margin-bottom: 0;

  li:last-child {
    margin-bottom: 0;
  }
`;

const DishEmissions: React.FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = ClientDish.use(id);
  const lang = useLang();

  return (
    <motion.span>
      ({data?.co2e.toLocaleString(lang) || <Skeleton width="32px" />} kg CO₂e
      per portion)
    </motion.span>
  );
};

const DishItem: React.FunctionComponent<{ dish: Dish; detailed?: boolean }> = ({
  dish,
  detailed = false,
}) => {
  const loading = !dish;

  return (
    <motion.li>
      {loading ? (
        <Skeleton count={2} />
      ) : (
        <>
          {dish?.title} <DishEmissions id={dish?.id} />
        </>
      )}
      <DishVotes id={dish?.id} detailed={detailed} />
    </motion.li>
  );
};

const CollapseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const StyledCollapseButton = styled(IconButton)<{ open: boolean }>`
  transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
`;

const CollapseButton: React.FunctionComponent<{
  onClick: () => void;
  open: boolean;
}> = ({ onClick, open }) => {
  return (
    <CollapseButtonContainer>
      <StyledCollapseButton open={open} onClick={onClick}>
        <ArrowDown />
      </StyledCollapseButton>
    </CollapseButtonContainer>
  );
};

const CardCol = styled(Col).attrs({
  xs: 12,
  md: 6,
  lg: 4,
})`
  display: flex;
`;

const MenuCard: React.FunctionComponent<{
  menu: ClientMenu;
}> = ({ menu }) => {
  const fallback = new Array(2).fill(null);
  const [detailed, setDetailed] = useState<boolean>(false);

  return (
    <CardCol>
      <Card>
        <CardContent>
          <CardTitle>
            {menu ? <MenuTitle menu={menu} /> : <Skeleton />}
          </CardTitle>
          <DishList>
            {(menu?.dishes || fallback).map((dish, index) => (
              <DishItem key={index} dish={dish} detailed={detailed} />
            ))}
          </DishList>
          <CollapseButton
            open={detailed}
            onClick={() => setDetailed(!detailed)}
          />
        </CardContent>
      </Card>
    </CardCol>
  );
};

const MenuAd: React.FunctionComponent = () => {
  return (
    <Col>
      <Card>
        <CardContent>
          <ResponsiveAd />
        </CardContent>
      </Card>
    </Col>
  );
};

export const MenuList: React.FunctionComponent<{
  limit: number;
}> = ({ limit }) => {
  const { data } = ClientMenu.use({ limit });
  const fallbackArray: ClientMenu[] = new Array(limit).fill(null);
  const menus = data?.length > 0 ? data : fallbackArray;

  return (
    <Base>
      {menus.map((menu, index) => (
        <>
          {index % 3 === 0 ? <MenuAd /> : null}
          <MenuCard key={index} menu={menu} />
        </>
      ))}
    </Base>
  );
};
