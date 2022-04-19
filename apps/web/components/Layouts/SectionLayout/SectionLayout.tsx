import React from "react";
import { Box, Typography } from "@mui/material";

import * as Styles from "./SectionLayout.styles";

type SectionLayoutProps = {
  title: string;
};

const SectionLayout: React.FC<SectionLayoutProps> = (props) => {
  return (
    <Styles.Container>
      <Styles.TitleContainer>
        <Typography component="h1" color="eventSystem.main" fontSize="2.4rem">
          {props.title}
        </Typography>
      </Styles.TitleContainer>

      {props.children}
    </Styles.Container>
  );
};

export { SectionLayout };
