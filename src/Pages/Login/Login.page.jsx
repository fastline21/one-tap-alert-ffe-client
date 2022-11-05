import {
  Typography,
  Container,
  Box,
  Avatar,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';

import Main from 'Containers/Main';

import Logo from 'Assets/Images/logo.png';

const LoginPage = () => {
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
    alert(JSON.stringify(formInput));

    setFormInput(initialFormInput);
  };

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

export default LoginPage;
