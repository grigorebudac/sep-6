import React from 'react';
import {
  Box,
  DialogProps,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { getImageByPath } from 'utils/tmdb.utils';
import { Credits, Movie } from 'types';
import * as Styles from './MovieModal.styles';
import { Close, Add } from '@mui/icons-material';
import SimpleTextSection from 'components/Sections/SimpleTextSection';
import AddToPlayListModal from 'components/Modals/AddToPlayListModal';
import ReviewsContainer from 'containers/ReviewsContainer';
import { useGetWatchListsQuery } from 'redux/endpoints/watch-lists.endpoints';
import MovieCreditsSection from 'components/Sections/MovieCreditsSection';
import { useGetReviewsQuery } from 'redux/endpoints/review.endpoints';

interface MovieModalProps {
  open: DialogProps['open'];
  movie?: Movie.GetMovieResponse;
  videoId?: string;
  credits?: Credits.Credits;
  isLoading: boolean;
  onClose: () => void;
}

const MovieModal = ({ movie, videoId, ...props }: MovieModalProps) => {
  const { data } = useGetWatchListsQuery();
  const { data: reviews, isLoading } = useGetReviewsQuery({
    movieId: movie?.id || 0,
  });

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = (value?: string) => {
    setOpenModal(false);
  };

  const genres = movie?.genres.map((genre) => genre.name)?.join(', ');
  const spokenLanguages = movie?.spoken_languages
    .map(({ name }) => name)
    ?.join(', ');

  if (!movie) return <></>;

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

      <Styles.AddToPlayListBtnContainer onClick={handleClickOpen}>
        <Styles.IconButtonWrapper size="large">
          <Add fontSize="large" />
        </Styles.IconButtonWrapper>
      </Styles.AddToPlayListBtnContainer>

      <Styles.Content>
        <Grid container gap={2}>
          <Grid item xs={12} sm={8}>
            <Grid container gap={4} marginBottom={2}>
              <Box>
                <Typography fontWeight="bold">Rating</Typography>
                <Typography>{movie?.vote_average}</Typography>
              </Box>
              <Box>
                <Typography fontWeight="bold">Budget</Typography>
                <Typography>{movie?.budget / 1000000} M</Typography>
              </Box>
              <Box>
                <Typography fontWeight="bold">Revenue</Typography>
                <Typography>{movie?.revenue / 1000000} M</Typography>
              </Box>
              <Box>
                <Typography fontWeight="bold">Profit</Typography>
                <Typography>{movie?.revenue - movie?.budget}</Typography>
              </Box>
              <Box>
                <Typography fontWeight="bold">Reviews</Typography>
                <Typography>
                  {isLoading
                    ? 'Loading...'
                    : reviews?.length === 0
                    ? 'No reviews'
                    : reviews?.length}
                </Typography>
              </Box>
            </Grid>
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

      <Styles.TrailerContainer>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          height={500}
          width={'100%'}
          title="Embedded youtube"
        />
      </Styles.TrailerContainer>

      {movie != null && (
        <Styles.Content>
          <ReviewsContainer
            movieId={movie?.id}
            reviews={reviews}
            isLoading={isLoading}
          />
        </Styles.Content>
      )}
      <AddToPlayListModal
        watchLists={data}
        movieId={movie?.id}
        title={movie?.title}
        cover={movie?.poster_path}
        genres={movie?.genres}
        open={openModal}
        onClose={handleClose}
      />
    </Styles.Dialog>
  );
};

export default MovieModal;
