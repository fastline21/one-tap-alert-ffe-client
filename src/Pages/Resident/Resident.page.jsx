import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableData from 'Components/TableData';
import DialogViewData from 'Components/DialogViewData';
import DialogEditData from 'Components/DialogEditData';
import DialogDeleteData from 'Components/DialogDeleteData';

import Main from 'Containers/Main';
import Loading from 'Containers/Loading';

import { USER_TYPES } from 'Constants/user_types';
import { USERS_HEAD } from 'Constants/table_head';

import {
  getAllUsersByUserTypeID,
  getUser,
  updateUser,
  usersClearResponse,
  clearUser,
} from 'Services/Actions/users.action';
import { getAllBarangays } from 'Services/Actions/barangays.action';

const ResidentPage = ({
  usersState: { users, user, loading, success, error, message },
  barangaysState: { barangays, loading: barangaysLoading },
  getAllUsersByUserTypeID,
  getUser,
  getAllBarangays,
  updateUser,
  usersClearResponse,
  clearUser,
}) => {
  const initialShowDialog = {
    show: false,
    action: null,
  };

  const [showDialog, setShowDialog] = useState(initialShowDialog);

  useEffect(() => {
    getAllUsersByUserTypeID(USER_TYPES.RESIDENT);
    getAllBarangays();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (id) => {
    getUser(id);
    setShowDialog({
      show: true,
      action: 'View',
    });
  };

  const handleEdit = (id) => {
    getUser(id);
    setShowDialog({
      show: true,
      action: 'Edit',
    });
  };

  const handleRemove = (id) => {
    getUser(id);
    setShowDialog({
      show: true,
      action: 'Remove',
    });
  };

  const handleCloseDialog = () => {
    setShowDialog(initialShowDialog);
  };

  const handleSubmitEdit = (data) => {
    updateUser(data);
    clearUser();
  };

  useEffect(() => {
    if (success) {
      alert(message);
      usersClearResponse();
      getAllUsersByUserTypeID(USER_TYPES.RESIDENT);
    }

    if (error) {
      alert(message);
      usersClearResponse();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error, message]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Main headerTitle='Resident'>
      {showDialog.show && showDialog.action === 'View' && (
        <DialogViewData
          show={showDialog.show}
          data={user}
          hideDialog={() => handleCloseDialog()}
          source='User'
        />
      )}
      {showDialog.show && showDialog.action === 'Edit' && (
        <DialogEditData
          show={showDialog.show}
          data={[user, barangays]}
          hideDialog={() => handleCloseDialog()}
          source='User'
          submit={(data) => handleSubmitEdit(data)}
        />
      )}
      {showDialog.show && showDialog.action === 'Remove' && (
        <DialogDeleteData
          show={showDialog.show}
          data={user}
          hideDialog={() => handleCloseDialog()}
          source='User'
        />
      )}
      <Box sx={{ mb: 5 }}>
        <Typography variant='h4'>User - Resident</Typography>
      </Box>
      <Box>
        {users && (
          <TableData
            head={USERS_HEAD}
            data={users}
            view={(id) => handleView(id)}
            edit={(id) => handleEdit(id)}
            remove={(id) => handleRemove(id)}
          />
        )}
      </Box>
    </Main>
  );
};

ResidentPage.propTypes = {
  usersState: PropTypes.object.isRequired,
  barangaysState: PropTypes.object.isRequired,
  getAllUsersByUserTypeID: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  getAllBarangays: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  usersClearResponse: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usersState: state.usersState,
  barangaysState: state.barangaysState,
});

export default connect(mapStateToProps, {
  getAllUsersByUserTypeID,
  getUser,
  getAllBarangays,
  updateUser,
  usersClearResponse,
  clearUser,
})(ResidentPage);
