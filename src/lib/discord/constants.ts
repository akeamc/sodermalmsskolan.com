export interface ChannelDetails {
  id: string;
  authenticated: boolean;
}

export interface Channels extends Record<string, ChannelDetails> {
  photos: ChannelDetails;
  news: ChannelDetails;
}

export const DISCORD_CHANNELS: Channels = {
  photos: {
    id: process.env.NEXT_PUBLIC_DISCORD_PHOTOS_CHANNEL,
    authenticated: false,
  },
  news: {
    id: process.env.NEXT_PUBLIC_DISCORD_NEWS_CHANNEL,
    authenticated: true,
  },
};

export const getChannelDetails = (id: string): ChannelDetails => {
  return Object.values(DISCORD_CHANNELS).find((details) => details.id === id);
};
