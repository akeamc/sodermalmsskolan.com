import Parser from "rss-parser";

const parser = new Parser();

const CORS_PROXY = "https://yacdn.org/proxy/";

export interface FoodMenu {
  dishes: string[];
  timestamp: Date;
}

/**
 * @param limit How many to retreive. Not guaranteed, since there are limits on the API itself.
 */
export async function getNext(limit = 10): Promise<FoodMenu[]> {
  /**
   * So that took longer than expected.
   * Turns out the proxy was working the entire time, I just forgot to switch from `parser.parseURL` to `parser.parseString`. It was parsing something and read it as an URL, and made an request to localhost:80. Come on.
   *  */
  const url = `${CORS_PROXY}https://skolmaten.se/sodermalmsskolan-gamla-maria/rss/days/?limit=${limit}`;
  const feed = await parser.parseURL(url);

  if (feed.items) {
    return feed.items.map((item) => {
      // Add punctuation if not already existing. The array is reversed because the most popular meal often is written last.
      const dishes = item.content
        ?.split(/<br\s*\/?>/g)
        .reverse()
        .map((dish) => (dish += dish.endsWith(".") ? "" : "."));

      return {
        dishes,
        timestamp: new Date(item.pubDate) || new Date(),
      };
    });
  }

  return [];
}
