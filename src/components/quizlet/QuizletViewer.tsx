import React from "react";
import { Text, H5 } from "../basic/Typography";
import { APIClient } from "./../../utils/api";
import { Status } from "../../utils/status";
import { Spinner } from "../basic/Spinner";
import { StudySetCard } from "./StudySetCard";
import styles from "./QuizletViewer.module.scss";
import Twemoji from "react-twemoji";
import * as icons from "react-feather";
import { StudySet } from "../../utils/quizlet";

export class QuizletViewer extends React.Component<
  {},
  {
    status: Status;
    studySets: StudySet[];
    filter: string[];
    categories: string[];
  }
> {
  private apiClient: APIClient;

  constructor(props) {
    super(props);

    this.state = {
      status: Status.Loading,
      studySets: [],
      filter: [],
      categories: []
    };

    this.apiClient = new APIClient();

    this.fetchData();
  }

  fetchData() {
    this.apiClient.quizlet.getStudySets()
      .then(studySets => {
        this.setState({
          status: Status.Done,
          studySets,
          categories: studySets
            .reduce((previous, current) => {
              return previous.concat(current.categories);
            }, [])
            .filter((a, b, array) => array.indexOf(a) === b)
        });
      })
      .catch(error => {
        this.setState({
          status: Status.Error
        });
        console.error(error);
      });
  }

  toggleFilter = category => {
    const selected = this.state.filter.includes(category);

    if (selected) {
      this.setState({
        filter: this.state.filter.filter(value => {
          return value != category;
        })
      });
    } else {
      this.setState({
        filter: [...this.state.filter, category]
      });
    }
  };

  render() {
    const { status, studySets, filter, categories } = this.state;

    switch (status) {
      case Status.Loading:
        return <Spinner></Spinner>;
      case Status.Error:
        return <Text>Ett fel inträffade</Text>;
      case Status.Done:
        if (studySets.length == 0) {
          return <Text>Inga study sets har publicerats.</Text>;
        }

        const filteredSets = this.state.studySets.filter(set => {
          for (let category of this.state.filter) {
            if (!set.categories.includes(category)) {
              return false;
            }
          }

          return true;
        });

        return (
          <div className={styles.quizletViewer}>
            <div className={styles.filter}>
              <H5>Filtrera</H5>
              {categories.map(category => {
                const selected = filter.includes(category);

                return (
                  <button
                    onClick={() => this.toggleFilter(category)}
                    className={`${styles.filterOption} ${
                      selected ? styles.filterOptionSelected : null
                    }`}
                  >
                    <Text>
                      <Twemoji options={{ className: styles.filterEmoji }}>
                        {category}
                      </Twemoji>
                      {selected ? <icons.X /> : null}
                    </Text>
                  </button>
                );
              })}
            </div>
            <div className={styles.cardContainer}>
              {filteredSets.map((set, index) => {
                return <StudySetCard studySet={set} key={index}></StudySetCard>;
              })}
            </div>
          </div>
        );
    }
  }
}
