import React, { useCallback, useState } from 'react';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  CircularProgress,
  MenuItem,
  Typography,
} from '@mui/material';

import * as Styles from './SearchInput.styles';
import { debounce } from 'lodash';
import { getImageByPath } from 'utils/tmdb.utils';
import { Movie } from 'types';

interface SearchInputProps {
  results?: Movie.Movie[];
  isLoading: boolean;
  onSearch: (text: string) => void;
}

const SearchInput = (props: SearchInputProps) => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value.length === 0) {
        handleClose();
        return;
      }

      props.onSearch(value);
    }, 1000),
    [],
  );

  function handleRenderInput(params: AutocompleteRenderInputParams) {
    return (
      <Styles.TextField
        {...params}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {props.isLoading && (
                <CircularProgress color="inherit" size={14} />
              )}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
        size="small"
        placeholder="Search..."
        onChange={handleChange}
      />
    );
  }

  function handleRenderOption(
    params: React.HTMLAttributes<HTMLLIElement>,
    option: Movie.Movie,
  ) {
    return (
      <MenuItem key={option.id} {...params}>
        <Styles.Cover
          src={getImageByPath(option.poster_path)}
          alt={option.title}
        />

        <Typography variant="inherit" noWrap>
          {option.title}
        </Typography>
      </MenuItem>
    );
  }

  return (
    <Styles.Container>
      <Autocomplete
        freeSolo
        disableClearable
        open={open}
        options={props.results ?? []}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => (option as Movie.Movie).title}
        renderInput={handleRenderInput}
        renderOption={handleRenderOption}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </Styles.Container>
  );
};

export default SearchInput;
