import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableData from 'Components/TableData';
import DialogViewData from 'Components/DialogViewData';

import Main from 'Containers/Main';
import Loading from 'Containers/Loading';

import { EMERGENCIES_HEAD } from 'Constants/table_head';
import { EMERGENCY_TYPES } from 'Constants/emergency_types';
import { EMERGENCY_STATUSES } from 'Constants/emergency_statuses';

import {
  getCurrentEmergencies,
  getEmergency,
  clearEmergency,
} from 'Services/Actions/emergencies.action';

const EmergencyFloodPage = ({
  emergenciesState: { emergencies, emergency, loading },
  getCurrentEmergencies,
  getEmergency,
  clearEmergency,
}) => {
  const initialShowDialog = {
    show: false,
    action: null,
  };

  const [showDialog, setShowDialog] = useState(initialShowDialog);

  useEffect(() => {
    getCurrentEmergencies({
      status_ids: [
        EMERGENCY_STATUSES.NOT_RESPONDED,
        EMERGENCY_STATUSES.RESPONDED,
      ],
      type_id: EMERGENCY_TYPES.FLOOD,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (id) => {
    getEmergency(id);
    setShowDialog({
      show: true,
      action: 'View',
    });
  };

  const handleCloseDialog = () => {
    clearEmergency();
    setShowDialog(initialShowDialog);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Main headerTitle='Flood'>
      {showDialog.show && showDialog.action === 'View' && (
        <DialogViewData
          show={showDialog.show}
          data={emergency}
          hideDialog={() => handleCloseDialog()}
          source='Emergency'
        />
      )}
      <Box sx={{ mb: 5 }}>
        <Typography variant='h4'>Emergency - Flood</Typography>
      </Box>
      <Box>
        {emergencies && (
          <TableData
            head={EMERGENCIES_HEAD}
            data={emergencies}
            source='emergencies'
            view={(id) => handleView(id)}
          />
        )}
      </Box>
    </Main>
  );
};

EmergencyFloodPage.propTypes = {
  emergenciesState: PropTypes.object.isRequired,
  getCurrentEmergencies: PropTypes.func.isRequired,
  getEmergency: PropTypes.func.isRequired,
  clearEmergency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  emergenciesState: state.emergenciesState,
});

export default connect(mapStateToProps, {
  getCurrentEmergencies,
  getEmergency,
  clearEmergency,
})(EmergencyFloodPage);
