import React, { ComponentProps, FunctionComponent } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import { DateTime } from "luxon";
import CalendarEventDisplay from ".";
import CalendarEventInstance from "../../../lib/calendar/event/CalendarEventInstance";
import CalendarEventDetails from "../../../lib/calendar/event/CalendarEventDetails";
import { CalendarTableWrapper } from "../CalendarTable";

export interface TemplateProps extends CalendarEventDetails {
  start: number;
}

// eslint-disable-next-line require-jsdoc
const CalendarEventDisplayTemplate: FunctionComponent<TemplateProps> = ({ start, ...details }) => {
  const eventInstance = new CalendarEventInstance(DateTime.fromMillis(start), details);

  return (
    <CalendarTableWrapper>
      <CalendarEventDisplay calendarEvent={eventInstance} />
    </CalendarTableWrapper>
  );
};

export default {
  title: "CalendarEventDisplay",
  component: CalendarEventDisplayTemplate,
  argTypes: {
    color: { control: "color" },
    start: { control: "date" },
  },
  args: {
    color: "#f44336",
    start: DateTime.utc(2020, 1, 1).toMillis(),
    duration: 3600,
    summary: "Example event",
    description: "Description of the event.",
    location: "221B Baker Street",
  },
};

const Template: Story<
ComponentProps<typeof CalendarEventDisplayTemplate>
// eslint-disable-next-line require-jsdoc
> = (args) => (
  <CalendarEventDisplayTemplate {...args} />
);

export const Default = Template.bind({});
