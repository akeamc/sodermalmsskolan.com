import { FirebaseError } from "firebase-admin";

export interface LoginFormValues {
  email: string;
  password: string;
}

export type SignupFormValues = LoginFormValues;

export type AuthFormValues = LoginFormValues & SignupFormValues;

export const emailRegEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

type AuthFormField = keyof AuthFormValues;

export interface AuthFormError {
  field: AuthFormField;
  message: string;
}

/**
 * Validate an email address and return a string containing the errors found.
 * `undefined` as a return value is good. Very good.
 */
export const validateEmail = (email: string): string => {
  if (!email) {
    return "Du måste ange en giltig e-postadress.";
  }

  if (!emailRegEx.test(email)) {
    return "E-postadressen är ogiltig.";
  }

  return undefined;
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return "Du måste ange ett lösenord.";
  }

  return undefined;
};

export const translateFirebaseError = (
  error: FirebaseError,
): AuthFormError => {
  switch (error.code) {
    case "auth/wrong-password": {
      return {
        field: "password",
        message: "Lösenordet är felaktigt.",
      };
    }
    case "auth/user-not-found": {
      return {
        field: "email",
        message: "Det finns ingen användare med den e-postadressen.",
      };
    }
    case "auth/weak-password": {
      return {
        field: "password",
        message: "Lösenordet måste vara minst 6 tecken långt.",
      };
    }
    case "auth/email-already-in-use": {
      return {
        field: "email",
        message: "E-postadressen används redan.",
      };
    }
    default: {
      return {
        field: "email",
        message: error.message,
      };
    }
  }
};
