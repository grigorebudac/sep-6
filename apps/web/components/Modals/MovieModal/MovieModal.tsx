import React from 'react';
import {
  Box,
  DialogProps,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { getImageByPath } from "utils/tmdb.utils";
import { Credits, Movie, WatchList } from "types";
import * as Styles from "./MovieModal.styles";
import { Close, Add } from "@mui/icons-material";
import SimpleTextSection from "components/Sections/SimpleTextSection";
import AddToPlayListModal from "components/Modals/AddToPlayListModal";
import ReviewsContainer from 'containers/ReviewsContainer';
import { useGetWatchListsQuery } from "redux/endpoints/watch-lists.endpoints";
import MovieCreditsSection from 'components/Sections/MovieCreditsSection';

interface MovieModalProps {
  open: DialogProps['open'];
  movie?: Movie.GetMovieResponse;
  credits?: Credits.Credits
  isLoading: boolean;
  onClose: () => void;
}

const MovieModal = ({ movie, ...props }: MovieModalProps) => {
  const { data } = useGetWatchListsQuery();
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

      <Styles.AddToPlayListBtnContainer>
        <Styles.IconButtonWrapper onClick={handleClickOpen} size="large">
          <Add fontSize="large" />
        </Styles.IconButtonWrapper>
        <AddToPlayListModal watchLists={data} movieId={movie?.id} title={movie?.title} cover={movie?.poster_path} genres={movie?.genres} open={openModal} onClose={handleClose} />
      </Styles.AddToPlayListBtnContainer>

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
