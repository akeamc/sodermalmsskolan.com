import useSWR, { responseInterface } from "swr";
import Letter, { fetchLetters, fetchUrl } from "../structures/Letter";

/**
 * React hook to fetch all letters.
 *
 * @returns {responseInterface<Letter[], any>} The response interface containing the letters.
 */
const useLetters = (): responseInterface<Letter[], unknown> => useSWR(fetchUrl, fetchLetters);

export default useLetters;
