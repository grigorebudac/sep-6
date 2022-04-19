import React, { ComponentProps } from "react";

import { Story, Meta } from "@storybook/react";

import { TicketLayout } from "./TicketLayout";
import { Box, Typography } from "@mui/material";

export default {
  title: "Layouts/TicketLayout",
  component: TicketLayout,
} as Meta;

const Template: Story<ComponentProps<typeof TicketLayout>> = (args) => (
  <Box width="100%" height="100%" padding="2rem" bgcolor="#141020">
    <TicketLayout {...args} />
  </Box>
);

export const Default = Template.bind({});

Default.args = {
  children: (
    <Typography variant="h1" color="eventSystem.main">
      Hello Content
    </Typography>
  ),
};
