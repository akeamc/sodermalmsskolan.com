import React from "react";
import { StudySet } from "../../utils/quizlet";
import styles from "./StudySetCard.module.scss";
import { H5 } from "../basic/Typography";
import {Twemoji} from "react-emoji-render";

export class StudySetCard extends React.Component<{ studySet: StudySet }> {
  render() {
    const { studySet } = this.props;

    return (
      <a className={styles.studySetCard} href={studySet.url}>
        <H5>{studySet.name}</H5>
        <div className={styles.categories}>
          {studySet.categories.map((category, index) => {
            console.log(category);
            return <Twemoji svg text={category} key={index} />
          })}
        </div>
      </a>
    );
  }
}
