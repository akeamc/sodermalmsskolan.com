import got from "got";
import { StudySet } from "../shared/StudySet";
import API_ENDPOINT from "../../../food/endpoint";
import { browsePosts } from "../../../ghost/post";
import digibruhTagPrefix from "../../../digibruh/digibruhTagPrefix";
import extractHrefs from "../../utils/extractHrefs";
import extractStudySetIDs from "../../utils/extractStudySetIDs";

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

    const studySetIds: string[] = articles.reduce((ids, article) => {
      const hrefs = extractHrefs(article.html);

      extractStudySetIDs(hrefs).forEach((id) => {
        if (!ids.includes(id)) {
          ids.push(id);
        }
      }, []);

      return ids;
    }, []);

    return studySetIds.map((id) => new ServerStudySet({
      id,
      details: null,
    }));
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
