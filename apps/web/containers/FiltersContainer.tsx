import { Box, Rating } from '@mui/material';
import FilterSection from 'components/Sections/FilterSection';
import React from 'react';
import SearchCompaniesContainer from './SearchCompaniesContainer';
import SearchPeopleContainer from './SearchPeopleContainer';

const FiltersContainer = () => {
  return (
    <div>
      <FilterSection title="People">
        <SearchPeopleContainer />
      </FilterSection>

      <Box mt="2rem">
        <FilterSection title="Companies">
          <SearchCompaniesContainer />
        </FilterSection>
      </Box>

      <Box mt="2rem">
        <FilterSection title="Genres">
          <SearchCompaniesContainer />
        </FilterSection>
      </Box>

      <Box mt="2rem">
        <FilterSection title="Rating">
          <Rating value={null} />
        </FilterSection>
      </Box>
    </div>
  );
};

export default FiltersContainer;
