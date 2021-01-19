import React, { FunctionComponent, ReactNode } from "react";
import twemoji from "twemoji";

export interface EmojiProps {
  children: ReactNode;
}

/**
 * Twemoji-powered emoji renderer to make sure they look the same on all devices.
 *
 * @param {React.PropsWithChildren<EmojiProps>} props Emoji props.
 *
 * @returns {React.ReactElement} Rendered emoji text.
 */
const Emoji: FunctionComponent<EmojiProps> = ({
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
