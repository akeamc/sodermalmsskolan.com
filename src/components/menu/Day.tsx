import styles from "./Day.module.css";
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

export class Day extends React.Component<{ menu: Menu }> {
  prettyDate(date: Date | string) {
    date = new Date(date);

    return (
      <p className={styles.datewrapper}>
        <Text className={styles.date}>
          {date
            .getUTCDate()
            .toString()
            .padStart(2, "0")}
        </Text>
        <Text className={styles.weekday}>{days[date.getUTCDay() - 1]}</Text>
      </p>
    );
  }

  render() {
    const { menu } = this.props;

    return (
      <tr className={styles.day}>
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
