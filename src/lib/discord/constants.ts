export interface ChannelDetails {
  id: string;
  authenticated: boolean;
}

export type ChannelName = "photos" | "news" | "telegrams" | "schedule";

export const DISCORD_CHANNELS: Record<ChannelName, ChannelDetails> = {
  photos: {
    id: process.env.NEXT_PUBLIC_DISCORD_PHOTOS_CHANNEL,
    authenticated: false,
  },
  news: {
    id: process.env.NEXT_PUBLIC_DISCORD_NEWS_CHANNEL,
    authenticated: true,
  },
  telegrams: {
    id: process.env.NEXT_PUBLIC_DISCORD_TELEGRAM_CHANNEL,
    authenticated: false,
  },
  schedule: {
    id: process.env.NEXT_PUBLIC_DISCORD_SCHEDULE_CHANNEL,
    authenticated: false,
  },
};

/**
 * Get the channel details for a channel with the specified `id`.
 *
 * @param {string} id Channel ID.
 *
 * @returns {ChannelDetails} The (possibly undefined) object with details about the channel.
 */
export const getChannelDetails = (id: string): ChannelDetails => (
  Object.values(DISCORD_CHANNELS).find((details) => details.id === id)
);

export const DISCORD_INVITE_LINK = "https://discord.gg/4hEnTpd";
