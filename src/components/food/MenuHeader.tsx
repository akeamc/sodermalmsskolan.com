import { Theme } from "@emotion/react";
import React, { Fragment, FunctionComponent } from "react";
import { useMenu } from "../../lib/food/structures/client/Menu";
import SimpleHeader from "../header/Simple";
import Skeleton from "../skeleton";
import Emphasis from "../text/atomics/Emphasis";

const MenuHeader: FunctionComponent = () => {
  const { data } = useMenu({
    limit: 1,
  });

  const menu = data?.[0];

  return (
    <SimpleHeader
      title="Meny"
      sub={(
        <>
          {(menu?.dishes || new Array(2).fill(null)).map((dish, index) => (
            <Fragment key={dish?.id || index}>
              {index !== 0 ? " eller " : null}
              <Emphasis
                css={(theme: Theme) => ({
                  color: theme.color.text.primary,
                })}
              >
                {dish?.title || <Skeleton />}
              </Emphasis>
            </Fragment>
          ))}
        </>
      )}
    />
  );
};
export default MenuHeader;
