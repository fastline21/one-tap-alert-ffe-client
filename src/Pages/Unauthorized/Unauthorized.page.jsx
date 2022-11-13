import { Typography, Avatar, Container, Box } from '@mui/material';

import Main from 'Containers/Main';

import Logo from 'Assets/Images/logo.png';

const UnauthorizedPage = () => {
  return (
    <Main headerTitle='Unauthorized' isPrivatePage={false}>
      <Container maxWidth='md'>
        <Box
          sx={{
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
            <Typography variant='h1'>401</Typography>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant='h5'>Unauthorized</Typography>
          </Box>
          <Box>
            <Typography>You are not authorized to access this page.</Typography>
          </Box>
        </Box>
      </Container>
    </Main>
  );
};

export default UnauthorizedPage;
