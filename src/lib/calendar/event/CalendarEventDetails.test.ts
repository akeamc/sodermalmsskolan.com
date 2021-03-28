import CalendarEventDetails, { getEventDetailsSignature } from "./CalendarEventDetails";

describe("CalendarEventDetails test", () => {
  it("returns the correct signature", () => {
    const details: CalendarEventDetails = {
      summary: "My event",
      duration: 3600,
      color: "#ff0000",
    };

    expect(getEventDetailsSignature(details)).toBe("My event..#ff0000..3600");
  });
});
