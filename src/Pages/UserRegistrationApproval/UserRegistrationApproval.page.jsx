import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableData from 'Components/TableData';

import Main from 'Containers/Main';
import Loading from 'Containers/Loading';

import { USER_STATUSES } from 'Constants/user_statuses';
import { USERS_HEAD } from 'Constants/table_head';

import {
  getAllUsersByUserStatusID,
  getUser,
} from 'Services/Actions/users.action';

const UserRegistrationApprovalPage = ({
  usersState: { users, loading },
  getAllUsersByUserStatusID,
  getUser,
}) => {
  // const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    getAllUsersByUserStatusID(USER_STATUSES.PENDING);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (id) => {
    getUser(id);
    // setIsShowModal(true);
  };

  if (loading || !users) {
    return <Loading />;
  }

  return (
    <Main headerTitle='Resident'>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h4'>User Registration Approval</Typography>
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

UserRegistrationApprovalPage.propTypes = {
  usersState: PropTypes.object.isRequired,
  getAllUsersByUserStatusID: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usersState: state.usersState,
});

export default connect(mapStateToProps, {
  getAllUsersByUserStatusID,
  getUser,
})(UserRegistrationApprovalPage);
