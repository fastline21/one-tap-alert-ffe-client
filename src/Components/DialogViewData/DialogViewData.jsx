import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';

const DialogViewData = ({ show, hideDialog, data, source }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    hideDialog();
  };

  const UserRender = () => {
    return (
      <>
        <Avatar
          src={`/public/captured-image/${data.captured_image_selfie}`}
          sx={{ width: 200, height: 200, margin: 'auto' }}
        />
        <Typography variant='h6' component='h2'>
          Personal Info
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography>ID: {data.id}</Typography>
          <Typography>First Name: {data.first_name}</Typography>
          <Typography>Middle Initial: {data.middle_initial}</Typography>
          <Typography>Last Name: {data.last_name}</Typography>
          <Typography>Email Address: {data.email_address}</Typography>
          <Typography>Username: {data.username}</Typography>
        </Box>
        <Typography variant='h6' component='h2' sx={{ mt: 2 }}>
          Contact Info
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography>Contact No: +63{data.contact_no}</Typography>
          <Typography>Address: {data.address}</Typography>
          <Typography>Barangay: {data.barangay.name}</Typography>
          <Typography>City: {data.city}</Typography>
          <Typography>Postal Code: {data.zip_code}</Typography>
        </Box>
        <Typography variant='h6' component='h2' sx={{ mt: 2 }}>
          Contact Person
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography>First Name: {data.contact_person.first_name}</Typography>
          <Typography>Last Name: {data.contact_person.last_name}</Typography>
          <Typography>Contact No: {data.contact_person.contact_no}</Typography>
          <Typography>
            Emial Address: {data.contact_person.email_address}
          </Typography>
        </Box>
      </>
    );
  };

  const EmergencyRender = () => {
    return (
      <>
        <Typography variant='h6' component='h2'>
          Emergency Info
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Avatar
            src={`/public/captured-image/${data.emergency_proof?.file}`}
            sx={{ width: 200, height: 200, margin: 'auto' }}
          />
          <Typography>Status: {data.emergency_status.name}</Typography>
          <Typography>Type: {data.emergency_type.name}</Typography>
        </Box>
        <Typography variant='h6' component='h2'>
          Resident Info
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Avatar
            src={`/public/captured-image/${data.user.captured_image_selfie}`}
            sx={{ width: 200, height: 200, margin: 'auto' }}
          />
          <Typography>
            Resident Name: {data.user.first_name} {data.user.last_name}
          </Typography>
          <Typography>Address: {data.user.address}</Typography>
          <Typography>Barangay: {data.user.address}</Typography>
        </Box>
        <Typography variant='h6' component='h2'>
          Responder Info
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Avatar
            src={`/public/captured-image/${data.responder.captured_image_selfie}`}
            sx={{ width: 200, height: 200, margin: 'auto' }}
          />
          <Typography>
            Responder Name:{' '}
            {data.responder ? (
              <>
                {data.responder.first_name} {data.responder.last_name}
              </>
            ) : (
              'Not available'
            )}
          </Typography>
        </Box>
      </>
    );
  };

  useEffect(() => {
    if (show) {
      handleOpen();
    }
  }, [show]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
        <DialogTitle>View {source}</DialogTitle>
        <DialogContent>
          {source === 'User' && <UserRender />}
          {source === 'Emergency' && <EmergencyRender />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogViewData;
