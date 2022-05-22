import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Styles from "./EditWatchListForm.Styles";
import { Button, DialogContent, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { WatchList } from "types";
import { TextFieldController } from "components/Controllers/TextFieldController";
import { WatchListActions } from "components/Modals/EditWatchListModal";

type CreateWatchListFormProps = {
  title: string;
  action: WatchListActions;
  onClose: () => void;
  onSubmit: (params: WatchList.CreateWatchListInput) => void;
};

const schema = yup.object().shape({
  title: yup.string().required("This field is required")
});

const EditWatchListForm = (props: CreateWatchListFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<WatchList.WatchList>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: props.title
    },
  });

  return (
    <Styles.FormWrapper onSubmit={handleSubmit(props.onSubmit)}>
      <DialogContent>
        <TextFieldController
          name="title"
          label="Title"
          error={errors?.title}
          control={control}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} >Cancel</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Edit
        </LoadingButton>
      </DialogActions>
    </Styles.FormWrapper>
  );
};

export default EditWatchListForm;
