import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import MovieModal from "components/Modals/MovieModal";
import { useLazyGetMovieQuery } from "redux/endpoints/movies.endpoints";
import { useLazyGetMovieCreditsQuery } from "redux/endpoints/credits.endpoints";

const MovieModalContainer = () => {
  const [getMovie, movieData] = useLazyGetMovieQuery();
  const [getMovieCredits, creditsData] = useLazyGetMovieCreditsQuery();
  const router = useRouter();
  const movieId = router.query.movieId;
  const isOpen = !!movieId;

  const handleLoadData = useCallback(() => {
    if (isOpen) {
      getMovie(movieId as string);
      getMovieCredits(movieId as string);
    }
  }, [isOpen, movieId, getMovie, getMovieCredits]);

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
      movie={movieData.data}
      credits={creditsData.data}
      isLoading={movieData.isLoading && creditsData.isLoading}
    />
  );
};

export default MovieModalContainer;
