import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Controller, Control, FieldError } from "react-hook-form";

export type TextFieldControllerProps = Omit<TextFieldProps, "error"> & {
  control?: Control<any, object>;
  error?: FieldError;
  name: string;
};

const TextFieldController: React.FC<TextFieldControllerProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          variant="outlined"
          fullWidth
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
        />
      )}
      control={control}
      defaultValue=""
    />
  );
};

export { TextFieldController };
