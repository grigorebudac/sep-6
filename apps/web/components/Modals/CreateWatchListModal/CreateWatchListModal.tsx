import * as React from 'react';
import { useCreateWatchListMutation } from "redux/endpoints/watch-lists.endpoints";
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateWatchListForm from "components/Forms/CreateWatchListForm";
import * as Styles from "./CreateWatchListModal.styles";
import { WatchList } from 'types';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateWatchListModal = (props: SimpleDialogProps) => {
  const { open, onClose } = props;
  const [createWatchList] = useCreateWatchListMutation();

  async function handleCreateWatchList(params: WatchList.CreateWatchListInput) {
    await createWatchList({
      title: params.title,
    })
      .unwrap()
      .then((res) => {
        console.log({ res });
        onClose();
      })
      .catch((error) => console.log({ error }));
  }

  return (
    <div>
      <Styles.Dialog open={open} onClose={onClose}>
        <DialogTitle>Create a new Watch List</DialogTitle>
        <DialogContentText p={3}>
          To create a new watch list on your account, please enter the desired name here.
        </DialogContentText>
        <CreateWatchListForm onSubmit={handleCreateWatchList} onClose={onClose} />
      </Styles.Dialog>
    </div>
  );
};

export default CreateWatchListModal;
