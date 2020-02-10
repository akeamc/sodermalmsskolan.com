import React from "react";
import { StudySet } from "../../utils/quizlet";

export class StudySetCard extends React.Component<{ studySet: StudySet }> {
  render() {
    const { studySet } = this.props;

    return (
      <div>
        <pre>{studySet}</pre>
      </div>
    );
  }
}
