export const firstLetterUpperCase = (input: string): string => {
  let first = input.charAt(0);

  return first.toUpperCase() + input.slice(1);
};
