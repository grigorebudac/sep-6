import React from "react";
import { Typography } from "@mui/material";

import * as Styles from "./PageTitle.styles";

export type PageTitleProps = {
  title: string;
  subtitle: string;
  icon?: JSX.Element;
};

const PageTitle: React.FC<PageTitleProps> = (props) => {
  return (
    <Styles.Container>
      <Typography fontSize="1.6rem" color="eventPrimary.main">
        {props.subtitle}
      </Typography>

      <Styles.TitleContainer>
        {props.icon}

        <Typography fontSize="2.4rem" color="eventSystem.main">
          {props.title}
        </Typography>
      </Styles.TitleContainer>
    </Styles.Container>
  );
};

export { PageTitle };
