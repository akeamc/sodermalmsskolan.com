import classNames from "classnames";
import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import { GitHub } from "react-feather";

export type FooterProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

/**
 * A page footer.
 *
 * @param {React.PropsWithChildren<FooterProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered footer.
 */
const Footer: FunctionComponent<FooterProps> = ({
  className,
  ...props
}) => (
  <footer className={classNames("container py-16 text-center", className)} {...props}>
    <div className="text-center text-gray-700 dark:text-gray-500">
      <a
        href="//github.com/ThePicoNerd/sodermalmsskolan.com/"
        className="inline-block hover:text-gray-500 dark:hover:text-gray-700 transition-colors"
      >
        <GitHub />
      </a>
      <p className="mt-4 text-gray-500 font-medium">© 2019–2021 Åke Amcoff</p>
    </div>
  </footer>
);

export default Footer;
