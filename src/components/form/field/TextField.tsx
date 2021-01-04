import React, { FunctionComponent, ReactNode } from "react";
import { AlertCircle } from "react-feather";
import { fonts } from "../../../styles/text";

export interface TextFieldProps {
  name: string;
  id?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  label?: ReactNode;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const TextField: FunctionComponent<TextFieldProps> = ({
  label,
  id: specifiedId,
  error,
  type = "text",
  ...inputProps
}) => {
  const id = specifiedId || inputProps.name;

  return (
    <div css={{
      margin: "1rem 0",
    }}
    >
      <input
        css={[{
          width: "100%",
          boxSizing: "border-box",
          border: "1px solid var(--color-border-primary)",
          borderRadius: "0.3125rem",
          outline: "none",
          padding: "0.5rem",
          fontFamily: fonts.sans,
          fontSize: "0.875rem",
          lineHeight: 1,
          transition: "border 0.1s",
          color: "var(--color-text-primary)",
          backgroundColor: "var(--color-bg-primary)",

          "&:focus": {
            borderColor: "var(--accents-5)",
          },

          "&::placeholder": {
            opacity: 1,
            color: "var(--color-text-tertiary)",
          },
        }, error ? {
          borderColor: "var(--color-border-danger) !important",
        } : null]}
        id={id}
        type={type}
        {...inputProps}
      />
      {label ? <label htmlFor={id}>{label}</label> : null}
      {error ? (
        <div css={{
          color: "var(--color-text-danger)",
          marginTop: "0.5rem",
          display: "flex",

          a: {
            color: "inherit",
            fontWeight: 500,
            transition: "opacity 0.1s",

            "&:hover": {
              opacity: "0.7",
            },
          },
        }}
        >
          <AlertCircle css={{
            marginRight: "0.25rem",
            width: "1.5rem",
            height: "1.5rem",
          }}
          />
          <span css={{
            margin: "0.125rem 0",
            fontSize: "1rem",
          }}
          >
            {error}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default TextField;
