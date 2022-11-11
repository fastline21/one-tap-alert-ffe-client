import { Typography, Avatar, Container, Box } from '@mui/material';

import Main from 'Containers/Main';

import Logo from 'Assets/Images/logo.png';

const NotFoundPage = () => {
  return (
    <Main headerTitle='Not Found' isPrivatePage={false}>
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
            <Typography variant='h1'>404</Typography>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant='h5'>Not Found</Typography>
          </Box>
          <Box>
            <Typography>
              The resouce requested could not be found on this server!
            </Typography>
          </Box>
        </Box>
      </Container>
    </Main>
  );
};

export default NotFoundPage;
