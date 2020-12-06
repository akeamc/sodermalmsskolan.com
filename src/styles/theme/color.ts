interface Color {
  background: string;
  accent: string;

  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    white: string;
  };

  skeleton: {
    base: string;
    highlight: string;
  };
}

export default Color;
