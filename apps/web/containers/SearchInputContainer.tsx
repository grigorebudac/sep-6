import React from 'react';
import SearchInput from 'components/Inputs/SearchInput';
import { useLazyGetSearchResultsQuery } from 'redux/endpoints/search.endpoints';
import { Search } from 'types/search.types';
import { useRouter } from 'next/router';
import { isMovie, isPerson } from 'utils/tmdb.utils';

const SearchInputContainer = () => {
  const [search, { data: results, isLoading }] = useLazyGetSearchResultsQuery();
  const router = useRouter();

  function handleClickResult(result: Search.SearchResult) {
    const navigate = (attribute: string) =>
      router.push(router.route, `${router.route}?${attribute}=${result.id}`);

    if (isMovie(result)) {
      return navigate('movieId');
    }

    if (isPerson(result)) {
      return navigate('actorId');
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
