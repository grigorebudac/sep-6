import FilterAutocomplete from 'components/Inputs/FilterAutocomplete';
import React from 'react';
import { useGetGenresQuery } from 'redux/endpoints/movies.endpoints';
import { Movie } from 'types';
import { Filter } from 'types/filter.types';

interface GenresContainerProps {
  value?: Filter.FilterOption[];
  onChange: (genres: Movie.Genre[]) => void;
}

const GenresContainer = (props: GenresContainerProps) => {
  const { data: genres, isLoading } = useGetGenresQuery();

  return (
    <FilterAutocomplete
      {...props}
      placeholder="Genres"
      options={genres}
      isLoading={isLoading}
    />
  );
};

export default GenresContainer;
