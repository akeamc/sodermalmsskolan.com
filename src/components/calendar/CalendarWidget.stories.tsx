// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import CalendarWidget from "./CalendarWidget";
import { CalendarContextProvider } from "../../lib/calendar/CalendarContext";

export default {
  title: "CalendarWidget",
  component: CalendarWidget,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  decorators: [(Widget) => (
    <CalendarContextProvider>
      <Widget />
    </CalendarContextProvider>
  )],
};

const Template: Story<
ComponentProps<typeof CalendarWidget>
// eslint-disable-next-line require-jsdoc
> = (args) => <CalendarWidget {...args} />;

export const Default = Template.bind({});
