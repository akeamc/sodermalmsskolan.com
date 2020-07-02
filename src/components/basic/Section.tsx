export const Section: React.FunctionComponent<{ hero?: boolean }> = ({
  children,
  hero = false,
}) => {
  let classList = [];

  if (hero) classList.push("section-hero");

  return <section className={classList.join(" ")}>{children}</section>;
};
