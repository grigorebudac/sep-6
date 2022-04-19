import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import {
  FormControlLabel,
  Checkbox,
  CheckboxProps,
  FormControl,
  FormHelperText,
  FormControlLabelProps,
} from "@mui/material";

export type CheckboxControllerProps = Omit<CheckboxProps, "error"> &
  Pick<FormControlLabelProps, "label"> & {
    control?: Control<any, object>;
    error?: FieldError;
    name: string;
  };

const CheckboxController: React.FC<CheckboxControllerProps> = ({
  control,
  name,
  label,
  ...props
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormControlLabel
            control={<Checkbox {...field} {...props} />}
            label={label}
          />

          {error?.message != null && (
            <FormHelperText>{error.message}</FormHelperText>
          )}
        </FormControl>
      )}
      control={control}
      defaultValue=""
    />
  );
};

export { CheckboxController };
