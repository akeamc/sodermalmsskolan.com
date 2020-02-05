import styles from "./Day.module.scss";
import React from "react";
import { Text } from "../basic/Typography";
import { Menu } from "../../utils/menu";

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
        <td className={styles.mainContentWrapper}>
          <div className={styles.dishes}>
            {menu.dishes.map((dish, index) => {
              return (
                <Text className={styles.dish} key={index}>
                  {dish}
                </Text>
              );
            })}
          </div>
          {menu.photos.length > 0 ? (
            <div className={styles.photos}>
              {menu.photos.map((photo, index) => {
                return (
                  <a className={styles.photo} href={photo.url}>
                    <img src={photo.url} key={index} />
                  </a>
                );
              })}
            </div>
          ) : null}
        </td>
      </tr>
    );
  }
}
