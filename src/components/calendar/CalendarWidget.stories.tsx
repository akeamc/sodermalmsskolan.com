// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import CalendarWidget from "./CalendarWidget";
import { CalendarContextProvider } from "../../lib/calendar/CalendarContext";

export default {
  title: "CalendarWidget",
  component: CalendarWidget,
};

const Template: Story<
ComponentProps<typeof CalendarWidget>
// eslint-disable-next-line require-jsdoc
> = (args) => (
  <CalendarContextProvider>
    <CalendarWidget {...args} />
  </CalendarContextProvider>
);

export const Default = Template.bind({});
