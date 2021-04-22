import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import CalendarMonthWidget from ".";
import { CalendarContextProvider } from "../../../lib/calendar/CalendarContext";

export default {
  title: "CalendarMonthWidget",
  component: CalendarMonthWidget,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  decorators: [(Widget) => (
    <CalendarContextProvider>
      <Widget />
    </CalendarContextProvider>
  )],
};

const Template: Story<
ComponentProps<typeof CalendarMonthWidget>
// eslint-disable-next-line require-jsdoc
> = (args) => (
  <div css={{
    maxWidth: 250,
  }}
  >
    <CalendarMonthWidget {...args} />
  </div>
);

export const Default = Template.bind({});
