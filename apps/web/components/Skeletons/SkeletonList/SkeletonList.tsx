import { Box } from '@mui/material';
import React from 'react';

interface SkeletonListProps {
  count?: number;
}

const SkeletonList: React.FC<SkeletonListProps> = (props) => {
  return (
    <div>
      {[...new Array(props.count)].map((__, index) => (
        <Box key={index} marginBottom="1rem">
          {props.children}
        </Box>
      ))}
    </div>
  );
};

SkeletonList.defaultProps = {
  count: 5,
};

export default SkeletonList;
