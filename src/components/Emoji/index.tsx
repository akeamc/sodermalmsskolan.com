import React, { FunctionComponent } from "react";
import twemoji from "twemoji";

/**
 * Twemoji-powered emoji renderer to make sure they look the same on all devices.
 *
 * @param root0
 * @param root0.children
 */
const Emoji: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    {React.Children.map(children, (child) => {
      if (typeof child === "string") {
        return (
          <span
            css={{
              img: {
                height: "1em",
                width: "1em",
                margin: "0 0.05em 0 0.1em",
                verticalAlign: "-0.1em",
              },
            }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: twemoji.parse(child, {
                folder: "svg",
                ext: ".svg",
              }),
            }}
          />
        );
      }

      return child;
    })}
  </>
);

export default Emoji;
