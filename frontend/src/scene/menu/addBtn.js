import * as React from 'react';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import AddCirleIcon from '@mui/icons-material/AddCircle';

export default function AddBtn() {
  const spreadAddMenu = () => {
    console.log('Add menu spreaded');
  };

  return (
    <Box
      sx={{
        '& > :not(style)': {
          width: '50px', height: '50px',
          position: 'absolute',
          bottom: '3%',
          left: '1.5%'
        },
      }}
    >
      <IconButton onClick={spreadAddMenu}>
        <AddCirleIcon sx={{ fontSize: 55, color: 'skyblue' }}/>
      </IconButton>
    </Box>
  );
}
