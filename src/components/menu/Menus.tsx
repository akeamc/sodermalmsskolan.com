import styles from "./Menu.module.scss";
import React from "react";

import { APIClient } from "../../utils/api";
import { Text } from "../basic/Typography";
import { Status } from "../../utils/status";
import { Spinner } from "../basic/Spinner";
import moment from "moment";
import { Day } from "./Day";
import { Menu } from "../../utils/menu";

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
  private apiClient: APIClient;

  constructor(props) {
    super(props);

    this.state = {
      status: Status.Loading,
      menus: []
    };

    this.apiClient = new APIClient();
    this.fetchData();
  }

  fetchData() {
    this.apiClient.menu.getMenu(this.props.start, this.props.end)
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
          <table className={styles.menu}>
            <tbody>
              {this.state.menus.map((menu, index) => {
                let highlight = false;

                if (
                  !foundNextDay &&
                  moment(menu.timestamp).isSameOrAfter(now, "day")
                ) {
                  highlight = true;
                  foundNextDay = true;
                }

                return (
                  <Day menu={menu} highlight={highlight} key={index}></Day>
                );
              })}
            </tbody>
          </table>
        );
    }
  }
}
