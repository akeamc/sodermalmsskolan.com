import { NextApiRequest, NextApiResponse } from "next";
import { fetchPhotos, FoodPhotosResponse } from "../../../lib/discord/photos";
import validator from "validator";
import { DISCORD_EPOCH } from "../../../lib/discord/constants/time";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<FoodPhotosResponse>
) => {
  const { query } = req;

  const before = query.before ? query.before.toString() : null;
  const after = query.after ? query.after.toString() : null;
  const limit = (query.limit || 50).toString();

  const forbidden = (message: string) => {
    return res.status(400).end(message);
  };

  if (before && !validator.isInt(before, { min: DISCORD_EPOCH }))
    return forbidden(
      `\`before\` must be an integer not smaller  than ${DISCORD_EPOCH}.`
    );

  if (after && !validator.isInt(after, { min: DISCORD_EPOCH }))
    return forbidden(
      `\`after\` must be an integer not smaller than ${DISCORD_EPOCH}.`
    );

  if (
    !validator.isInt(limit, {
      max: 100,
      min: 1,
    })
  )
    return forbidden(
      "`limit` must be a positive integer less than or equal to 100."
    );

  const photos = await fetchPhotos({
    before: before ? validator.toInt(before) : null,
    after: after ? validator.toInt(after) : null,
    limit: validator.toInt(limit),
  });

  return res.json(photos);
};
