import { IDiscordAPIUser } from "./User";

export interface IDiscordAPIEmoji {
  id?: string;
  name?: string;
  roles?: string[];
  user?: IDiscordAPIUser;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}
