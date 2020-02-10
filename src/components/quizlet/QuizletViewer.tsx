import React from "react";
import { Text, H4 } from "../basic/Typography";
import moment from "moment";
import { Quizlet, StudySet } from "./../../utils/quizlet";
import { Status } from "../../utils/status";
import { Spinner } from "../basic/Spinner";
import { StudySetCard } from "./StudySetCard";

export class QuizletViewer extends React.Component<
  {},
  {
    status: Status;
    studySets: StudySet[];
  }
> {
  constructor(props) {
    super(props);

    this.state = {
      status: Status.Loading,
      studySets: []
    };

    this.fetchData();
  }

  fetchData() {
    Quizlet.fetchStudySets()
      .then(studySets => {
        this.setState({
          status: Status.Done,
          studySets
        });
      })
      .catch(error => {
        this.setState({
          status: Status.Error
        });
        console.error(error);
      });
  }

  render() {
    const now = moment();

    switch (this.state.status) {
      case Status.Loading:
        return <Spinner></Spinner>;
      case Status.Error:
        return <Text>Ett fel inträffade</Text>;
      case Status.Done:
        if (this.state.studySets.length == 0) {
          return <Text>Inga study sets har publicerats.</Text>;
        }

        return (
          <div>
            {this.state.studySets.map((studySet, index) => {
              return <StudySetCard studySet={studySet} key={index}></StudySetCard>;
            })}
          </div>
        );
    }
  }
}
