import React, { useState } from 'react';
import { Fab, Menu, MenuItem, Grow, ClickAwayListener } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandableFab = ({ primaryIcon, secondaryIcon, onClickPrimary, onClickSecondary }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickPrimary = () => {
    onClickPrimary();
    handleClose();
  };
  const handleClickSecondary = () => {
    onClickSecondary();
    handleClose();
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Fab color="primary" aria-label="actions" onClick={handleOpen}>
          {primaryIcon}
        </Fab>
        <Menu
          id="menu-list-grow"
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          TransitionComponent={Grow}
        >
          <MenuItem onClick={handleClickPrimary}>{primaryIcon}</MenuItem>
          <MenuItem onClick={handleClickSecondary}>{secondaryIcon}</MenuItem>
        </Menu>
      </div>
    </ClickAwayListener>
  );
};

export default ExpandableFab;
