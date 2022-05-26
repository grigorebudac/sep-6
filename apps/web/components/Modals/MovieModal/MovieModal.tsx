import React from 'react';
import {
  Box,
  Dialog,
  DialogProps,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { getImageByPath } from 'utils/tmdb.utils';
import { Credits, Movie } from 'types';

import * as Styles from './MovieModal.styles';
import { Close } from '@mui/icons-material';
import SimpleTextSection from 'components/Sections/SimpleTextSection';
import ReviewsContainer from 'containers/ReviewsContainer';
import MovieCreditsSection from 'components/Sections/MovieCreditsSection';

interface MovieModalProps {
  open: DialogProps['open'];
  movie?: Movie.GetMovieResponse;
  credits?: Credits.Credits
  isLoading: boolean;
  onClose: () => void;
}

const MovieModal = ({ movie, ...props }: MovieModalProps) => {
  const genres = movie?.genres.map((genre) => genre.name)?.join(', ');
  const spokenLanguages = movie?.spoken_languages
    .map(({ name }) => name)
    ?.join(', ');

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
            fontSize={['3.2rem', '4.8rem']}
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

        <MovieCreditsSection credits={props.credits} />
      </Styles.Content>

      {movie != null && (
        <Styles.Content>
          <ReviewsContainer movieId={movie?.id} />
        </Styles.Content>
      )}
    </Styles.Dialog>
  );
};

export default MovieModal;
