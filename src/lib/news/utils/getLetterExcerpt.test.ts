import getLetterExcerpt from "./getLetterExcerpt";

test("letter metadata trimming", () => {
  const target = "Här börjar det riktiga veckobrevet.";

  expect(getLetterExcerpt(`Anteckningar Sida 1 (3) Veckobrev Ovalen v.48 ${target}`)).toBe(target);
  expect(getLetterExcerpt(target)).toBe(target);
  expect(getLetterExcerpt(`Veckobrev ovalen v48 ${target} mer info veckobrev v. 32`)).toBe(`${target} mer info veckobrev v. 32`);
  expect(getLetterExcerpt()).toEqual("");
});
