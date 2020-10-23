import Digibruh, { DigibruhTagArray } from "../../../digibruh/Digibruh";
import { StudySet } from "../shared/StudySet";
import { parse } from "node-html-parser";
import url from "url";
import { API_ENDPOINT } from "../../../food/constants";
import got from "got";

export interface PotatoStudySetDetails {
  id: string;
  title: string;
  description: string;
  term_count: number;
  author: string;
}

export class ServerStudySet extends StudySet {
  public static async fetchAll(): Promise<ServerStudySet[]> {
    const articles = await Digibruh.fetchAllPosts();

    const studySets: ServerStudySet[] = articles.reduce<ServerStudySet[]>(
      (accumulator, article) => {
        const root = parse(article?.html);

        const ids = root
          .querySelectorAll("a")
          .reduce<string[]>((validLinks, anchor) => {
            const link = url.parse(anchor.getAttribute("href"));

            if (
              link.host === "quizlet.com" &&
              this.pathRegExp.test(link.path)
            ) {
              const id = this.parseUrl(link.href);

              validLinks.push(id);
            }

            return validLinks;
          }, []);

        const tags = new DigibruhTagArray(...article.tags);

        const digibruh = {
          fields: tags.fields().map((field) => field.slug),
          subjects: tags.subjects().map((field) => field.slug),
        };

        return accumulator.concat(
          ids.map(
            (id) =>
              new ServerStudySet({
                digibruh,
                id,
                details: null,
              })
          )
        );
      },
      []
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
