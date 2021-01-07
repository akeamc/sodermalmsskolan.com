import extractHrefs from "./extractHrefs";

test("extract hrefs", () => {
  expect(extractHrefs(`
    <p href="invalid-p-href">quite invalid</p>
    <a href="noted">noted</a>
    <a>not noted</a>
  `)).toEqual(["noted"]);
});
