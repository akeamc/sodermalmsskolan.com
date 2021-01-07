import React, { FunctionComponent } from "react";
import { SmallParagraph } from "../../text/paragraphs";

/**
 * Form text component, used to show text such as annotations inside of a form.
 *
 * @param {React.PropsWithChildren} props Props passed to the `<p>`
 *
 * @returns {React.ReactElement} The styled paragraph.
 */
const FormText: FunctionComponent = (props) => (
  <SmallParagraph
    css={{
      margin: "1rem 0",

      a: {
        fontWeight: 500,
      },
    }}
    {...props}
  />
);

export default FormText;
