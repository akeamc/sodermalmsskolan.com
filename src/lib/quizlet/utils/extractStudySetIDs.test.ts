import extractStudySetIDs, { studySetIdRegExp } from "./extractStudySetIDs";

const id = "254345590";

test("study set ID regular expression", () => {
  expect(studySetIdRegExp.test(id)).toBe(true);
  expect(studySetIdRegExp.test(`background-${id}-noise`)).toBe(false);
  expect(studySetIdRegExp.test("123")).toBe(false);
  expect(studySetIdRegExp.test("1234.5678")).toBe(false);
});

test("extract study set IDs", () => {
  expect(extractStudySetIDs([
    "quite-invalid-link.INDÉED",
    "https://quizlet.com/254345590/never-gonna-give-you-up-flash-cards/",
    "https://quizlet.com/254345590/",
    "https://quizlet.com/254345590",
    "https://quizlet.com/2543",
    "https://quizlet.com/999999999",
    "https://google.com/111111111",
  ])).toEqual(["254345590", "999999999"]);

  expect(extractStudySetIDs([
    "https://quizlet.com/999999999",
    "https://google.com/111111111",
  ], "google.com")).toEqual(["111111111"]);
});
