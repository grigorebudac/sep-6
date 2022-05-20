import React from "react";
import {
  Box,
  Dialog,
  DialogProps,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { getImageByPath } from "utils/tmdb.utils";
import { Movie } from "types";

import * as Styles from "./MovieModal.styles";

interface MovieModalProps {
  open: DialogProps["open"];
  movie?: Movie.GetMovieResponse;
  isLoading: boolean;
  onClose: DialogProps["onClose"];
}

const MovieModal = ({ movie, ...props }: MovieModalProps) => {
  const genres = movie?.genres.map((genre) => genre.name)?.join(", ");
  const spokenLanguages = movie?.spoken_languages
    .map(({ name }) => name)
    ?.join(", ");

  return (
    <Dialog open={props.open} maxWidth="md" onClose={props.onClose}>
      <Styles.CoverContainer>
        <Styles.CoverOverlay />

        <Styles.Cover
          src={getImageByPath(movie?.poster_path)}
          alt={movie?.title}
        />

        <Styles.CoverContent>
          <Typography fontSize="4.8rem" fontWeight="bold" color="system.main">
            {movie?.title}
          </Typography>
        </Styles.CoverContent>
      </Styles.CoverContainer>

      <Styles.Content>
        <Grid container gap={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle2" fontWeight="bold">
              Overview
            </Typography>

            <Box marginTop="1rem">
              <Typography variant="body1">{movie?.overview}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                Genres
              </Typography>
              <Box marginTop="1rem">
                <Typography variant="body1">{genres}</Typography>
              </Box>
            </Box>

            <Box marginTop="2rem">
              <Typography variant="subtitle2" fontWeight="bold">
                Spoken Languages
              </Typography>
              <Box marginTop="1rem">
                <Typography variant="body1">{spokenLanguages}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Styles.Content>

      <Styles.Content>
        <Divider />
        <h1>Charts</h1>
        <Divider />
      </Styles.Content>

      <Styles.Content>
        <h1>Reviews</h1>
      </Styles.Content>
    </Dialog>
  );
};

export default MovieModal;
