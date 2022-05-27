import React, { useRef, useState } from 'react';
import { WatchList } from 'types';
import * as Styles from './WatchListContainer.styles';
import MovieCard from 'components/Cards/MovieCard';
import { Edit, Delete } from '@mui/icons-material';
import MovieWrapper from 'components/Wrappers/MovieWrapper';
import { Box, Typography } from '@mui/material';
import EditWatchListModal, {
  WatchListActions,
} from 'components/Modals/EditWatchListModal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const WatchListContainer = (props: WatchList.WatchList) => {
  const { id, title, movies } = props;
  const [action, setAction] = useState<WatchListActions>(
    WatchListActions.Delete,
  );

  const [createWatchListModalOpen, setCreateWatchListModalOpen] =
    React.useState(false);
  const handleClickCreateWatchListModalOpen = (action: WatchListActions) => {
    setAction(action);
    setCreateWatchListModalOpen(true);
  };

  const handleClosecreateWatchListModalClose = () => {
    setCreateWatchListModalOpen(false);
  };

  const [showBackButton, setShowBackButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Styles.WatchListHeader fontSize="2rem" color="system.main">
        <Typography fontSize={24} fontWeight="bold">
          {title}
        </Typography>
        <Box pl={1}>
          <Styles.EditIconButton
            size="large"
            onClick={() => {
              handleClickCreateWatchListModalOpen(WatchListActions.Edit);
            }}
          >
            <Edit />
          </Styles.EditIconButton>
          <Styles.DeleteIconButton
            size="large"
            onClick={() => {
              handleClickCreateWatchListModalOpen(WatchListActions.Delete);
            }}
          >
            <Delete />
          </Styles.DeleteIconButton>
        </Box>
      </Styles.WatchListHeader>
      <Styles.MovieList
        gap={2}
        ref={scrollRef}
        onScroll={(event) =>
          setShowBackButton((event.target as HTMLElement).scrollLeft > 0)
        }
      >
        {movies && movies.length ? (
          movies.map((movie) => (
            <MovieWrapper movie={movie} watchListId={id} key={movie.movieId} />
          ))
        ) : (
          <MovieCard />
        )}
      </Styles.MovieList>
      {movies && movies.length > 7 && (
        <Styles.ScrollButton onClick={() => scroll(500)}>
          <ArrowForwardIosIcon />
        </Styles.ScrollButton>
      )}
      {showBackButton && (
        <Styles.ScrollButton left onClick={() => scroll(-500)}>
          <ArrowBackIosNewIcon />
        </Styles.ScrollButton>
      )}
      <EditWatchListModal
        watchList={props}
        action={action}
        open={createWatchListModalOpen}
        onClose={handleClosecreateWatchListModalClose}
      />
      ;
    </div>
  );
};

export default WatchListContainer;
