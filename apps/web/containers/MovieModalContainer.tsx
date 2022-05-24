import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import MovieModal from 'components/Modals/MovieModal';
import { useLazyGetMovieQuery } from 'redux/endpoints/movies.endpoints';

const MovieModalContainer = () => {
  const [getMovie, { data, isLoading }] = useLazyGetMovieQuery();
  const router = useRouter();
  const movieId = router.query.movieId;
  const isOpen = !!movieId;

  const handleLoadData = useCallback(() => {
    if (isOpen) {
      getMovie(movieId as string);
    }
  }, [isOpen, movieId, getMovie]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  function handleClose() {
    router.push(router.route, undefined, { scroll: false });
  }

  return (
    <MovieModal
      open={!!movieId}
      onClose={handleClose}
      movie={data}
      isLoading={isLoading}
    />
  );
};

export default MovieModalContainer;
