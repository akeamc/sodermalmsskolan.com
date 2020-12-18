import { Theme } from "@emotion/react";
import React, { Fragment, FunctionComponent } from "react";
import { useDayMenu } from "../../lib/food/hooks/menu";
import Skeleton from "../Skeleton";
import Emphasis from "../text/atomics/Emphasis";

/**
 * A short text describing today's lunch.
 */
const MenuText: FunctionComponent = () => {
  const menu = useDayMenu();

  return (
    <>
      {menu?.dishes?.length > 0 ? (
        <>
          Det blir
          {" "}
          {menu?.dishes?.map((dish, index) => (
            <Fragment key={dish?.id || index}>
              {index !== 0 ? " och " : null}
              <Emphasis
                css={(theme: Theme) => ({
                  color: theme.color.text.primary,
                })}
              >
                {dish?.title || <Skeleton />}
              </Emphasis>
            </Fragment>
          ))}
          {" "}
          till lunch.
          {" "}
        </>
      ) : <Skeleton count={3} />}
    </>
  );
};

export default MenuText;
