import React, { ComponentProps } from "react";
import { Box, Typography } from "@mui/material";
import { Story, Meta } from "@storybook/react";

import { SectionLayout } from "./SectionLayout";

export default {
  title: "Layouts/SectionLayout",
  component: SectionLayout,
} as Meta;

const Template: Story<ComponentProps<typeof SectionLayout>> = (args) => (
  <Box width="100%" height="100%" padding="2rem" bgcolor="#141020">
    <SectionLayout {...args} />
  </Box>
);

export const Default = Template.bind({});

Default.args = {
  title: "Hello World",
  children: (
    <Box width="100%" height="auto">
      <Typography variant="h1" color="eventPrimary.main">
        Content goes here
      </Typography>
    </Box>
  ),
};
