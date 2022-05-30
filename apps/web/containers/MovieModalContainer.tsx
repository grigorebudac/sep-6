import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import MovieModal from 'components/Modals/MovieModal';
import {
  useLazyGetMovieVideoQuery,
  useLazyGetMovieQuery,
} from 'redux/endpoints/movies.endpoints';
import { useLazyGetMovieCreditsQuery } from 'redux/endpoints/credits.endpoints';

const MovieModalContainer = () => {
  const [getMovie, movieData] = useLazyGetMovieQuery();
  const [getMovieCredits, creditsData] = useLazyGetMovieCreditsQuery();
  const [getMovieVideo, video] = useLazyGetMovieVideoQuery();

  const router = useRouter();
  const [isOpen, setOpen] = useState(router.query.movieId != null);

  const movieId = useMemo(() => {
    if (!router.isReady) {
      return null;
    }

    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('movieId');
  }, [router.isReady, router.asPath]);

  const handleLoadData = useCallback(() => {
    if (isOpen && movieId) {
      getMovie(movieId as string);
      getMovieCredits(movieId as string);
      getMovieVideo(movieId as string);
    }
  }, [isOpen, movieId, getMovie, getMovieCredits, getMovieVideo]);

  useEffect(() => {
    setOpen(movieId != null);
  }, [movieId]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  function handleClose() {
    router.push(router.route, undefined, { scroll: false });
  }

  return (
    <MovieModal
      open={isOpen}
      onClose={handleClose}
      movie={movieData.data}
      credits={creditsData.data}
      videoId={video.data?.results?.[0]?.key}
      isLoading={movieData.isLoading && creditsData.isLoading}
    />
  );
};

export default MovieModalContainer;
