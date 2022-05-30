import FilterAutocomplete from 'components/Inputs/FilterAutocomplete';
import debounce from 'lodash/debounce';
import React from 'react';
import { useLazySearchCompaniesQuery } from 'redux/endpoints/search.endpoints';
import { Filter } from 'types/filter.types';

interface SearchCompaniesProps {
  value?: Filter.FilterOption[];
  onChange?: (genres: Filter.FilterOption[]) => void;
}

const SearchCompanies = (props: SearchCompaniesProps) => {
  const [searchCompanies, { data, isLoading }] = useLazySearchCompaniesQuery();

  const handleSearch = debounce((name: string) => {
    searchCompanies(name);
  }, 500);

  return (
    <FilterAutocomplete
      {...props}
      placeholder="Companies"
      options={data}
      isLoading={isLoading}
      onChangeText={handleSearch}
    />
  );
};

export default SearchCompanies;
