import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { useGetGenresQuery } from 'redux/endpoints/movies.endpoints';
import { Movie } from 'types';
import { Filter } from 'types/filter.types';

interface GenresContainerProps {
  value?: Filter.FilterOption[];
  onChange: (genres: Movie.Genre[]) => void;
}

const GenresContainer = (props: GenresContainerProps) => {
  const { data: genres, isLoading } = useGetGenresQuery();

  const value = useMemo(() => {
    return props.value ?? [];
  }, [props.value]);

  return (
    <Autocomplete
      multiple
      options={genres ?? []}
      value={value}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterSelectedOptions
      onChange={(__, options) => props.onChange(options ?? [])}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading && <CircularProgress color="inherit" size={14} />}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          placeholder="Genres"
        />
      )}
    />
  );
};

export default GenresContainer;
