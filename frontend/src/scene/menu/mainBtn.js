import React from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  KeyboardArrowDown,
  Person
} from '@mui/icons-material';

export default function MenuBtn() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    open ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton edge="start" 
      aria-label="menu" 
      aria-controls={open ? 'basic-menu' : undefined} 
      aria-haspopup="true" 
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick} 
      sx={{ mr: 5 }}
      >
        <Person sx={{color: '#7c7c7c'}} />
        <KeyboardArrowDown sx={{color: '#7c7c7c', transform: open ? 'rotate(-180deg)' : 'rotate(0)' }}/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button', }}
      >
        <MenuItem onClick={handleClose}>
          undo
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Redo
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Exit
        </MenuItem>
      </Menu>
    </Box>
  );
}
