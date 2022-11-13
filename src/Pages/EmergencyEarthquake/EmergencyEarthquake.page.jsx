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

import { EMERGENCIES_HEAD } from 'Constants/table_head';
import { EMERGENCY_TYPES } from 'Constants/emergency_types';
import { EMERGENCY_STATUSES } from 'Constants/emergency_statuses';

import { getCurrentEmergencies } from 'Services/Actions/emergencies.action';

const EmergencyEarthquakePage = ({
  emergenciesState: { emergencies, loading },
  getCurrentEmergencies,
}) => {
  useEffect(() => {
    getCurrentEmergencies({
      status_ids: [
        EMERGENCY_STATUSES.NOT_RESPONDED,
        EMERGENCY_STATUSES.RESPONDED,
      ],
      type_id: EMERGENCY_TYPES.EARTHQUAKE,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Main headerTitle='Earthquake'>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h4'>Emergency - Earthquake</Typography>
      </Box>
      <Box>
        {emergencies && (
          <TableData
            head={EMERGENCIES_HEAD}
            data={emergencies}
            source='emergencies'
          />
        )}
      </Box>
    </Main>
  );
};

EmergencyEarthquakePage.propTypes = {
  emergenciesState: PropTypes.object.isRequired,
  getCurrentEmergencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, { getCurrentEmergencies })(
  EmergencyEarthquakePage
);