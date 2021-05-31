import React, { useState } from 'react';
import { SiteInfoContextConsumer } from "App";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Button, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './style';
import { Alert } from 'components';
import { useHistory } from "react-router-dom";
import storage from '../../../../utils/storage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFont, faLink, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const Topbar = props => {
  const { className, title, onSidebarOpen, onSidebarClose, openSidebar, ...rest } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarOpen, setAvatarOpen] = useState(Boolean(anchorEl));
  const classes = useStyles();
  let history = useHistory();

  const onMaxTopbar = () => {
    if (openSidebar === false)
      onSidebarOpen();
    else
      onSidebarClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
    setAvatarOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setAvatarOpen(true);
  };

  const handleLogout = () => {
    handleClose();
    storage.removeStorage('token');
    history.push('/login');
  }

  const handleProfile = () => {
    history.push('/profile');
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.toolbar}>
        <div className={classes.titlebar}>
          <Button className={classes.close_drawer_icon} onClick={onMaxTopbar} aria-label={!openSidebar ? 'Rozwiń menu' : 'Zwiń menu'} title={!openSidebar ? 'Rozwiń menu' : 'Zwiń menu'}>
            <MenuIcon />
          </Button>
          <Typography variant="h1" className={classes.title}>
            {title}
          </Typography>
        </div>
        <div className={classes.rightControllerArea}>
          <div className={classes.avatar}>
            <IconButton
              aria-label="Profil użytkownika"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle className={classes.avataricon} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={avatarOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile} aria-label="Edytuj profil">Edytuj profil</MenuItem>
              <MenuItem onClick={handleLogout} aria-label="Wyloguj">Wyloguj</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
