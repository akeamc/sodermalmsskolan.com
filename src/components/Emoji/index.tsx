import classNames from "classnames/bind";
import React, { FunctionComponent, ReactNode } from "react";
import twemoji from "twemoji";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

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
            className={cx("emoji-container")}
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
