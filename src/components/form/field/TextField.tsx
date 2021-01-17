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
  error?: ReactNode;
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * A prefix or suffix for a text field.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} The rendered fix.
 */
const TextFieldFix: FunctionComponent = ({ children, ...props }) => (
  <div
    css={{
      borderRadius: "var(--border-radius)",
      border: "1px solid var(--color-border-primary)",
      backgroundColor: "var(--accents-1)",
      padding: "var(--input-padding)",
      color: "var(--color-text-tertiary)",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
    }}
    {...props}
  >
    <span css={{
      lineHeight: 1,
    }}
    >
      {children}
    </span>
  </div>
);

/**
 * A better `input`.
 *
 * @param {React.PropsWithChildren<TextFieldProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered `input`.
 */
const TextField: FunctionComponent<TextFieldProps> = ({
  label,
  id: specifiedId,
  error,
  type = "text",
  prefix,
  suffix,
  ...inputProps
}) => {
  const id = specifiedId || inputProps.name;

  return (
    <div css={{
      margin: "1rem 0",
    }}
    >
      <div css={{
        display: "flex",
        width: "100%",
        "--border-radius": "0.3125rem",
        "--font-size": "0.875rem",
        "--input-padding": "0.625rem 0.5rem",
        fontSize: "var(--font-size)",
      }}
      >
        {prefix ? (
          <TextFieldFix css={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRight: 0,
          }}
          >
            {prefix}
          </TextFieldFix>
        ) : null}
        <input
          css={[{
            flex: 1,
            boxSizing: "border-box",
            border: "1px solid var(--color-border-primary)",
            borderRadius: "var(--border-radius)",
            outline: "none",
            padding: "var(--input-padding)",
            fontFamily: fonts.sans,
            lineHeight: 1,
            transition: "border 0.1s",
            color: "var(--color-text-primary)",
            backgroundColor: "var(--color-bg-primary)",
            fontSize: "var(--font-size)",
            boxShadow: "none",
            WebkitAppearance: "none",

            "&:focus": {
              borderColor: "var(--accents-5)",
            },

            "&::placeholder": {
              opacity: 1,
              color: "var(--color-text-tertiary)",
            },

            "&:disabled, &[disabled]": {
              backgroundColor: "var(--accents-1)",
              cursor: "not-allowed",
            },
          }, prefix ? {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          } : null, suffix ? {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          } : null, error ? {
            borderColor: "var(--color-border-danger) !important",
          } : null]}
          id={id}
          type={type}
          {...inputProps}
        />
        {suffix ? (
          <TextFieldFix css={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeft: 0,
          }}
          >
            {suffix}
          </TextFieldFix>
        ) : null}
      </div>
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
