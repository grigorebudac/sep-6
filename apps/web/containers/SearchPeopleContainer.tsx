import FilterAutocomplete from 'components/Inputs/FilterAutocomplete';
import debounce from 'lodash/debounce';
import React from 'react';
import { useLazySearchPeopleQuery } from 'redux/endpoints/search.endpoints';
import { Filter } from 'types/filter.types';

interface SearchPeopleContainerProps {
  value?: Filter.FilterOption[];
  onChange: (genres: Filter.FilterOption[]) => void;
}

const SearchPeopleContainer = (props: SearchPeopleContainerProps) => {
  const [searchPeople, { data, isLoading }] = useLazySearchPeopleQuery();

  const handleSearch = debounce((name: string) => {
    searchPeople(name);
  }, 500);

  function handleChange(people: Filter.FilterOption[]) {
    const filters = people.map((person) => ({
      id: person.id,
      name: person.name,
    }));

    props.onChange(filters);
  }

  return (
    <FilterAutocomplete
      placeholder="People"
      value={props.value}
      options={data}
      isLoading={isLoading}
      onChangeText={handleSearch}
      onChange={handleChange}
    />
  );
};

export default SearchPeopleContainer;
