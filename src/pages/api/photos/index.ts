import { NextApiRequest, NextApiResponse } from "next";
import { fetchPhotos, FoodPhotosResponse } from "../../../lib/discord/photos";
import validator from "validator";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<FoodPhotosResponse>
) => {
  const { query } = req;

  const before = query.before ? query.before.toString() : null;
  const after = query.after ? query.after.toString() : null;
  const limit = (query.limit || 50).toString();

  if (before && !validator.isInt(before)) {
    return res.status(400).end("`before` must be an integer.");
  }

  if (after && !validator.isInt(after)) {
    return res.status(400).end("`after` must be an integer.");
  }

  if (!validator.isInt(limit)) {
    return res.status(400).end("`limit` must be an integer.");
  }

  const photos = await fetchPhotos({
    before: before ? validator.toInt(before) : null,
    after: after ? validator.toInt(after) : null,
    limit: validator.toInt(limit),
  });

  return res.json(photos);
};
