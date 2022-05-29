import React, { useEffect, useRef, useState } from 'react';
import { Box, Fab, Grid } from '@mui/material';
import { useLazyDiscoverMoviesQuery } from 'redux/endpoints/movies.endpoints';
import Link from 'next/link';
import ApplicationLayout from 'components/Layouts/ApplicationLayout';
import MovieCard from 'components/Cards/MovieCard';
import { withProtectedRoute } from 'hocs/withProtectedRoute';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Filter } from 'types/filter.types';
import MovieFiltersModal from 'components/Modals/MovieFiltersModal';

const Discover = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Partial<Filter.Filter>>({});
  const [discoverMovies, { data }] = useLazyDiscoverMoviesQuery();

  useEffect(() => {
    discoverMovies({});
  }, []);

  function handleOpenFilter() {
    setFilterOpen(true);
  }

  function handleCloseFilter() {
    setFilterOpen(false);
  }

  function handleChangeFilter(
    name: keyof Filter.Filter,
    filters: Filter.FilterOption[],
  ) {
    setFilters((prev) => {
      let temp = { ...prev };

      if (filters == null || filters.length == 0) {
        delete temp[name];
      } else {
        temp[name] = filters;
      }

      return temp;
    });
  }

  function handleSubmitFilter() {
    let nextFilters: Record<string, string> = {};

    for (const [key, value] of Object.entries(filters)) {
      nextFilters[key] = value.map((item) => item.id).join(',');
    }

    discoverMovies(nextFilters);
    handleCloseFilter();
  }

  return (
    <ApplicationLayout title="Discover">
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

      <MovieFiltersModal
        open={isFilterOpen}
        filters={filters}
        onClose={handleCloseFilter}
        onChange={handleChangeFilter}
        onSubmit={handleSubmitFilter}
      />
    </ApplicationLayout>
  );
};

export default withProtectedRoute(Discover);
