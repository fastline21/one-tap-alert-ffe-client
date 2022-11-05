import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableData from 'Components/TableData';
import DialogData from 'Components/DialogData';

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
  const [isShowDialog, setIsShowDialog] = useState(false);

  useEffect(() => {
    getAllUsersByUserTypeID(USER_TYPES.RESIDENT);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (id) => {
    getUser(id);
    setIsShowDialog(true);
  };

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };

  if (loading || !users) {
    return <Loading />;
  }

  return (
    <Main headerTitle='Resident'>
      {isShowDialog && (
        <DialogData
          show={isShowDialog}
          data={user}
          hideDialog={() => handleCloseDialog()}
          source='users'
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
