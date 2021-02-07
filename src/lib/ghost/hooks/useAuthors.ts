import useSWR, { responseInterface } from "swr";
import Author, { browseAuthors } from "../author";
import { LimitParam } from "../common";

/**
 * React hook that returns Ghost authors.
 *
 * @param {LimitParam} limit How many authors to query.
 *
 * @returns {responseInterface<Author[], any>} SWR response interface containing the authors.
 */
const useAuthors = (limit: LimitParam = "all"): responseInterface<Author[], unknown> => useSWR(`/ghost/authors?limit=${limit}`, () => browseAuthors({
  limit,
}));

export default useAuthors;
