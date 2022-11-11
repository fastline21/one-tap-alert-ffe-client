import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Box, Toolbar, AppBar, Typography, IconButton } from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sidebar from 'Containers/Sidebar';
import Loading from 'Containers/Loading';

import { logoutUser } from 'Services/Actions/auth.action';

const Main = ({
  children,
  headerTitle,
  isPrivatePage = true,
  authState: { loading },
  logoutUser,
}) => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (loading) {
    return <Loading />;
  }

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
                    onClick={() => handleProfile()}
                    size='large'
                    color='inherit'
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleLogout()}
                    size='large'
                    color='inherit'
                    edge='end'
                  >
                    <LogoutIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
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

Main.propTypes = {
  authState: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {
  logoutUser,
})(Main);
