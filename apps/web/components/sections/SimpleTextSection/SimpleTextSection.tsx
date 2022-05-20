import { Box, Typography } from "@mui/material";
import React from "react";

interface SimpleTextSectionProps {
  title: string;
  subtitle?: string;
}

const SimpleTextSection = (props: SimpleTextSectionProps) => {
  return (
    <>
      <Typography variant="subtitle2" fontWeight="bold">
        {props.title}
      </Typography>

      {props.subtitle != null && (
        <Box marginTop="1rem">
          <Typography variant="body1">{props.subtitle}</Typography>
        </Box>
      )}
    </>
  );
};

export default SimpleTextSection;
