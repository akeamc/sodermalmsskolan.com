import styles from "./_variables.scss";

interface Colors {
  primary: string;
  success: string;
  danger: string;
}

export const colors: Colors = {
  primary: styles.colorPrimary,
  success: styles.colorSuccess,
  danger: styles.colorDanger,
};
