import {
  Typography,
  Container,
  Box,
  Avatar,
  TextField,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Main from 'Containers/Main';

import Logo from 'Assets/Images/logo.png';

import { loginUser } from 'Services/Actions/auth.action';

import { USER_TYPES } from 'Constants/user_types';

const LoginPage = ({
  authState: {
    auth,
    loading: authLoading,
    success: authSuccess,
    error: authError,
    message: authMessage,
  },
  loginUser,
}) => {
  const navigate = useNavigate();

  const initialFormInput = {
    username: null,
    password: null,
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser({
      ...formInput,
      user_type_ids: [USER_TYPES.BARANGAY_STAFF, USER_TYPES.COMMAND_CENTER],
    });

    setFormInput(initialFormInput);
  };

  useEffect(() => {
    if (authSuccess) {
      // navigate('/');
      // alert('yes');
    }

    if (authError) {
      // alert(authMessage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authSuccess, authError, authMessage]);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Main headerTitle='Login' isPrivatePage={false}>
      <Container maxWidth='xs'>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box>
            <Avatar
              alt='One-Tap Alert FFE logo'
              src={Logo}
              sx={{ width: 150, height: 150 }}
            />
          </Box>
          <Box>
            <Typography variant='h4'>Login</Typography>
          </Box>
          <Box sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='username'
              label='Username*'
              variant='outlined'
              fullWidth
              value={formInput.username || ''}
              onChange={handleChangeInput}
            />
          </Box>
          <Box sx={{ mt: 3, width: '100%' }}>
            <TextField
              name='password'
              label='Password*'
              variant='outlined'
              fullWidth
              value={formInput.password || ''}
              onChange={handleChangeInput}
              type='password'
            />
          </Box>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Button variant='contained' size='large' fullWidth type='submit'>
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Main>
  );
};

LoginPage.propTypes = {
  authState: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {
  loginUser,
})(LoginPage);
