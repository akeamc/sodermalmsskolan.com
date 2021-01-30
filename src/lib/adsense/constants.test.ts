import fs from "fs";
import path from "path";
import { parseAdsTxt } from "ads.txt";
import { ADSENSE_CLIENT, ADSENSE_SLOT } from "./constants";

const pubRegExp = /^ca-pub-[0-9]+$/;
const slotRegExp = /^[0-9]+$/;

interface AdsTxtField {
  accountType: string;
  certificateAuthorityID: string;
  domain: string;
  publisherAccountID: string;
}

describe("adsense publisher id test", () => {
  it("is valid", () => {
    expect(ADSENSE_CLIENT).toMatch(pubRegExp);
  });

  it("appears in ads.txt", () => {
    const adsLocation = path.resolve(__dirname, "../../../public/ads.txt");
    const adsTxt = fs.readFileSync(adsLocation, "utf-8");

    const { fields }: { fields: AdsTxtField[] } = parseAdsTxt(adsTxt);

    const field = fields
      .find(({ publisherAccountID }) => ADSENSE_CLIENT.indexOf(publisherAccountID) >= 0);

    expect(field).toBeTruthy();
  });
});

describe("adsense slot tests", () => {
  it("is valid", () => {
    expect(ADSENSE_SLOT).toMatch(slotRegExp);
  });
});
