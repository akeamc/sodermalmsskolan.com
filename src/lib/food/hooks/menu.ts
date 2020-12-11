import { ClientMenu, useMenu } from "../structures/client/Menu";

/**
 * Use today's menu.
 */
export const useDayMenu = (): ClientMenu => {
  const { data } = useMenu({
    limit: 1,
  });

  return data?.[0];
};
