import React from "react";
import styled from "styled-components";
import twemoji from "twemoji";

const EmojiWrapper = styled.span`
  img {
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
  }
`;

export const Emoji: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (typeof child == "string") {
          return (
            <EmojiWrapper
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
};
