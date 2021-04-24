import classNames from "classnames/bind";
import React, { FunctionComponent } from "react";
import { Download } from "react-feather";
import useLetters from "../../lib/news/hooks/useLetters";
import VerticalStack from "../list/VerticalStack";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import SidebarHeading from "../typography/headings/SidebarHeading";
import styles from "./LetterWidget.module.scss";

const cx = classNames.bind(styles);

/**
 * A widget displaying letters.
 *
 * @returns {React.ReactElement} The rendered widget.
 */
const LetterWidget: FunctionComponent = () => {
  const { data } = useLetters();
  const letters = data ?? new Array(5).fill(undefined);

  return (
    <div>
      <SidebarHeading>Veckobrev</SidebarHeading>
      <VerticalStack>
        {letters?.map((letter, index) => (
          <li key={letter?.id ?? index}>
            <a href={letter?.url ?? ""} className={cx("letter")}>
              <span className={cx("title")}>
                {letter?.title ?? <InlineSkeleton />}
              </span>
              {letter?.title ? <Download className={cx("icon")} /> : <InlineSkeleton width="1em" />}
            </a>
          </li>
        ))}
      </VerticalStack>
    </div>
  );
};

export default LetterWidget;
