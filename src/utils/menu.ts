import fetch from "isomorphic-unfetch";

function unixTime(date): number {
  return (date.getTime() / 1000) | 0;
}

export async function getMenus(start: Date, end: Date): Promise<Menu[]> {
  const res = await fetch(
    `https://api.xn--sdermalmsskolan-8sb.com/menu?start=${unixTime(
      start
    )}&end=${unixTime(end)}`
  );

  if (res.status != 200) {
    throw new Error("Status code is not 200");
  }

  const data = await res.json();

  return data.menu;
}

export interface Photo {
  comment: string;
  author: string;
  timestamp: Date;
  url: string;
}

export interface Menu {
  dishes: string[];
  timestamp: Date;
  photos: Photo[];
}
