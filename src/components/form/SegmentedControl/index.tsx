import React, { FunctionComponent, useRef, useState } from "react";
import { FormOption, FormValue } from "../types";

export interface SegmentedControlProps {
  options: FormOption[];
  onChange?: (newValue: FormValue) => void,
  value?: FormValue,
}

export const SegmentedControlOption: FunctionComponent<{
  option: FormOption,
  onClick: (value: string) => void,
}> = ({
  option,
  onClick,
}) => (
  <button
    css={{
      flex: "1 1 0px",
      textAlign: "center",
      outline: "none",
      border: 0,
      backgroundColor: "transparent",
      padding: "0.5rem 0.25rem",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      position: "relative",
      zIndex: 1,
      cursor: "pointer",
      font: "inherit",
      fontSize: "0.8125rem",
      fontWeight: 500,
      WebkitTapHighlightColor: "transparent",
    }}
    onClick={() => onClick(option.value)}
    type="button"
  >
    {option.label}
  </button>
);

const SegmentedControl: FunctionComponent<SegmentedControlProps> = ({
  options,
  onChange,
  value: externalValue,
}) => {
  const [internalValue, setInternalValue] = useState<FormValue>(options[0].value);

  const previousValueRef = useRef<string>();

  const value = externalValue || internalValue;
  const selectedOptionIndex = options.findIndex((option) => option.value === value);

  const handleChange = (newValue: FormValue) => {
    if (newValue === previousValueRef.current) {
      return;
    }

    previousValueRef.current = newValue;

    setInternalValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div>
      {/* <p>{selectedOption.label}</p> */}
      <div css={{
        backgroundColor: "#eee",
        borderRadius: "6px",
        padding: "2px",
      }}
      >
        <div css={{
          display: "flex",
          position: "relative",
        }}
        >
          {options.map((option) => (
            <SegmentedControlOption option={option} key={option.value} onClick={handleChange} />
          ))}
          <div css={{
            position: "absolute",
            left: `${(selectedOptionIndex / options.length) * 100}%`,
            top: 0,
            bottom: 0,
            width: `${100 / options.length}%`,
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            transition: "all 0.2s ease-in-out",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
          />
        </div>
      </div>
    </div>
  );
};

export default SegmentedControl;
