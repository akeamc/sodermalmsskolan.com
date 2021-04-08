import getLetterExcerpt, { LetterExcerpt } from "./getLetterExcerpt";

test("letter metadata trimming", () => {
  const target = "Här börjar det riktiga veckobrevet.";

  expect(getLetterExcerpt(`Anteckningar Sida 1 (3) Veckobrev Ovalen v.48 ${target}`)).toEqual<LetterExcerpt>({
    excerpt: target,
    team: "Ovalen",
  });

  expect(getLetterExcerpt(target)).toEqual<LetterExcerpt>({
    excerpt: target,
    team: undefined,
  });

  expect(getLetterExcerpt(`Veckobrev ovalen v48 ${target} mer info veckobrev v. 32`)).toEqual<LetterExcerpt>({
    excerpt: `${target} mer info veckobrev v. 32`,
    team: "Ovalen",
  });

  expect(getLetterExcerpt(undefined)).toEqual<LetterExcerpt>({
    excerpt: "",
    team: undefined,
  });
});
