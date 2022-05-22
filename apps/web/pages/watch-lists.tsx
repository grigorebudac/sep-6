import React from "react";
import { useGetWatchListsQuery } from "redux/endpoints/watch-lists.endpoints";
import ApplicationLayout from "components/Layouts/ApplicationLayout";
import WatchListContainer from "components/Lists/WatchList";
import CreateWatchListModal from "components/Modals/CreateWatchListModal";
import { Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const WatchLists = () => {
  const { data, isLoading } = useGetWatchListsQuery();

  const [createWatchListModalOpen, setCreateWatchListModalOpen] = React.useState(false);
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
        (<h1>No Watch Lists</h1>)
      }

      <Box position="absolute" right={30} bottom={30}>
        <Fab color="primary" aria-label="add" onClick={handleClickCreateWatchListModalOpen}>
          <AddIcon />
        </Fab>
      </Box>
      <CreateWatchListModal open={createWatchListModalOpen} onClose={handleClosecreateWatchListModalClose} />
    </ApplicationLayout>
  );
};

export default WatchLists;
