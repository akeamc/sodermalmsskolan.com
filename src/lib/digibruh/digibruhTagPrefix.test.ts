import slugIsValid from "../ghost/utils/slugIsValid";
import digibruhTagPrefix from "./digibruhTagPrefix";

test("digibruh tag prefix valid", () => {
  expect(slugIsValid(digibruhTagPrefix)).toBe(true);
});
