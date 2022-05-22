import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { ViewList, Add } from "@mui/icons-material";
import { WatchList } from "types";

import * as Styles from "./AddToPlayListModal.styles";
import CreateWatchListModal from 'components/Modals/CreateWatchListModal';

export interface SimpleDialogProps {
  watchLists: WatchList.WatchList[];
  open: boolean;
  onClose: (value?: string) => void;
}

const AddToPlayListModal = (props: SimpleDialogProps) => {
  const { onClose, open, watchLists } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string) => {
    if (value != 'createAccount') {
      onClose(value);
    }
    handleClickCreateWatchListModalOpen();
  };

  const [createWatchListModalOpen, setCreateWatchListModalOpen] = React.useState(false);
  const handleClickCreateWatchListModalOpen = () => {
    setCreateWatchListModalOpen(true);
  };

  const handleClosecreateWatchListModalClose = () => {
    setCreateWatchListModalOpen(false);
  };

  return (
    <Styles.Dialog onClose={handleClose} open={open}>
      <Styles.ListTitle >Add movie to watch list</Styles.ListTitle>
      <List sx={{ pt: 0 }}>
        {watchLists.map((watchList) => (
          <ListItem button onClick={() => handleListItemClick(watchList.id)} key={watchList.id}>
            <ListItemAvatar>
              <Styles.ColoredAvatar>
                <ViewList />
              </Styles.ColoredAvatar>
            </ListItemAvatar>
            <ListItemText primary={watchList.title} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={() => handleListItemClick('createAccount')}>
          <ListItemAvatar>
            <Avatar>
              <Add />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="New Watch List" />
        </ListItem>
        <CreateWatchListModal open={createWatchListModalOpen} onClose={handleClosecreateWatchListModalClose} />
      </List>
    </Styles.Dialog>
  );
};

export default AddToPlayListModal;
