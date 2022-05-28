import React from 'react';
import SearchInput from 'components/Inputs/SearchInput';
import { useLazyGetSearchResultsQuery } from 'redux/endpoints/search.endpoints';
import { Search } from 'types/search.types';
import { useRouter } from 'next/router';
import { isMovie } from 'utils/tmdb.utils';

const SearchInputContainer = () => {
  const [search, { data: results, isLoading }] = useLazyGetSearchResultsQuery();
  const router = useRouter();

  function handleClickResult(result: Search.SearchResult) {
    if (isMovie(result)) {
      router.push(router.route, `${router.route}?movieId=${result.id}`);
    }
  }

  return (
    <SearchInput
      isLoading={isLoading}
      results={results}
      onSearch={search}
      onClickResult={handleClickResult}
    />
  );
};

export default SearchInputContainer;
