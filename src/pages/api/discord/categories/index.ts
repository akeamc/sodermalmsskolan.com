import withAuth, {
  AuthenticatedApiHandler,
} from "../../../../lib/auth/withAuth";
import { ServerCategory } from "../../../../lib/discord/structures/server/Category";
import { ICategory } from "../../../../lib/discord/structures/shared/Category";

const handler: AuthenticatedApiHandler<ICategory[]> = async (_, res) => {
  const categories = await ServerCategory.fetchAll();

  return res.json(categories.map((category) => category.serialize()));
};

export default withAuth(handler);
