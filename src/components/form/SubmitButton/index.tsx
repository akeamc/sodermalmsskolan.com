import { FormikProps, FormikValues, useFormikContext } from "formik";
import React, { FunctionComponent } from "react";
import Button, { ButtonProps } from "../../button/Button";

/**
 * Helper function determining whether or not the submit button of a form is disabled.
 *
 * @param {FormikProps} formProps The props of a form.
 *
 * @returns {boolean} Whether the button should be disabled or not.
 */
export const submitButtonDisabled = <Values extends FormikValues>(
  formProps: FormikProps<Values>,
): boolean => {
  const isDisabled = !formProps?.isValid || !formProps?.dirty || formProps?.isSubmitting;

  return isDisabled;
};

/**
 * Button used to submit forms.
 *
 * @param {React.PropsWithChildren<ButtonProps>} props Props, extended from a regular `Button`.
 *
 * @returns {React.ReactElement} The rendered submit button.
 */
const SubmitButton: FunctionComponent<ButtonProps> = (props) => {
  const formProps = useFormikContext();

  const disabled = submitButtonDisabled(formProps);

  return (
    <Button size="small" disabled={disabled} type="submit" primary {...props} />
  );
};

export default SubmitButton;
