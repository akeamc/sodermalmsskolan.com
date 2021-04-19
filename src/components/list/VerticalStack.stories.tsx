import React, { ComponentProps } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from "@storybook/react";
import VerticalStack from "./VerticalStack";

export default {
  title: "VerticalStack",
  component: VerticalStack,
};

// eslint-disable-next-line require-jsdoc
const Template: Story<ComponentProps<typeof VerticalStack>> = (args) => (
  <VerticalStack {...args}>
    <li>First element</li>
    <li>Second element</li>
    <li>Third element</li>
  </VerticalStack>
);

export const Default = Template.bind({});
