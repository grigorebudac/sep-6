import MovieFiltersModal from 'components/Modals/MovieFiltersModal';
import React from 'react';

interface MovieFiltersModalContainerProps {
  open: boolean;
  onClose: () => void;
}

const MovieFiltersModalContainer = (props: MovieFiltersModalContainerProps) => {
  return (
    <MovieFiltersModal
      open={props.open}
      isLoading={false}
      onClose={props.onClose}
    />
  );
};

export default MovieFiltersModalContainer;
