import React, { FunctionComponent, ReactNode } from "react";
import { fonts } from "../../../styles/text";
import { DangerParagraph } from "../../text/paragraphs";

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
        <DangerParagraph css={{
          margin: "0.5rem 0 0",
        }}
        >
          {error}
        </DangerParagraph>
      ) : null}
    </div>
  );
};

export default TextField;
