import * as React from 'react';
import { DialogContentText, DialogContent, Button, DialogActions } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import * as Styles from "./EditWatchListModal.styles";
import UpdateWatchListForm from "components/Forms/EditWatchListForm";
import { useEditWatchListMutation, useDeleteWatchListMutation } from 'redux/endpoints/watch-lists.endpoints';
import { WatchList } from 'types';

export enum WatchListActions {
  Edit,
  Delete
}

export interface SimpleDialogProps {
  watchList: WatchList.WatchList;
  action: WatchListActions;
  open: boolean;
  onClose: () => void;
}

const EditWatchListModal = (props: SimpleDialogProps) => {
  const { action, open, onClose } = props;
  const [editWatchList] = useEditWatchListMutation();
  const [deleteWatchList, { isLoading }] = useDeleteWatchListMutation();

  async function handleEditWatchList(params: WatchList.CreateWatchListInput) {
    try {
      await editWatchList({
        id: props.watchList.id,
        title: params.title,
      })
        .unwrap();
      onClose();
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleDeleteWatchList() {
    try {
      await deleteWatchList({
        id: props.watchList.id,
      })
        .unwrap();
      onClose();
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Styles.Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
      {action === WatchListActions.Edit && (
        <>
          <Styles.Title>Edit Watch List Name</Styles.Title>
          <UpdateWatchListForm title={props.watchList.title} action={action} onClose={onClose} onSubmit={handleEditWatchList} />
        </>

      )}
      {action === WatchListActions.Delete && (
        <>
          <Styles.Title>Delete Watch List</Styles.Title>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your <b>{props.watchList.title}</b> watchlist?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <LoadingButton
              type="submit"
              onClick={handleDeleteWatchList} autoFocus
              loading={isLoading}
              color="error"
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </>
      )}
    </Styles.Dialog >
  );
};

export default EditWatchListModal;
