import { DateTime } from "luxon";
import Post from "../ghost/post";
import DigibruhSubject, { extractSubjectFromPost } from "./DigibruhSubject";
import digibruhTagPrefix from "./digibruhTagPrefix";

describe("digibruh subject tests", () => {
  it("should extract correctly", () => {
    const post: Post = {
      title: "Example post",
      tags: [{
        name: "Fake engineering",
        slug: "engineering",
        id: "1",
      }, {
        name: "#Engineering",
        slug: `${digibruhTagPrefix}-engineering`,
        id: "2",
      }],
      html: "",
      createdAt: DateTime.now(),
      authors: [],
      featured: true,
      slug: "example-post",
      id: "1",
    };

    expect(extractSubjectFromPost(post)).toEqual<DigibruhSubject>({
      name: "Engineering",
      slug: "engineering",
    });

    expect(extractSubjectFromPost({
      ...post,
      tags: [],
    })).toBeUndefined();
  });
});
