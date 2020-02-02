import styles from "./Menu.module.css";
import React from "react";
import { Day } from "./Day";

import { getMenus, Menu } from "../../services/menu";
import { Text } from "../basic/Text";
import { Status } from "../../services/status";
import { Spinner } from "../basic/Spinner";

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
    this.setState({ status: Status.Loading });
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
      this.fetchData();
    }
  }

  render() {
    switch (this.state.status) {
      case Status.Loading:
        return <Spinner></Spinner>;
      case Status.Error:
        return <Text>Ett fel inträffade</Text>;
      case Status.Done:
        if (this.state.menus.length == 0) {
          return <Text>Menyn är inte tillgänglig.</Text>;
        }

        return (
          <div className={styles.menu}>
            {this.state.menus.map(menu => {
              return <Day menu={menu}></Day>;
            })}
          </div>
        );
    }
  }
}
