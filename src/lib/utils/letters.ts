export const firstLetterUpperCase = (input: string): string => {
  const first = input.charAt(0);

  return first.toUpperCase() + input.slice(1);
};
