import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { WatchList, Movie } from 'types';
import { useAddMovieToWatchListMutation } from 'redux/endpoints/watch-lists.endpoints';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import * as Styles from './AddToPlayListModal.styles';
import { ViewList, Add, Favorite } from "@mui/icons-material";
import CreateWatchListModal from 'components/Modals/CreateWatchListModal';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export interface SimpleDialogProps {
  watchLists?: WatchList.WatchList[];
  movieId?: number;
  title?: string;
  cover?: string;
  open: boolean;
  genres?: Movie.Genre[];
  onClose: (value?: string) => void;
}

const AddToPlayListModal = (props: SimpleDialogProps) => {
  const { onClose, open, watchLists } = props;
  const [addMovieToWatchList, { isLoading }] = useAddMovieToWatchListMutation();
  const [createWatchListModalOpen, setCreateWatchListModalOpen] =
    React.useState(false);

  async function handleAddMovieToWatchList({
    watchListId,
    movieId,
    title,
    cover,
    genres,
  }: WatchList.addMovieToWatchListPayload) {
    try {
      await addMovieToWatchList({
        watchListId,
        movieId,
        title,
        cover,
        genres,
      }).unwrap();
      onClose();
    } catch (error) {
      console.log({ error });
    }
  }

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (watchListId: string) => {
    if (watchListId != 'createAccount') {
      handleAddMovieToWatchList({
        watchListId,
        movieId: props.movieId!,
        title: props.title!,
        cover: props.cover,
        genres: props.genres,
      });
    } else handleClickCreateWatchListModalOpen();
  };

  const handleClickCreateWatchListModalOpen = () => {
    setCreateWatchListModalOpen(true);
  };

  const handleClosecreateWatchListModalClose = () => {
    setCreateWatchListModalOpen(false);
  };

  return (
    <Styles.Dialog onClose={handleClose} open={open}>
      <Styles.ListTitle>Add movie to watch list</Styles.ListTitle>
      {isLoading ? (
        <Box
          p={5}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ pt: 0 }}>
          {watchLists &&
            watchLists
              .filter((watchList) => {
                if (!watchList.movies) return -1;
                return (
                  watchList.movies?.findIndex(
                    (movie) => movie.movieId == String(props.movieId!),
                  ) === -1
                );
              })
              .map((watchList) => (
                <ListItem
                  button
                  onClick={() => handleListItemClick(watchList.id)}
                  key={watchList.id}
                >
                  <ListItemAvatar>
                    <Styles.ColoredAvatar>
                      {
                        watchList.title === 'Watch later' ? (
                          <WatchLaterIcon />
                        ) : watchList.title === 'Favorite' ? (
                          <Favorite />
                        ) : (
                          <ViewList />

                        )
                      }
                    </Styles.ColoredAvatar >
                  </ListItemAvatar >
                  <ListItemText primary={watchList.title} />
                </ListItem >
              ))}
          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick('createAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="New Watch List" />
          </ListItem>
        </List >
      )}
      <CreateWatchListModal
        open={createWatchListModalOpen}
        onClose={handleClosecreateWatchListModalClose}
      />
    </Styles.Dialog >
  );
};

export default AddToPlayListModal;
