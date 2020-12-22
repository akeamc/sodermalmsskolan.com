import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import useLocale from "../../hooks/useLocale";
import ClientMenu from "../../lib/food/structures/client/Menu";
import DishCard from "../dishes/DishCard";
import CardGrid from "../grid/CardGrid";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { SmallHeading } from "../text/headings";

const Menu: FunctionComponent<{menu: ClientMenu}> = ({ menu }) => {
  const { language } = useLocale();

  return (
    <div css={{
      display: "flex",
    }}
    >
      <SmallHeading
        css={{
          writingMode: "vertical-lr",
          marginRight: "1rem",
          lineHeight: 1,
        }}
      >
        {menu?.date ? dayjs(menu?.date).locale(language).format("dddd DD MMMM") : <InlineSkeleton height="100%" />}
      </SmallHeading>
      <CardGrid css={{
        flex: 1,
      }}
      >
        {(menu?.dishes || new Array(2).fill(null))
          .map((dish, index) => <DishCard dish={dish} key={dish?.id || index} />)}
      </CardGrid>
    </div>
  );
};

export default Menu;
