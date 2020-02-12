import React from "react";
import { StudySet } from "../../utils/quizlet";
import styles from "./StudySetCard.module.scss";
import { H5 } from "../basic/Typography";
import Twemoji from "react-twemoji";

export class StudySetCard extends React.Component<{ studySet: StudySet }> {
  render() {
    const { studySet } = this.props;

    return (
      <div className={styles.cardWrapper}>
        <a className={styles.studySetCard} href={studySet.url}>
          <H5>{studySet.name}</H5>
          <div className={styles.categories}>
            {studySet.categories.map((category, index) => {
              return <Twemoji key={index}>{category}</Twemoji>;
            })}
          </div>
        </a>
      </div>
    );
  }
}
