import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useGetPopularMoviesQuery } from 'redux/endpoints/movies.endpoints';
import Link from 'next/link';
import ApplicationLayout from 'components/Layouts/ApplicationLayout';
import MovieCard from 'components/Cards/MovieCard';
import { withProtectedRoute } from 'hocs/withProtectedRoute';
import { getFavoriteGenres } from 'utils/analytics.utils';
import { Analytics } from 'types';
import { useGetWatchListsQuery } from 'redux/endpoints/watch-lists.endpoints';
import { useLazyGetMoviesByGenresQuery } from 'redux/endpoints/discover.endpoints';

const Home = () => {
  const { data, isLoading } = useGetPopularMoviesQuery();
  const { data: watchListData } = useGetWatchListsQuery();
  const [favoriteGenres, setFavoriteGenres] = useState<
    Analytics.FavoriteGenres[]
  >([]);
  const [getMoviesByGenres, { data: forYouData, isLoading: isForYouLoading }] =
    useLazyGetMoviesByGenresQuery();

  useEffect(() => {
    if (watchListData) {
      setFavoriteGenres(getFavoriteGenres(watchListData));
    }
  }, [watchListData]);

  useEffect(() => {
    if (favoriteGenres) {
      const favorites = favoriteGenres.map(({ id }) => id).slice(0, 3);
      getMoviesByGenres(favorites || [28, 12]);
    }
  }, [favoriteGenres, getMoviesByGenres]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ApplicationLayout title="Home">
      <Grid container>
        {data && data.results.length ? (
          data.results.map((movie) => (
            <Link
              key={movie.id}
              href={`/?movieId=${movie.id}`}
              passHref
              scroll={false}
            >
              <Grid item xs={12} sm={4} md={2} padding="1rem">
                <MovieCard
                  posterUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                />
              </Grid>
            </Link>
          ))
        ) : (
          <h1>No data</h1>
        )}
      </Grid>
      <Typography
        marginTop={10}
        marginBottom={2}
        fontSize={['2rem', '4rem']}
        fontWeight="bold"
        color="system.main"
      >
        For you
      </Typography>
      <Grid container>
        {forYouData && forYouData.results.length ? (
          forYouData.results.map((movie) => (
            <Link
              key={movie.id}
              href={`/?movieId=${movie.id}`}
              passHref
              scroll={false}
            >
              <Grid item xs={12} sm={4} md={2} padding="1rem">
                <MovieCard
                  posterUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                />
              </Grid>
            </Link>
          ))
        ) : (
          <h1>No data</h1>
        )}
      </Grid>
    </ApplicationLayout>
  );
};

export default withProtectedRoute(Home);
