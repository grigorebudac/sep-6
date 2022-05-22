import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Rating,
  RatingProps,
  TextField,
} from "@mui/material";
import { Controller, Control, FieldError } from "react-hook-form";

export type ReviewControllerProps = Omit<RatingProps, "error"> & {
  control?: Control<any, object>;
  error?: FieldError;
  name: string;
};

const ReviewController: React.FC<ReviewControllerProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <Rating {...field} {...props} />

          <Box>
            <FormControl error={!!error}>
              {error?.message != null && (
                <FormHelperText>{error.message}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </>
        // <TextField
        //   variant="outlined"
        //   fullWidth
        //   {...field}
        //   {...props}
        //   error={!!error}
        //   helperText={error?.message}
        // />
      )}
      control={control}
      defaultValue=""
    />
  );
};

export { ReviewController };
