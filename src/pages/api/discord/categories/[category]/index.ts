import {
  ServerCategory,
  ServerCategoryHandler,
} from "../../../../../lib/discord/structures/server/Category";
import { ICategory } from "../../../../../lib/discord/structures/shared/Category";

const handler: ServerCategoryHandler<ICategory> = async (_, res, category) => res.json(category.serialize());

export default ServerCategory.wrapHandler(handler);
