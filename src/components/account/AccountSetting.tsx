import {
  Formik, FormikHelpers, FormikProps, FormikValues,
} from "formik";
import React, {
  PropsWithChildren, ReactElement, ReactNode, useRef,
} from "react";
import Button from "../button/Button";
import Card from "../Card";
import { CardTitle } from "../text/headings";

export interface AccountSettingProps<Values extends FormikValues> {
  initialValues: Values;
  onSubmit: (values: Values, helpers: FormikHelpers<Values>) => void | Promise<unknown>;
  children: ((props: FormikProps<Values>) => React.ReactNode);
  label: ReactNode;
}

const AccountSetting = <Values extends FormikValues>({
  onSubmit,
  initialValues,
  children,
  label,
}: PropsWithChildren<AccountSettingProps<Values>>): ReactElement => {
  const formRef = useRef<FormikProps<Values>>();

  return (
    <Card>
      <CardTitle>{label}</CardTitle>
      <Formik
        innerRef={formRef}
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize
      >
        {children}
      </Formik>
      <div>
        <Button
          css={{
            padding: "0.75rem 1rem",
            fontSize: "0.75rem",
            float: "right",
          }}
          primary
          disabled={formRef.current?.isSubmitting}
          onClick={() => formRef.current?.submitForm()}
        >
          Ändra
        </Button>
      </div>
    </Card>
  );
};

export default AccountSetting;
