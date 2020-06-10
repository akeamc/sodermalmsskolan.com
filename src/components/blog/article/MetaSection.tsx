import { Author } from "../../../api/ghost/posts";
import moment from "moment";
import { Avatar } from "../../basic/Avatar";
import Skeleton from "react-loading-skeleton";

const MetaSection: React.FunctionComponent<{
  publishedAt: Date;
  author: Author;
  loading?: boolean;
}> = (props) => {
  const { publishedAt, author, loading } = props;

  return (
    <div className="row align-items-center py-5 border-top border-bottom">
      <div className="col-auto">
        <Avatar size="lg" imageUrl={author?.profile_image} />
      </div>
      <div className="col ml-n5">
        <h6 className="text-uppercase mb-0">
          {loading ? <Skeleton width="50%" /> : author?.name}
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
