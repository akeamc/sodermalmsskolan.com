import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import MainCalendar from "./MainCalendar";
import { CalendarContextProvider } from "../../lib/calendar/CalendarContext";

export default {
  title: "MainCalendar",
  component: MainCalendar,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  decorators: [(Widget) => (
    <CalendarContextProvider>
      <Widget />
    </CalendarContextProvider>
  )],
};

const Template: Story<
ComponentProps<typeof MainCalendar>
// eslint-disable-next-line require-jsdoc
> = (args) => <MainCalendar {...args} />;

export const Default = Template.bind({});
