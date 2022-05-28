import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

const SearchCompanies = () => {
  return (
    <Autocomplete
      multiple
      options={[{ title: 'a' }, { title: 'b' }, { title: 'c' }]}
      getOptionLabel={(option) => option.title}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} placeholder="Companies" />
      )}
    />
  );
};

export default SearchCompanies;
