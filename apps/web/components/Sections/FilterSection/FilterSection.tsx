import { Typography } from '@mui/material';
import React from 'react';

interface FilterSectionProps {
  title: string;
  children?: React.ReactNode;
}

const FilterSection = (props: FilterSectionProps) => {
  return (
    <div>
      <Typography mb="1rem" variant="body2">
        {props.title}
      </Typography>

      {props.children}
    </div>
  );
};

export default FilterSection;
