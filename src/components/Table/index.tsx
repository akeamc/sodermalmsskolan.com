import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";

const Table: FunctionComponent = (props) => (
  <div css={{
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  }}
  >
    <table
      css={(theme: Theme) => ({
        border: `1px solid ${theme.color.border}`,
        borderSpacing: 0,
        borderRadius: "0.5rem",
        overflow: "hidden",

        "tr:not(:last-child) td, thead th": {
          borderBottom: `1px solid ${theme.color.border}`,
        },

        "tbody tr": {
          transition: "background-color 0.2s ease",

          "&:nth-child(odd)": {
            background: theme.color.background.secondary,
          },

          "&:hover": {
            background: theme.color.border,
          },
        },

        "td, th": {
          padding: "0.75rem",
          textAlign: "left",

          "&:not(:last-child)": {
            borderRight: `1px solid ${theme.color.border}`,
          },
        },

        th: {
          fontWeight: 700,
        },
      })}
      {...props}
    />
  </div>
);

export default Table;
