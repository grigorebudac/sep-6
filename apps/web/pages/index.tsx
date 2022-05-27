import React from 'react';
import { Grid } from '@mui/material';
import { useGetPopularMoviesQuery } from 'redux/endpoints/movies.endpoints';
import { getImageByPath } from 'utils/tmdb.utils';
import Link from 'next/link';
import MovieModalContainer from 'containers/MovieModalContainer';
import ApplicationLayout from 'components/Layouts/ApplicationLayout';
import MovieCard from 'components/Cards/MovieCard';
import { withProtectedRoute } from 'hocs/withProtectedRoute';

const Home = () => {
  const { data, isLoading } = useGetPopularMoviesQuery();

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

        <MovieModalContainer />
      </Grid>
    </ApplicationLayout>
  );
};

export default withProtectedRoute(Home);
