import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useState, useEffect } from 'react';

import { USER_TYPES } from 'Constants/user_types';

const DialogEditData = ({ show, data, source, submit, hideDialog }) => {
  const initialFormInput = {
    firstName: null,
    middleInitial: null,
    lastName: null,
    emailAddress: null,
    userTypeID: null,
    contactNo: null,
    address: null,
    barangayID: null,
    city: null,
    zipCode: null,
    contactPersonFirstName: null,
    contactPersonLastName: null,
    contactPersonContactNo: null,
    contactPersonEmailAddress: null,
  };

  const [open, setOpen] = useState(false);
  const [formInput, setFormInput] = useState(initialFormInput);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    hideDialog();
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = () => {
    const formData = {
      user_id: data[0].id,
    };

    const {
      firstName,
      middleInitial,
      lastName,
      emailAddress,
      userTypeID,
      contactNo,
      address,
      barangayID,
      city,
      zipCode,
      contactPersonFirstName,
      contactPersonLastName,
      contactPersonContactNo,
      contactPersonEmailAddress,
    } = formInput;

    const contactPerson = {};

    if (firstName) {
      formData.first_name = firstName;
    }

    if (middleInitial) {
      formData.middle_initial = middleInitial;
    }

    if (lastName) {
      formData.last_name = lastName;
    }

    if (emailAddress) {
      formData.email_address = emailAddress;
    }

    if (userTypeID) {
      formData.user_type_id = userTypeID;
    }

    if (contactNo) {
      formData.contact_no = contactNo;
    }

    if (address) {
      formData.address = address;
    }

    if (barangayID) {
      formData.barangay_id = barangayID;
    }

    if (city) {
      formData.city = city;
    }

    if (zipCode) {
      formData.zip_code = zipCode;
    }

    if (contactPersonFirstName) {
      contactPerson.first_name = contactPersonFirstName;
    }

    if (contactPersonLastName) {
      contactPerson.last_name = contactPersonLastName;
    }

    if (contactPersonContactNo) {
      contactPerson.contact_no = contactPersonContactNo;
    }

    if (contactPersonEmailAddress) {
      contactPerson.email_address = contactPersonEmailAddress;
    }

    if (contactPerson !== {}) {
      formData.contact_person = JSON.stringify(contactPerson);
    }

    submit(formData);

    setFormInput(initialFormInput);

    handleClose();
  };

  useEffect(() => {
    if (show) {
      handleOpen();
    }
  }, [show]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
        <DialogTitle>Edit {source}</DialogTitle>
        <DialogContent>
          {source === 'User' && (
            <>
              <Avatar
                src={`/public/captured-image/${data[0].captured_image_selfie}`}
                sx={{ width: 200, height: 200, margin: 'auto' }}
              />
              <Typography variant='h6' component='h2'>
                Personal Info
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    disabled
                    label='ID'
                    variant='outlined'
                    size='small'
                    defaultValue={data[0].id}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='First Name'
                    variant='outlined'
                    size='small'
                    name='firstName'
                    value={formInput.firstName || data[0].first_name}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='Middle Initial'
                    variant='outlined'
                    size='small'
                    name='middleInitial'
                    value={formInput.middleInitial || data[0].middle_initial}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='Last Name'
                    variant='outlined'
                    size='small'
                    name='lastName'
                    value={formInput.lastName || data[0].last_name}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='Email Address'
                    variant='outlined'
                    size='small'
                    name='emailAddress'
                    value={formInput.emailAddress || data[0].email_address}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    disabled
                    label='Username'
                    variant='outlined'
                    size='small'
                    defaultValue={data[0].username}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <InputLabel id='user-type-id'>User Type</InputLabel>
                  <Select
                    labelId='user-type-id'
                    value={formInput.userTypeID || data[0].user_type_id}
                    label='User Type'
                    onChange={handleChangeInput}
                    size='small'
                    fullWidth
                    name='userTypeID'
                  >
                    <MenuItem value={USER_TYPES.ADMIN}>Admin</MenuItem>
                    <MenuItem value={USER_TYPES.RESIDENT}>Resident</MenuItem>
                    <MenuItem value={USER_TYPES.RESPONDER}>Responder</MenuItem>
                    <MenuItem value={USER_TYPES.BARANGAY_STAFF}>
                      Barangay Staff
                    </MenuItem>
                    <MenuItem value={USER_TYPES.COMMAND_CENTER}>
                      Command Center
                    </MenuItem>
                  </Select>
                </Box>
              </Box>
              <Typography variant='h6' component='h2' sx={{ mt: 2 }}>
                Contact Info
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='Contact No. (+63)'
                    variant='outlined'
                    size='small'
                    name='contactNo'
                    value={
                      formInput.contactNo ||
                      data[0].contact_no.replace('+63', '')
                    }
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='Address'
                    variant='outlined'
                    size='small'
                    name='address'
                    value={formInput.address || data[0].address}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <InputLabel id='barangay-id'>Barangay</InputLabel>
                  <Select
                    labelId='barangay-id'
                    value={formInput.barangayID || data[0].barangay_id}
                    label='Barangay'
                    onChange={handleChangeInput}
                    size='small'
                    fullWidth
                    name='barangayID'
                  >
                    {data[1].map((barangay, index) => (
                      <MenuItem key={index} value={barangay.id}>
                        {barangay.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='City'
                    variant='outlined'
                    size='small'
                    name='city'
                    value={formInput.city || data[0].city}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='Postal Code'
                    variant='outlined'
                    size='small'
                    name='zipCode'
                    value={formInput.zipCode || data[0].zip_code}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
              </Box>
              <Typography variant='h6' component='h2' sx={{ mt: 2 }}>
                Contact Person
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='First Name'
                    variant='outlined'
                    size='small'
                    name='contactPersonFirstName'
                    value={
                      formInput.contactPersonFirstName ||
                      data[0].contact_person.first_name
                    }
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='Last Name'
                    variant='outlined'
                    size='small'
                    name='contactPersonLastName'
                    value={
                      formInput.contactPersonLastName ||
                      data[0].contact_person.last_name
                    }
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='Contact No. (+63)'
                    variant='outlined'
                    size='small'
                    name='contactPersonContactNo'
                    value={
                      formInput.contactPersonContactNo ||
                      data[0].contact_person.contact_no.replace('+63', '')
                    }
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 2, width: '100%' }}>
                  <TextField
                    label='Email Address'
                    variant='outlined'
                    size='small'
                    name='contactPersonEmailAddress'
                    value={
                      formInput.contactPersonEmailAddress ||
                      data[0].contact_person.email_address
                    }
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Close</Button>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogEditData;
