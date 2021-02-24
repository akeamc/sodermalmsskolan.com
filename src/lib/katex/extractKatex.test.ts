import extractKatex from "./extractKatex";
import { SplitFragment } from "./splitAtDelimeters";

describe("extract katex test", () => {
  it("extracts katex correctly", () => {
    expect(extractKatex("Since $<fake equation>$ \\(E=mc^2\\), $$mc^2=E$$ And that's a fact.")).toEqual<SplitFragment[]>([{
      data: "Since $<fake equation>$ ",
      type: "text",
    }, {
      data: "E=mc^2",
      display: false,
      type: "math",
    }, {
      data: ", ",
      type: "text",
    }, {
      data: "mc^2=E",
      type: "math",
      display: true,
    }, {
      data: " And that's a fact.",
      type: "text",
    }]);

    expect(extractKatex("\\(e^(\\pi i)\\) is quite beautiful.")).toEqual<SplitFragment[]>([{
      data: "e^(\\pi i)",
      display: false,
      type: "math",
    }, {
      data: " is quite beautiful.",
      type: "text",
    }]);
  });
});
