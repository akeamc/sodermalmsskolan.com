import styles from "./Menu.module.scss";
import React from "react";
import { Day } from "./Day";

import { getMenus, Menu } from "../../services/menu";
import { Text } from "../basic/Text";
import { Status } from "../../services/status";
import { Spinner } from "../basic/Spinner";
import moment from "moment";

export class Menus extends React.Component<
  {
    start: Date;
    end: Date;
  },
  {
    status: Status;
    menus: Menu[];
  }
> {
  constructor(props) {
    super(props);

    this.state = {
      status: Status.Loading,
      menus: []
    };

    this.fetchData();
  }

  fetchData() {
    getMenus(this.props.start, this.props.end)
      .then(menus => {
        this.setState({
          status: Status.Done,
          menus
        });
      })
      .catch(error => {
        this.setState({
          status: Status.Error
        });
        console.error(error);
      });
  }

  componentDidUpdate(previous) {
    if (
      previous.start !== this.props.start ||
      previous.end !== this.props.end
    ) {
      this.setState({ status: Status.Loading });
      this.fetchData();
    }
  }

  render() {
    const now = moment();

    switch (this.state.status) {
      case Status.Loading:
        return <Spinner></Spinner>;
      case Status.Error:
        return <Text>Ett fel inträffade</Text>;
      case Status.Done:
        if (this.state.menus.length == 0) {
          return <Text>Menyn är inte tillgänglig.</Text>;
        }

        let foundNextDay = !now.isSame(this.props.start, "month");

        return (
          <div className={styles.menu}>
            {this.state.menus.map(menu => {
              let highlight = false;

              if (!foundNextDay && moment(menu.timestamp).isSameOrAfter(now, "day")) {
                highlight = true;
                foundNextDay = true;
              }

              return <Day menu={menu} highlight={highlight}></Day>;
            })}
          </div>
        );
    }
  }
}
