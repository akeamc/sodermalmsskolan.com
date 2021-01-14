import { CSSObject } from "@emotion/react";
import { Field, FormikValues } from "formik";
import ky from "ky-universal";
import React, { FunctionComponent } from "react";
import { toast } from "react-toastify";
import useSWR, { responseInterface } from "swr";
import { useAuth } from "../../../lib/auth/AuthContext";
import getAuthorizationHeader from "../../../lib/auth/header";
import TextField from "../../form/field/TextField";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
import { SuccessParagraph, WarningParagraph } from "../../text/paragraphs";
import AccountSetting from "../AccountSetting";

export interface Values extends FormikValues {
  igUsername: string;
}

interface InstagramStatus {
  uid: string;
  username: string;
  verified: boolean;
}

const BOT_ENDPOINT = "https://bot.xn--sdermalmsskolan-8sb.com";

/**
 * Use the status of the Instagram settings.
 *
 * @returns {responseInterface<InstagramStatus, *>} The status.
 */
const useInstagramStatus = (): responseInterface<InstagramStatus, unknown> => {
  const { user } = useAuth();

  return useSWR<InstagramStatus>(() => (user ? "/instagram/status" : undefined), async () => {
    const res = await ky.get(`${BOT_ENDPOINT}/instagram/status`, {
      headers: {
        authorization: await getAuthorizationHeader(),
      },
    }).json<InstagramStatus>();

    return res;
  });
};

/**
 * Description of the card.
 *
 * @returns {React.ReactElement} Rendered description.
 */
const Description: FunctionComponent = () => {
  const { data, isValidating } = useInstagramStatus();

  const css: CSSObject = {
    margin: 0,
  };

  if (isValidating && !data) {
    return <InlineSkeleton count={3} />;
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
      Du kan få automatiska direktmeddelanden vid viktiga händelser såsom inställda lektioner.
    </>
  );
};

/**
 * `AccountSetting` for notifications.
 *
 * @returns {React.ReactElement} The rendered setting.
 */
const InstagramSettings: FunctionComponent = () => {
  const { data } = useInstagramStatus();

  const initialValues: Values = {
    igUsername: data?.username,
  };

  return (
    <AccountSetting
      label="Instagram-notiser"
      description={<Description />}
      initialValues={initialValues}
      onSubmit={async ({ igUsername }, { setSubmitting, setFieldError }) => {
        ky.post("http://localhost:8080/instagram/subscribe", {
          json: {
            username: igUsername,
          },
          headers: {
            authorization: await getAuthorizationHeader(),
          },
        }).then(() => {
          toast.success("Du har fått ett meddelande med instruktioner.");
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
          if (username === data?.username) {
            return "Du kan inte byta till ditt nuvarande användarnamn.";
          }

          if (username?.length <= 0) {
            return "Du måste ange ett användarnamn.";
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
          <TextField {...field} type="text" placeholder="Användarnamn" error={error} />
        )}
      </Field>
    </AccountSetting>
  );
};

export default InstagramSettings;
