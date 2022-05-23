import React from "react";
import { useGetWatchListsQuery } from "redux/endpoints/watch-lists.endpoints";
import ApplicationLayout from "components/Layouts/ApplicationLayout";
import WatchListContainer from "components/Lists/WatchList";
import CreateWatchListModal from "components/Modals/CreateWatchListModal";
import { Fab, Box, Stack, Skeleton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const emptySkeletons = [1, 2, 3, 4, 5];

const WatchLists = () => {
  const [createWatchListModalOpen, setCreateWatchListModalOpen] = React.useState(false);
  const { data, isLoading } = useGetWatchListsQuery();

  const handleClickCreateWatchListModalOpen = () => {
    setCreateWatchListModalOpen(true);
  };

  const handleClosecreateWatchListModalClose = () => {
    setCreateWatchListModalOpen(false);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ApplicationLayout title="Watch lists">
      {data && data.length ?
        (data.map((watchList) => (
          <WatchListContainer {...watchList} key={watchList.id} />
        ))) :
        (
          <>
            <Typography fontSize="3.2rem" color="primary.contrastText" fontWeight="500">
              You have no watch-lists yet.
            </Typography>
            <Stack direction="row" spacing={2} mb={2}>
              <Skeleton variant="text" width={170} />
              <Skeleton variant="circular" width={40} height={40} />
            </Stack>
            <Stack direction="row" spacing={2}>
              {emptySkeletons.map((_, i) => <Skeleton variant="rectangular" width={200} height={300} key={i} />)}
            </Stack>
          </>)
      }

      <Box position="absolute" right={30} bottom={30}>
        <Fab color="default" aria-label="add" onClick={handleClickCreateWatchListModalOpen}>
          <AddIcon />
        </Fab>
      </Box>
      <CreateWatchListModal open={createWatchListModalOpen} onClose={handleClosecreateWatchListModalClose} />
    </ApplicationLayout >
  );
};

export default WatchLists;
