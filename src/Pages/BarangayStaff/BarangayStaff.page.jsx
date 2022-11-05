import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableData from 'Components/TableData';

import Main from 'Containers/Main';
import Loading from 'Containers/Loading';

import { USER_TYPES } from 'Constants/user_types';
import { USERS_HEAD } from 'Constants/table_head';

import { getAllUsersByUserTypeID } from 'Services/Actions/users.action';

const BarangayStaffPage = ({
  usersState: { users, loading },
  getAllUsersByUserTypeID,
}) => {
  useEffect(() => {
    getAllUsersByUserTypeID(USER_TYPES.BARANGAY_STAFF);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !users) {
    return <Loading />;
  }

  return (
    <Main headerTitle='Barangay Staff'>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h4'>User - Barangay Staff</Typography>
      </Box>
      <Box>
        <TableData head={USERS_HEAD} data={users} />
      </Box>
    </Main>
  );
};

BarangayStaffPage.propTypes = {
  usersState: PropTypes.object.isRequired,
  getAllUsersByUserTypeID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usersState: state.usersState,
});

export default connect(mapStateToProps, {
  getAllUsersByUserTypeID,
})(BarangayStaffPage);
