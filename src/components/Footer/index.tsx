import classNames from "classnames";
import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import Link from "next/link";
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
  <footer className={classNames("container pt-16 pb-4", className)} {...props}>
    <div className="text-gray-400 dark:text-gray-700 text-sm font-medium flex items-center leading-tight">
      <div className="flex-1 flex">
        <span className="mr-auto">© 2019–2021 Åke Amcoff</span>
      </div>
      <div className="flex-1 flex">
        <a
          href="//github.com/ThePicoNerd/sodermalmsskolan.com/"
          className="inline-block hover:text-gray-500 transition-colors mx-auto"
        >
          <GitHub />
        </a>
      </div>
      <div className="flex-1 flex">
        <Link href="/om">
          <a className="ml-auto hover:text-gray-500 transition-colors">Om oss</a>
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
