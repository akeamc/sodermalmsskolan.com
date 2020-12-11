import { parse } from "node-html-parser";
import url from "url";
import got from "got";
import { StudySet } from "../shared/StudySet";
import { API_ENDPOINT } from "../../../food/constants";
import { browsePosts } from "../../../ghost/post";
import { digibruhTagPrefix } from "../../../digibruh/constants";

export interface PotatoStudySetDetails {
  id: string;
  title: string;
  description: string;
  term_count: number;
  author: string;
}

export class ServerStudySet extends StudySet {
  public static async fetchAll(): Promise<ServerStudySet[]> {
    const articles = await browsePosts({
      limit: "all",
      filter: `tag:${digibruhTagPrefix}`,
    });

    const studySets: ServerStudySet[] = articles.reduce<ServerStudySet[]>(
      (accumulator, article) => {
        const root = parse(article?.html);

        const ids = root
          .querySelectorAll("a")
          .reduce<string[]>((validLinks, anchor) => {
          const link = url.parse(anchor.getAttribute("href"));

          if (
            link.host === "quizlet.com"
              && this.pathRegExp.test(link.path)
          ) {
            const id = this.parseUrl(link.href);

            validLinks.push(id);
          }

          return validLinks;
        }, []);

        return accumulator.concat(
          ids.map(
            (id) => new ServerStudySet({
              id,
              details: null,
            }),
          ),
        );
      },
      [],
    );

    return studySets;
  }

  public async fetchDetails(): Promise<void> {
    const res = await got
      .get(`${API_ENDPOINT}/quizlet/${this.id}`)
      .json<PotatoStudySetDetails>();

    this.details = {
      title: res.title,
      description: res.description,
      terms: res.term_count,
      author: res.author,
    };
  }
}
