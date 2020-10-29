import ReactSelect, { Props } from "react-select";
import React from "react";
import { useTheme } from "styled-components";

export const Select: React.FunctionComponent<Props> = (props) => {
  const theme = useTheme();

  return (
    <ReactSelect
      theme={(selectTheme) => ({
        ...selectTheme,
        colors: {
          ...selectTheme.colors,
          neutral0: theme.colors.background,
          neutral20: theme.colors.border,
          neutral30: theme.colors.muted,
          primary: theme.colors.primary,
          primary25: theme.colors.border,
          primary50: theme.colors.muted,
        },
      })}
      styles={{
        menu: (provided) => ({
          ...provided,
          boxShadow: theme.shadows.small,
        }),
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? "white" : theme.colors.foreground,
        }),
        control: (provided) => ({
          ...provided,
          color: theme.colors.foreground,
        }),
        singleValue: (provided) => ({
          ...provided,
          color: theme.colors.foreground,
        }),
      }}
      {...props}
    />
  );
};
