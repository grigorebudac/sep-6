import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import debounce from 'lodash/debounce';
import React, { useMemo } from 'react';
import { useLazySearchCompaniesQuery } from 'redux/endpoints/search.endpoints';
import { Filter } from 'types/filter.types';

interface SearchCompaniesProps {
  value?: Filter.FilterOption[];
  onChange: (genres: Filter.FilterOption[]) => void;
}

const SearchCompanies = (props: SearchCompaniesProps) => {
  const [searchCompanies, { data, isLoading }] = useLazySearchCompaniesQuery();

  const value = useMemo(() => {
    return props.value ?? [];
  }, [props.value]);

  const handleSearch = debounce((name: string) => {
    searchCompanies(name);
  }, 500);

  function handleChange(companies: Filter.FilterOption[]) {
    const filters = companies.map((company) => ({
      id: company.id,
      name: company.name,
    }));

    props.onChange(filters);
  }

  return (
    <Autocomplete
      multiple
      options={data ?? []}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterSelectedOptions
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
          placeholder="Companies"
          onChange={(e) => handleSearch(e.target.value)}
        />
      )}
    />
  );
};

export default SearchCompanies;
