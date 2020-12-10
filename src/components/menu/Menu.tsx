import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { useLang } from "../../hooks/lang";
import { ClientMenu } from "../../lib/food/structures/client/Menu";
import DishCard from "../dishes/DishCard";
import CardGrid from "../grid/CardGrid";
import { SmallHeading } from "../text/headings";

const Menu: FunctionComponent<{menu: ClientMenu}> = ({ menu }) => {
  const lang = useLang();

  return (
    <div css={{
      display: "flex",
    }}
    >
      <SmallHeading
        css={{
          writingMode: "vertical-rl",
          marginRight: "1rem",
        }}
      >
        {menu?.date ? dayjs(menu?.date).locale(lang).format("dddd DD MMMM") : "Läser in ..."}
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
