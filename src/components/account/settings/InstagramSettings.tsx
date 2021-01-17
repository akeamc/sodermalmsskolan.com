import { CSSObject } from "@emotion/react";
import { Field, FormikValues } from "formik";
import ky from "ky-universal";
import React, { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import getAuthorizationHeader from "../../../lib/auth/header";
import INSTAGRAM_BOT_ENDPOINT from "../../../lib/notifications/instagram/endpoint";
import useInstagramStatus from "../../../lib/notifications/instagram/useInstagramStatus";
import TextField from "../../form/field/TextField";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
import { SuccessParagraph, WarningParagraph } from "../../text/paragraphs";
import AccountSetting from "../AccountSetting";

export interface Values extends FormikValues {
  igUsername: string;
}

/**
 * Description of the card.
 *
 * @returns {React.ReactElement} Rendered description.
 */
const InstagramStatusText: FunctionComponent = () => {
  const { data, isValidating } = useInstagramStatus();

  const css: CSSObject = {
    margin: 0,
  };

  if (isValidating && !data) {
    return <InlineSkeleton count={1} />;
  }

  if (data?.uid) {
    if (data?.verified) {
      return (
        <SuccessParagraph css={css}>Ditt användarnamn har bekräftats.</SuccessParagraph>
      );
    }

    return (
      <WarningParagraph css={css}>
        Du måste bekräfta ditt användarnamn för att kunna ta emot notiser.
      </WarningParagraph>
    );
  }

  return (
    <>
      Ange ditt användarnamn på Instagram för att fortsätta.
    </>
  );
};

/**
 * `AccountSetting` for notifications.
 *
 * @returns {React.ReactElement} The rendered setting.
 */
const InstagramSettings: FunctionComponent = () => {
  const { data, revalidate } = useInstagramStatus();

  const initialValues: Values = {
    igUsername: data?.username,
  };

  const [inputValue, setInputValue] = useState<string>();
  const [submitButton, setSubmitButton] = useState<string>();

  useEffect(() => {
    const username = typeof inputValue === "undefined" ? data?.username : inputValue;

    if (!data?.verified && username === data?.username) {
      setSubmitButton("Skicka en ny länk");
    } else {
      setSubmitButton(undefined);
    }
  }, [inputValue, data]);

  return (
    <AccountSetting
      label="Instagram-notiser"
      submitButton={submitButton}
      description={(
        <>
          <div css={{
            marginBottom: "0.75rem",
          }}
          >
            Genom att registrera ditt Instagram-användarnamn, får du meddelanden vid viktiga
            händelser såsom inställda lektioner.
          </div>
          <InstagramStatusText />
        </>
      )}
      initialValues={initialValues}
      onSubmit={async ({ igUsername }, { setSubmitting, setFieldError }) => {
        ky.post(`${INSTAGRAM_BOT_ENDPOINT}/instagram/subscribe`, {
          json: {
            username: igUsername,
          },
          headers: {
            authorization: await getAuthorizationHeader(),
          },
        }).then(() => {
          toast.success(
            <>
              Instruktioner har skickats till
              {" "}
              <code>
                @
                {igUsername}
              </code>
              {" "}
              på Instagram
              .
            </>,
          );
          revalidate();
        }).catch((error) => {
          if (error.response?.status === 404) {
            setFieldError("igUsername", "Det finns ingen sådan användare.");
          } else {
            toast.error("Ett okänt fel uppstod.");
          }
        }).finally(() => {
          setSubmitting(false);
        });
      }}
    >
      <Field
        name="igUsername"
        validate={(username) => {
          setInputValue(username);

          if (username?.length <= 0) {
            return "Du måste ange ett användarnamn.";
          }

          if (username === data?.username) {
            if (data?.verified) {
              return "Du kan inte byta till ditt nuvarande användarnamn.";
            }
          }

          return undefined;
        }}
      >
        {({
          field,
          meta: {
            error,
          },
        }) => (
          <TextField
            {...field}
            type="text"
            placeholder="Användarnamn"
            error={error}
            status={<InstagramStatusText />}
            prefix="@"
          />
        )}
      </Field>
    </AccountSetting>
  );
};

export default InstagramSettings;
