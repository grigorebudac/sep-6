import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, DialogContent, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { WatchList } from "types";
import { TextFieldController } from "components/Controllers/TextFieldController";

type CreateWatchListFormProps = {
  onClose: () => void;
  onSubmit: (params: WatchList.CreateWatchListInput) => void;
};

const schema = yup.object().shape({
  title: yup.string().required("This field is required")
});

const CreateWatchListForm = (props: CreateWatchListFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<WatchList.WatchList>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
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
          Create
        </LoadingButton>
      </DialogActions>
    </form>
  );
};

export default CreateWatchListForm;
