import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import { useGetGenresQuery } from 'redux/endpoints/movies.endpoints';
import { Movie } from 'types';

interface GenresContainerProps {
  onChange: (genres: Movie.Genre[]) => void;
}

const GenresContainer = (props: GenresContainerProps) => {
  const { data: genres, isLoading } = useGetGenresQuery();

  return (
    <Autocomplete
      multiple
      options={genres ?? []}
      getOptionLabel={(option) => option.name}
      filterSelectedOptions
      onChange={(__, options) => props.onChange(options)}
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
