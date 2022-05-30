import React from "react";
import { Grid, Typography } from "@mui/material";

import * as Styles from "./AuthenticationLayout.styles";

type AuthenticationLayoutProps = {
  title: string;
};

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = (props) => {
  return (
    <div>
      <Styles.Container>
        <Grid container alignItems="center" height="100%">
          <Grid item xs={12} sm={6}>
            <Styles.SectionContent>
              <Typography
                fontSize="4.2rem"
                color="white"
                fontWeight="500"
                margin="4rem 0rem"
              >
                See what all the fuss is about.
              </Typography>
              <Typography fontSize="1.6rem" color="white" fontWeight="500">
                Join {`VIA's`} newest movie social media and get all the latest
                movie news, reviews, and trailers. Save your favorite movies,
                and get feedback from other movie lovers.
              </Typography>
            </Styles.SectionContent>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            paddingTop={["4rem", "0rem"]}
            paddingBottom={["4rem", "0rem"]}
          >
            <Styles.FormSectionContent>
              {props.children}
            </Styles.FormSectionContent>
          </Grid>
        </Grid>
      </Styles.Container>

      <Styles.BackgroundContent>
        <Styles.Overlay />
        <iframe
          title={props.title}
          src="https://player.vimeo.com/video/574249514?background=1&autoplay=1&loop=1&byline=0&title=0"
          frameBorder="0"
          allow="autoplay"
        />
      </Styles.BackgroundContent>
    </div>
  );
};

export { AuthenticationLayout };
