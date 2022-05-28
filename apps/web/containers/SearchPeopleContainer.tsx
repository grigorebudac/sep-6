import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import debounce from 'lodash/debounce';
import React, { useMemo } from 'react';
import { useLazySearchPeopleQuery } from 'redux/endpoints/search.endpoints';
import { Filter } from 'types/filter.types';

interface SearchPeopleContainerProps {
  value?: Filter.FilterOption[];
  onChange: (genres: Filter.FilterOption[]) => void;
}

const SearchPeopleContainer = (props: SearchPeopleContainerProps) => {
  const [searchPeople, { data, isLoading }] = useLazySearchPeopleQuery();

  const value = useMemo(() => {
    return props.value ?? [];
  }, [props.value]);

  const handleSearch = debounce((name: string) => {
    searchPeople(name);
  }, 500);

  function handleChange(people: Filter.FilterOption[]) {
    const filters = people.map((actor) => ({
      id: actor.id,
      name: actor.name,
    }));

    props.onChange(filters);
  }

  return (
    <Autocomplete
      multiple
      options={data ?? []}
      getOptionLabel={(option) => option.name}
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={value}
      onChange={(__, options) => handleChange(options ?? [])}
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
          placeholder="People"
          onChange={(e) => handleSearch(e.target.value)}
        />
      )}
    />
  );
};

export default SearchPeopleContainer;
