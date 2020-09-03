import ReactSelect, { Props } from "react-select";
import React from "react";

export const Select: React.FunctionComponent<Props> = (props) => {
  return (
    <ReactSelect
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral0: "var(--background)",
          neutral20: "var(--accents-2)",
          neutral30: "var(--accents-5)",
          primary: "var(--color)",
          primary25: "var(--accents-2)",
          primary50: "var(--accents-3)",
        },
      })}
      styles={{
        menu: (provided) => ({
          ...provided,
          boxShadow: "var(--shadow-small)",
        }),
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? "white" : "var(--foreground)",
        }),
        control: (provided) => ({
          ...provided,
          color: "var(--foreground)",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "var(--foreground)",
        }),
      }}
      {...props}
    />
  );
};
