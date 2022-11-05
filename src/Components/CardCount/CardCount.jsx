import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
} from '@mui/material';

const CardCount = ({ title, count, action, icon }) => {
  const handleAction = () => {
    action();
  };

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography>{title}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography>{count}</Typography>
          </Box>
          <Box>{icon}</Box>
        </Box>
      </CardContent>
      <CardActions>
        <Box>
          <Button onClick={() => handleAction()}>More info</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default CardCount;
