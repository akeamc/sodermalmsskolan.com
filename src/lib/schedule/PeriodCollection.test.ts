import { CHOICES } from "./choice";

describe("PeriodCollection tests", () => {
  it("marks periods", () => {
    const collection = CHOICES[0].collections[0];

    collection.periods.forEach((period) => {
      expect(period.collection).toBe(collection.shortName);
    });
  });

  it("returns an id", () => {
    const collection = CHOICES[0].collections[0];

    expect(collection.id).toBe(collection.shortName);
  });
});
