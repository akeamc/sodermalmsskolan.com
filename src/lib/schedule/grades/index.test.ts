import grades from ".";

describe("period collection tests", () => {
  test("all regular expressions should be case-insensitive", () => {
    grades.flatMap((grade) => grade.periodCollections).forEach((collection) => {
      expect(collection.appliesTo.ignoreCase).toBe(true);
    });
  });

  test("the choice matrix must match all period collections", () => {
    grades.forEach((grade) => {
      const choices = grade.choiceMatrix.flat();

      grade.periodCollections.forEach((collection) => {
        expect(choices.find((choice) => collection.appliesTo.test(choice))).toBeDefined();
      });
    });
  });
});
