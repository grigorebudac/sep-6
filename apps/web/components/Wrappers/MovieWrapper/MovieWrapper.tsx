import React, { useState } from 'react';
import { WatchList } from 'types';
import * as Styles from './MovieWrapper.styles';
import MovieCard from 'components/Cards/MovieCard';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useDeleteMovieFromWatchListMutation } from 'redux/endpoints/watch-lists.endpoints';

interface MovieWrapperProps {
  watchListId: string;
  movie: WatchList.Movie;
}

const MovieWrapper = (props: MovieWrapperProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteMovieFromWatchList] = useDeleteMovieFromWatchListMutation();

  async function handleDeleteMovieFromWatchList() {
    setIsLoading(true);
    await deleteMovieFromWatchList({
      watchListId: props.watchListId,
      movieId: props.movie.movieId,
    })
      .unwrap()
      .then((res) => console.log({ res }))
      .catch((error) => console.log({ error }))
      .finally(() => setIsLoading(false));
  }

  return (
    <Styles.MovieCardWrapper
      key={props.movie.movieId}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <>
          <Styles.DeleteIconButton
            size="large"
            onClick={() => handleDeleteMovieFromWatchList()}
          >
            {isLoading ? (
              <CircularProgress size={20} color="error" />
            ) : (
              <DeleteIcon />
            )}
          </Styles.DeleteIconButton>

          <Styles.Overlay />
        </>
      )}
      <MovieCard posterUrl={props.movie.cover!} />
    </Styles.MovieCardWrapper>
  );
};

export default MovieWrapper;
