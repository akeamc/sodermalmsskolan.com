import React, { FunctionComponent } from "react";
import { ChevronDown } from "react-feather";
import ReactSelect, { IndicatorProps, NamedProps } from "react-select";

export interface SelectOption {
  value: string;
  label: string;
}

export type SelectProps = NamedProps<SelectOption>;

const DropdownIndicator: FunctionComponent<IndicatorProps<SelectOption>> = () => (
  <ChevronDown css={{
    padding: "0.25rem",
    color: "var(--select-color)",
    opacity: 0.5,
    transition: "opacity 0.1s",

    "&:hover": {
      opacity: 1,
    },
  }}
  />
);

const Select: FunctionComponent<SelectProps> = (props) => (
  <ReactSelect
    loadingMessage={() => "Laddar ..."}
    placeholder="Välj ..."
    components={{
      DropdownIndicator,
      IndicatorSeparator: null,
    }}
    styles={{
      container: (provided) => ({
        ...provided,
        "--select-border-radius": "0.375rem",
        "--select-color": "var(--color-text-secondary)",
        fontSize: "0.875rem",
        color: "var(--select-color)",
      }),
      control: (provided, { isFocused }) => {
        const highlightedBorderColor = "var(--accents-3)";

        return {
          ...provided,
          border: `1px solid ${isFocused ? highlightedBorderColor : "var(--border-color)"}`,
          backgroundColor: "var(--accents-1)",
          borderRadius: "var(--select-border-radius)",
          transition: "border 0.1s",
          boxShadow: "none",

          "&:hover": {
            borderColor: highlightedBorderColor,
          },
        };
      },
      menu: (provided) => ({
        ...provided,
        border: "1px solid var(--border-color)",
        boxShadow: "none",
        margin: "0.25rem 0",
        borderRadius: "var(--select-border-radius)",
        backgroundColor: "var(--accents-1)",
        zIndex: 10,
      }),
      menuList: (provided) => ({
        ...provided,
      }),
      option: (_, { isSelected, isFocused }) => {
        let backgroundColor = "transparent";

        if (isSelected) {
          backgroundColor = "var(--select-selected-background)";
        } else if (isFocused) {
          backgroundColor = "var(--accents-2)";
        }

        return {
          WebkitTapHighlightColor: "transparent",
          color: "inherit",
          cursor: "default",
          display: "block",
          fontSize: "inherit",
          label: "option",
          padding: "0.5rem 0.75rem",
          userSelect: "none",
          backgroundColor,
        };
      },
      singleValue: (provided) => ({
        ...provided,
        color: "var(--select-color)",
      }),
    }}
    {...props}
  />
);

export default Select;
