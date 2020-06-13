import moment from "moment";
import { AuthorGroup } from "../../basic/Avatar";
import Skeleton from "react-loading-skeleton";
import { AutoLink } from "../../basic/AutoLink";
import { GenericUser } from "../../../models/User";
import { Author } from "@tryghost/content-api";
import { getAuthorUrl } from "../../../api/ghost/author";

const MetaSection: React.FunctionComponent<{
  publishedAt: Date;
  authors: Author[];
  loading?: boolean;
}> = (props) => {
  const { publishedAt, authors, loading } = props;

  return (
    <div className="row align-items-center py-5 border-top border-bottom">
      <div className="col-auto">
        <AuthorGroup authors={authors.map(GenericUser.fromAuthor)} />
      </div>
      <div className="col ml-n5">
        <h6 className="text-uppercase mb-0">
          {loading ? (
            <Skeleton width="50%" />
          ) : (
            authors?.map((author, index) => (
              <span key={index}>
                {index > 0 && ", "}
                <AutoLink className="text-reset" href={getAuthorUrl(author.slug)}>
                  {author.name}
                </AutoLink>
              </span>
            ))
          )}
        </h6>

        <time className="font-size-sm text-muted" dateTime="2019-05-20">
          {loading ? (
            <Skeleton width="50%" />
          ) : (
            <>
              Publicerad{" "}
              {moment(publishedAt).locale("sv").format("D MMMM yyyy")}
            </>
          )}
        </time>
      </div>
    </div>
  );
};

export default MetaSection;
