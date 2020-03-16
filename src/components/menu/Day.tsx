import styles from "./Day.module.scss";
import React from "react";
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
        <p className={styles.date}>{date.getUTCDate().toString()}</p>
        <p className={styles.weekday}>{days[date.getUTCDay() - 1]}</p>
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
                <p className={styles.dish} key={index}>
                  {dish}
                </p>
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
