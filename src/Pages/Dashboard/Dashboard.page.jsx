import { Typography, Box, Grid } from '@mui/material';
import { People as PeopleIcon, House as HouseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Main from 'Containers/Main';

import CardCount from 'Components/CardCount';

import { getAllUsersByUserStatusID } from 'Services/Actions/users.action';
import { getAllBarangays } from 'Services/Actions/barangays.action';

import { USER_STATUSES } from 'Constants/user_statuses';
import { USER_TYPES } from 'Constants/user_types';

const DashboardPage = ({
  usersState: { users },
  barangaysState: { barangays },
  getAllUsersByUserStatusID,
  getAllBarangays,
}) => {
  const navigate = useNavigate();

  const initialDataCount = {
    resident: 0,
    responder: 0,
    barangayStaff: 0,
    commandCenter: 0,
    barangays: 0,
  };

  const [dataCount, setDataCount] = useState(initialDataCount);

  useEffect(() => {
    getAllUsersByUserStatusID(USER_STATUSES.APPROVED);
    getAllBarangays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (users) {
      const residentCount = users.filter(
        (user) => user.user_type_id === USER_TYPES.RESIDENT
      ).length;

      const responderCount = users.filter(
        (user) => user.user_type_id === USER_TYPES.RESPONDER
      ).length;

      const barangayStaffCount = users.filter(
        (user) => user.user_type_id === USER_TYPES.BARANGAY_STAFF
      ).length;

      const commandCenterCount = users.filter(
        (user) => user.user_type_id === USER_TYPES.COMMAND_CENTER
      ).length;

      if (
        residentCount !== dataCount.resident ||
        responderCount !== dataCount.responder ||
        barangayStaffCount !== dataCount.barangayStaff ||
        commandCenterCount !== dataCount.commandCenter
      ) {
        setDataCount({
          ...dataCount,
          resident: residentCount,
          responder: responderCount,
          barangayStaff: barangayStaffCount,
          commandCenter: commandCenterCount,
        });
      }
    }

    if (barangays) {
      const barangaysCount = barangays.length;

      if (barangaysCount !== dataCount.barangays) {
        setDataCount({
          ...dataCount,
          barangays: barangaysCount,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, barangays, dataCount]);

  const handleMoreInfoLink = (link) => {
    navigate(link);
  };

  const handleProfile = () => {
    alert('Profile');
  };

  return (
    <Main headerTitle='Dashboard' profile={() => handleProfile()}>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h4'>Dashboard Page</Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={3}>
          <CardCount
            title='Resident'
            count={dataCount.resident}
            action={() => handleMoreInfoLink('/resident')}
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          <CardCount
            title='Responder'
            count={dataCount.responder}
            action={() => handleMoreInfoLink('/responder')}
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          <CardCount
            title='Barangay Staff'
            count={dataCount.barangayStaff}
            action={() => handleMoreInfoLink('/barangay-staff')}
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          <CardCount
            title='Command Center'
            count={dataCount.commandCenter}
            action={() => handleMoreInfoLink('/command-center')}
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={3}>
          <CardCount
            title='Barangays'
            count={dataCount.barangays}
            action={() => handleMoreInfoLink('/barangays')}
            icon={<HouseIcon />}
          />
        </Grid>
      </Grid>
    </Main>
  );
};

DashboardPage.propTypes = {
  usersState: PropTypes.object.isRequired,
  barangaysState: PropTypes.object.isRequired,
  getAllUsersByUserStatusID: PropTypes.func.isRequired,
  getAllBarangays: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usersState: state.usersState,
  barangaysState: state.barangaysState,
});

export default connect(mapStateToProps, {
  getAllUsersByUserStatusID,
  getAllBarangays,
})(DashboardPage);
