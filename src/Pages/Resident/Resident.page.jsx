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
} from 'Services/Actions/users.action';

const ResidentPage = ({
  usersState: { users, user, loading },
  getAllUsersByUserTypeID,
  getUser,
}) => {
  const initialShowDialog = {
    show: false,
    action: null,
  };

  const [showDialog, setShowDialog] = useState(initialShowDialog);

  useEffect(() => {
    getAllUsersByUserTypeID(USER_TYPES.RESIDENT);

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

  if (loading || !users) {
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
          data={user}
          hideDialog={() => handleCloseDialog()}
          source='User'
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
        <TableData
          head={USERS_HEAD}
          data={users}
          view={(id) => handleView(id)}
          edit={(id) => handleEdit(id)}
          remove={(id) => handleRemove(id)}
        />
      </Box>
    </Main>
  );
};

ResidentPage.propTypes = {
  usersState: PropTypes.object.isRequired,
  getAllUsersByUserTypeID: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usersState: state.usersState,
});

export default connect(mapStateToProps, {
  getAllUsersByUserTypeID,
  getUser,
})(ResidentPage);
