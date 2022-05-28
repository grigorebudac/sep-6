import React from 'react';
import SearchInput from 'components/Inputs/SearchInput';
import { useLazyGetSearchResultsQuery } from 'redux/endpoints/search.endpoints';

const SearchInputContainer = () => {
  const [search, { data: results, isLoading }] = useLazyGetSearchResultsQuery();

  return (
    <SearchInput isLoading={isLoading} results={results} onSearch={search} />
  );
};

export default SearchInputContainer;
