import styles from "./Day.module.scss";
import React from "react";
import { H2, Text, Paragraph } from "../basic/Text";
import { Menu } from "../../services/menu";

const days = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag"
];

export class Day extends React.Component<{ menu: Menu; highlight?: boolean }> {
  prettyDate(date: Date | string) {
    date = new Date(date);

    return (
      <p className={styles.datewrapper}>
        <Text className={styles.date}>{date.getUTCDate().toString()}</Text>
        <Text className={styles.weekday}>{days[date.getUTCDay() - 1]}</Text>
      </p>
    );
  }

  render() {
    const { menu, highlight } = this.props;

    return (
      <tr
        className={styles.day}
        {...(highlight ? { "data-highlight": "yes" } : {})}
      >
        <td>{this.prettyDate(menu.timestamp)}</td>
        <td>
          {menu.dishes.map(dish => {
            return <Text className={styles.dish}>{dish}</Text>;
          })}
        </td>
      </tr>
    );
  }
}
