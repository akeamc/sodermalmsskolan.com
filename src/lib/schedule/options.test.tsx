import { render } from "@testing-library/react";
import React, { FunctionComponent } from "react";
import { defaultSelectedCollections, ScheduleContextProvider, useScheduleContext } from "./options";

describe("schedule options tests", () => {
  describe("ScheduleContext tests", () => {
    it("provides the required data", () => {
      // eslint-disable-next-line require-jsdoc
      const Consumer: FunctionComponent = () => {
        const [options] = useScheduleContext();

        return (
          <ul>
            {
              Object
                .entries(options.selectedCollections)
                .map(([key, value]) => (
                  <li key={key}>
                    {key}
                    {": "}
                    {value}
                  </li>
                ))
            }
          </ul>
        );
      };

      const result = render(
        <ScheduleContextProvider>
          <Consumer />
        </ScheduleContextProvider>,
      );

      Object.entries(defaultSelectedCollections).forEach(([key, value]) => {
        const regExp = new RegExp(`^${key}:`);

        expect(result.getByText(regExp).textContent).toBe(`${key}: ${value}`);
      });
    });
  });
});
