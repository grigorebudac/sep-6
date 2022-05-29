import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Rating,
} from '@mui/material';

import * as Styles from './MovieFiltersModal.styles';
import FilterSection from 'components/Sections/FilterSection';
import SearchPeopleContainer from 'containers/SearchPeopleContainer';
import SearchCompaniesContainer from 'containers/SearchCompaniesContainer';
import GenresContainer from 'containers/GenresContainer';
import { Filter } from 'types/filter.types';

interface MovieFiltersModalProps {
  filters: Partial<Filter.Filter>;
  open: DialogProps['open'];
  onClose: () => void;
  onChange: (name: keyof Filter.Filter, value: Filter.FilterOption[]) => void;
  onSubmit: () => void;
}

const MovieFiltersModal = (props: MovieFiltersModalProps) => {
  function handleChangeGenres(genres: Filter.FilterOption[]) {
    props.onChange('with_genres', genres);
  }

  function handleChangePeople(people: Filter.FilterOption[]) {
    props.onChange('with_people', people);
  }

  function handleChangeCompanies(companies: Filter.FilterOption[]) {
    props.onChange('with_companies', companies);
  }

  function handleReset() {
    handleChangeGenres([]);
    handleChangePeople([]);
    handleChangeCompanies([]);
  }

  return (
    <Styles.Dialog
      open={props.open}
      maxWidth="sm"
      fullWidth
      onClose={props.onClose}
    >
      <DialogTitle>Filters</DialogTitle>

      <DialogContent>
        <FilterSection title="People">
          <SearchPeopleContainer
            value={props.filters['with_people']}
            onChange={handleChangePeople}
          />
        </FilterSection>

        <Box mt="2rem">
          <FilterSection title="Companies">
            <SearchCompaniesContainer
              value={props.filters['with_companies']}
              onChange={handleChangeCompanies}
            />
          </FilterSection>
        </Box>

        <Box mt="2rem">
          <FilterSection title="Genres">
            <GenresContainer
              value={props.filters['with_genres']}
              onChange={handleChangeGenres}
            />
          </FilterSection>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="text" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={props.onSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Styles.Dialog>
  );
};

export default MovieFiltersModal;
