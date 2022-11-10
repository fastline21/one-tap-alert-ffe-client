import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Box,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircle,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Sidebar from 'Containers/Sidebar';

const Main = ({ children, headerTitle, isPrivatePage = true }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {};

  return (
    <HelmetProvider>
      <Helmet>
        <title>{headerTitle ? `${headerTitle} - ` : ''}One-Tap Alert FFE</title>
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        {isPrivatePage && (
          <>
            <AppBar
              position='fixed'
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                  One-Tap Alert FFE
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton
                    size='large'
                    aria-label='show 4 new mails'
                    color='inherit'
                  >
                    <Badge badgeContent={4} color='error'>
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size='large'
                    aria-label='show 17 new notifications'
                    color='inherit'
                  >
                    <Badge badgeContent={17} color='error'>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size='large'
                    edge='end'
                    aria-label='account of current user'
                    // aria-controls={menuId}
                    aria-haspopup='true'
                    onClick={handleMenuOpen}
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
            <Menu
              // anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              // id={menuId}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleProfile()}>Profile</MenuItem>
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </Menu>
            <Sidebar />
          </>
        )}
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </HelmetProvider>
  );
};

export default Main;
