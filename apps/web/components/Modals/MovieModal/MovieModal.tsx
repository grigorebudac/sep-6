import React from "react";
import {
  Box,
  Dialog,
  DialogProps,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { getImageByPath } from "utils/tmdb.utils";
import { Movie } from "types";

import * as Styles from "./MovieModal.styles";
import SimpleLineChart from "components/Charts/SimpleLineChart";
import { Close } from "@mui/icons-material";
import SimpleTextSection from "components/Sections/SimpleTextSection";
import ReviewsContainer from "containers/ReviewsContainer";

interface MovieModalProps {
  open: DialogProps["open"];
  movie?: Movie.GetMovieResponse;
  isLoading: boolean;
  onClose: () => void;
}

const DUMMY_DATA = [
  {
    x: "Wed",
    y: 10,
  },
  {
    x: "Thu",
    y: 30,
  },
  {
    x: "Fri",
    y: 2,
  },
  {
    x: "Sat",
    y: 0,
  },
  {
    x: "Sun",
    y: 7,
  },
  {
    x: "Mon",
    y: 15,
  },
  {
    x: "Tue",
    y: 7,
  },
];

const MovieModal = ({ movie, ...props }: MovieModalProps) => {
  const genres = movie?.genres.map((genre) => genre.name)?.join(", ");
  const spokenLanguages = movie?.spoken_languages
    .map(({ name }) => name)
    ?.join(", ");

  return (
    <Styles.Dialog open={props.open} maxWidth="md" onClose={props.onClose}>
      <Styles.CoverContainer>
        <Styles.CoverOverlay />

        <Styles.Cover
          src={getImageByPath(movie?.poster_path)}
          alt={movie?.title}
        />

        <Styles.CloseBtnContainer>
          <IconButton color="inherit" onClick={props.onClose}>
            <Close />
          </IconButton>
        </Styles.CloseBtnContainer>

        <Styles.CoverContent>
          <Typography
            fontSize={["3.2rem", "4.8rem"]}
            fontWeight="bold"
            color="system.main"
          >
            {movie?.title}
          </Typography>
        </Styles.CoverContent>
      </Styles.CoverContainer>

      <Styles.Content>
        <Grid container gap={2}>
          <Grid item xs={12} sm={8}>
            <SimpleTextSection title="Overview" subtitle={movie?.overview} />
          </Grid>

          <Grid item xs={12} sm={3}>
            <SimpleTextSection title="Genres" subtitle={genres} />

            <Box marginTop="2rem">
              <SimpleTextSection
                title="Spoken Languages"
                subtitle={spokenLanguages}
              />
            </Box>
          </Grid>
        </Grid>
      </Styles.Content>

      <Styles.Content>
        <Divider />

        <Styles.ChartContainer>
          <SimpleLineChart data={DUMMY_DATA} isLoading={false} />
        </Styles.ChartContainer>

        <Divider />
      </Styles.Content>

      <Styles.Content>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <ReviewsContainer />
          </Grid>
        </Grid>
      </Styles.Content>
    </Styles.Dialog>
  );
};

export default MovieModal;
