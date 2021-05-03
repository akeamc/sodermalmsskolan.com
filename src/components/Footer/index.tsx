import React, { FunctionComponent } from "react";
import { GitHub } from "react-feather";

/**
 * A page footer.
 *
 * @returns {React.ReactElement} The rendered footer.
 */
const Footer: FunctionComponent = () => (
  <footer className="container mt-16 mb-4 text-center">
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
