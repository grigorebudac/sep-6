import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  Rating,
  RatingProps,
} from '@mui/material';
import { Controller, Control, FieldError } from 'react-hook-form';

export type ReviewControllerProps = Omit<RatingProps, 'error'> & {
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
          <Rating
            {...field}
            value={isNaN(field.value) ? null : Number(field.value)}
            {...props}
          />

          {error?.message != null && (
            <Box>
              <FormControl error={!!error}>
                <FormHelperText>{error.message}</FormHelperText>
              </FormControl>
            </Box>
          )}
        </>
      )}
      control={control}
    />
  );
};

export { ReviewController };
