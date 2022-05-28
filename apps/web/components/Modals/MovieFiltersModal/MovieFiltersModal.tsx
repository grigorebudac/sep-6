import React from 'react';
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
import { Movie } from 'types';

interface MovieFiltersModalProps {
  open: DialogProps['open'];
  isLoading: boolean;
  onClose: () => void;
}

const MovieFiltersModal = (props: MovieFiltersModalProps) => {
  function handleChangeGenres(genres: Movie.Genre[]) {
    console.log({ genres });
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
          <SearchPeopleContainer />
        </FilterSection>

        <Box mt="2rem">
          <FilterSection title="Companies">
            <SearchCompaniesContainer />
          </FilterSection>
        </Box>

        <Box mt="2rem">
          <FilterSection title="Genres">
            <GenresContainer onChange={handleChangeGenres} />
          </FilterSection>
        </Box>

        <Box mt="2rem">
          <FilterSection title="Rating">
            <Rating value={null} />
          </FilterSection>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="text">Reset</Button>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Styles.Dialog>
  );
};

export default MovieFiltersModal;
