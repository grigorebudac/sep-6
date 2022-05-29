import React, { useState } from 'react';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  CircularProgress,
  MenuItem,
  Typography,
} from '@mui/material';
import debounce from 'lodash/debounce';

import { getImageByPath, isPerson } from 'utils/tmdb.utils';
import { Search } from 'types/search.types';

import * as Styles from './SearchInput.styles';

const SEARCH_INTERVAL = 500;
interface SearchInputProps {
  results?: Search.SearchResults;
  isLoading: boolean;
  onSearch: (text: string) => void;
  onClickResult: (result: Search.SearchResult) => void;
}

const SearchInput = (props: SearchInputProps) => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      handleClose();
      return;
    }

    props.onSearch(value);
  }, SEARCH_INTERVAL);

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
    option: Search.SearchResult,
  ) {
    const cover = isPerson(option) ? option.profile_path : option.poster_path;
    const name = isPerson(option) ? option.name : option.title;

    return (
      <MenuItem
        key={option.id}
        {...params}
        onClick={() => props.onClickResult(option)}
      >
        <Styles.Cover src={getImageByPath(cover)} alt={name} />

        <Typography variant="inherit" noWrap>
          {name}
        </Typography>
      </MenuItem>
    );
  }

  function handleOptionEqualToValue(
    option: Search.SearchResult,
    value: Search.SearchResult,
  ) {
    const optionName = isPerson(option) ? option.name : option.title;
    const valueName = isPerson(value) ? value.name : value.title;

    return optionName === valueName;
  }

  function handleGetOptionLabel(option: Search.SearchResult | string) {
    if (typeof option === 'string') {
      return option;
    }

    return isPerson(option) ? option.name : option.title;
  }

  return (
    <Styles.Container>
      <Autocomplete
        freeSolo
        disableClearable
        open={open}
        options={props.results ?? []}
        isOptionEqualToValue={handleOptionEqualToValue}
        getOptionLabel={handleGetOptionLabel}
        renderInput={handleRenderInput}
        renderOption={handleRenderOption}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </Styles.Container>
  );
};

export default SearchInput;
