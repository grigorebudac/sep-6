import React from "react";
import { Controller, Control } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  FormHelperText,
} from "@mui/material";

export type SelectControllerProps = SelectProps & {
  control: Control<Record<string, any>>;
  name: string;
};

const SelectController: React.FC<SelectControllerProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      size="small"
      margin="normal"
      error={props.error}
    >
      <InputLabel htmlFor={name}>{props.label}</InputLabel>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...field }, fieldState: { error } }) => (
          <Select
            native
            onChange={(e) => onChange(e.target.value)}
            {...field}
            {...props}
          >
            {props.children}
          </Select>
        )}
      />

      {props.error && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  );
};

export { SelectController };
