import React, { useState } from 'react';
import { Box, Fab, Grid } from '@mui/material';
import { useGetPopularMoviesQuery } from 'redux/endpoints/movies.endpoints';
import Link from 'next/link';
import ApplicationLayout from 'components/Layouts/ApplicationLayout';
import MovieCard from 'components/Cards/MovieCard';
import { withProtectedRoute } from 'hocs/withProtectedRoute';
import MovieFiltersModalContainer from 'containers/MovieFiltersModalContainer';
import FilterListIcon from '@mui/icons-material/FilterList';

const Home = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const { data, isLoading } = useGetPopularMoviesQuery();

  function handleOpenFilter() {
    setFilterOpen(true);
  }

  function handleCloseFilter() {
    setFilterOpen(false);
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ApplicationLayout title="Search">
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

      <Box position="absolute" bottom="2rem" right="2rem">
        <Fab color="secondary" onClick={handleOpenFilter}>
          <FilterListIcon />
        </Fab>
      </Box>

      <MovieFiltersModalContainer
        open={isFilterOpen}
        onClose={handleCloseFilter}
      />
    </ApplicationLayout>
  );
};

export default withProtectedRoute(Home);
