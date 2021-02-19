import pdf from "pdf-parse";
import got from "got";
import LetterAttachment from "../structures/LetterAttachment";

/**
 * Download and parse a PDF.
 *
 * @param {string} url The URL of the PDF.
 *
 * @returns {LetterAttachment} The output.
 */
const parsePdf = async (url: string): Promise<LetterAttachment> => {
  const buf = await got.get(url).buffer();

  const data = await pdf(buf);

  return {
    content: data.text,
    pages: data.numpages,
  };
};

export default parsePdf;
