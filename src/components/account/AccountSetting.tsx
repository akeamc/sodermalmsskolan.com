import {
  Form,
  Formik, FormikConfig, FormikValues,
} from "formik";
import React, {
  PropsWithChildren, ReactElement, ReactNode,
} from "react";
import Card from "../Card";
import SubmitButton from "../form/SubmitButton";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";

export interface AccountSettingProps<Values extends FormikValues> extends FormikConfig<Values> {
  label: ReactNode;
  description?: ReactNode;
  submitButton?: ReactNode;
  isLoading?: boolean;
}

/**
 * Account option form.
 *
 * @param {PropsWithChildren<AccountSettingProps>} props The props.
 *
 * @returns {React.ReactElement} The rendered form.
 */
const AccountSetting = <Values extends FormikValues>({
  children,
  label,
  description,
  submitButton = "Spara",
  isLoading = false,
  ...formikProps
}: PropsWithChildren<AccountSettingProps<Values>>): ReactElement => (
  <Formik
    enableReinitialize
    {...formikProps}
  >
    <Form>
      <Card footer={(
        <SubmitButton
          disabled={isLoading ? true : undefined}
          css={{
            padding: "0.75rem 1rem",
            fontSize: "0.75rem",
            float: "right",
          }}
        >
          {submitButton}
        </SubmitButton>
    )}
      >
        <CardTitle>{isLoading ? <InlineSkeleton width="10em" /> : label}</CardTitle>
        {description ? (
          <CardDescription>
            {isLoading ? <InlineSkeleton count={2} /> : description}
          </CardDescription>
        ) : null}
        <div
          css={{
            maxWidth: "20rem",
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.1s",
          }}
        >
          {children}
        </div>
      </Card>
    </Form>
  </Formik>
  );

export default AccountSetting;
