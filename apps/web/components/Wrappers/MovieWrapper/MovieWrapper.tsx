import React, { useState } from 'react';
import { WatchList } from 'types';
import * as Styles from './MovieWrapper.styles';
import MovieCard from 'components/Cards/MovieCard';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CircularProgress from '@mui/material/CircularProgress';
import { useDeleteMovieFromWatchListMutation } from 'redux/endpoints/watch-lists.endpoints';
import MovieModalContainer from 'containers/MovieModalContainer';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MovieWrapperProps {
  watchListId: string;
  movie: WatchList.Movie;
}

const MovieWrapper = (props: MovieWrapperProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteMovieFromWatchList] = useDeleteMovieFromWatchListMutation();
  const router = useRouter();
  const currentPath = router.asPath;

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
          <Styles.EditIconButton
            size="large"
          // onClick={() => handleDeleteMovieFromWatchList()}
          >
            <Link
              key={props.movie.movieId}
              href={`${currentPath}/?movieId=${props.movie.movieId}`}
              passHref
              scroll={false}
            >
              <InfoIcon />
            </Link>
          </Styles.EditIconButton>

          <Styles.Overlay />
        </>
      )}
      <MovieCard posterUrl={props.movie.cover!} />
      <MovieModalContainer />
    </Styles.MovieCardWrapper>
  );
};

export default MovieWrapper;
