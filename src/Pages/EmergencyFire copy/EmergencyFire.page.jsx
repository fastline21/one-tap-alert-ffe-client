import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableData from 'Components/TableData';

import Main from 'Containers/Main';
import Loading from 'Containers/Loading';

import { EMERGENCIES_HEAD } from 'Constants/table_head';
import { EMERGENCY_TYPES } from 'Constants/emergency_types';
import { EMERGENCY_STATUSES } from 'Constants/emergency_statuses';

import { getCurrentEmergencies } from 'Services/Actions/emergencies.action';

const EmergencyFirePage = ({
  emergenciesState: { emergencies, loading },
  getCurrentEmergencies,
}) => {
  useEffect(() => {
    getCurrentEmergencies({
      status_ids: [
        EMERGENCY_STATUSES.NOT_RESPONDED,
        EMERGENCY_STATUSES.RESPONDED,
      ],
      type_id: EMERGENCY_TYPES.FIRE,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Main headerTitle='Fire'>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h4'>Emergency - Fire</Typography>
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

EmergencyFirePage.propTypes = {
  emergenciesState: PropTypes.object.isRequired,
  getCurrentEmergencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, { getCurrentEmergencies })(
  EmergencyFirePage
);
