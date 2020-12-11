import { useMemo } from "react";
import { DISCORD_CHANNELS } from "../../discord/constants";
import { useChannelMessages } from "../../discord/structures/client/Channel";
import { useDish } from "./dish";

export interface FoodPhoto {
  url: string;
  label: string;
  id: string;
  timestamp: Date;
}

/**
 * Search *The Discords* for images labeled with the dishes title. Very advanced.
 *
 * @param id ID of the dish.
 */
export const useDishPhotos = (id: string): FoodPhoto[] => {
  const dish = useDish(id);

  const { data: messages } = useChannelMessages({
    channel: DISCORD_CHANNELS.photos.id,
    pageSize: 100,
  });

  return useMemo(() => {
    if (dish && messages) {
      return messages.flat().reduce((photos, message) => {
        if (dish.title.toLowerCase().includes(message.content.toLowerCase())) {
          const messagePhotos: FoodPhoto[] = message.attachments.map((attachment) => ({
            url: attachment.url,
            id: attachment.id,
            label: message.content,
            timestamp: message.createdAt,
          }));

          photos.push(...messagePhotos);
        }

        return photos;
      }, []);
    }

    return undefined;
  }, [dish, messages]);
};
