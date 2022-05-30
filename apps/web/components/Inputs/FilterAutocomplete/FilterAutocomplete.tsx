import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { Filter } from 'types/filter.types';

interface FilterAutocompleteProps {
  value?: Filter.FilterOption[];
  options?: Filter.FilterOption[];
  isLoading?: boolean;
  placeholder?: string;
  onChange?: (options: Filter.FilterOption[]) => void;
  onChangeText?: (value: string) => void;
}

const FilterAutocomplete = (props: FilterAutocompleteProps) => {
  const value = useMemo(() => {
    return props.value ?? [];
  }, [props.value]);

  return (
    <Autocomplete
      multiple
      options={props.options ?? []}
      value={value}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterSelectedOptions
      onChange={(__, options) => props.onChange?.(options ?? [])}
      renderInput={(params) => (
        <TextField
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
          placeholder={props.placeholder}
          onChange={(e) => props.onChangeText?.(e.target.value)}
        />
      )}
    />
  );
};

export default FilterAutocomplete;
