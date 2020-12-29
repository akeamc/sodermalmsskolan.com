import React, { FunctionComponent } from "react";

const Table: FunctionComponent = (props) => (
  <div css={{
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  }}
  >
    <table
      css={{
        border: "1px solid var(--border-color)",
        borderSpacing: 0,
        borderRadius: "0.5rem",
        overflow: "hidden",

        "tr:not(:last-child) td, thead th": {
          borderBottom: "1px solid var(--border-color)",
        },

        "tbody tr": {
          transition: "background-color 0.2s ease",

          "&:nth-of-type(2n + 1)": {
            background: "var(--color-bg-secondary)",
          },

          "&:hover": {
            background: "var(--border-color)",
          },
        },

        "td, th": {
          padding: "0.75rem",
          textAlign: "left",

          "&:not(:last-child)": {
            borderRight: "1px solid var(--border-color)",
          },
        },

        th: {
          fontWeight: 700,
        },
      }}
      {...props}
    />
  </div>
);

export default Table;
