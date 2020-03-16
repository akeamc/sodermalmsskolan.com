import { Menus } from "./Menus";
import React from "react";
import moment from "moment";
import styles from "./MonthViewer.module.scss";
import * as icons from "react-feather";

const months = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December"
];

export class MonthViewer extends React.Component<
  {},
  {
    focus: Date;
  }
> {
  constructor(props) {
    super(props);

    const focus = new Date();

    this.state = {
      focus
    };
  }

  previous = () => {
    this.setState({
      focus: moment(this.state.focus)
        .subtract(1, "month")
        .toDate()
    });
  };

  next = () => {
    this.setState({
      focus: moment(this.state.focus)
        .add(1, "month")
        .toDate()
    });
  };

  render() {
    const { focus } = this.state;
    const start = new Date(focus.getFullYear(), focus.getMonth(), 1);
    const end = new Date(focus.getFullYear(), focus.getMonth() + 1, 0);

    return (
      <div>
        <div className={styles.pagination}>
          <a className={styles.previous} onClick={this.previous}>
            <icons.ChevronLeft size={16} />
              {
                months[
                  moment(focus)
                    .subtract(1, "month")
                    .month()
                ]
              }
          </a>
          <a className={styles.next} onClick={this.next}>
              {
                months[
                  moment(focus)
                    .add(1, "month")
                    .month()
                ]
              }
            <icons.ChevronRight size={16} />
          </a>
        </div>
        <h4>{months[focus.getMonth()] + " " + focus.getFullYear()}</h4>
        <Menus start={start} end={end}></Menus>
      </div>
    );
  }
}
