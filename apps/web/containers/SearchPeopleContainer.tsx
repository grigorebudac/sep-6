import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

const SearchPeopleContainer = () => {
  return (
    <Autocomplete
      multiple
      options={[{ title: 'a' }, { title: 'b' }, { title: 'c' }]}
      getOptionLabel={(option) => option.title}
      filterSelectedOptions
      renderInput={(params) => <TextField {...params} placeholder="People" />}
    />
  );
};

export default SearchPeopleContainer;
