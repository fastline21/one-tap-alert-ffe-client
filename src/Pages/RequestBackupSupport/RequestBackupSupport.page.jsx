import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableData from 'Components/TableData';

import Main from 'Containers/Main';
import Loading from 'Containers/Loading';

import { REQUEST_BACKUPS_HEAD } from 'Constants/table_head';

import { getAllRequestBackups } from 'Services/Actions/request-backups.action';

const RequestBackupSupportPage = ({
  requestBackupsState: { requestBackups, loading },
  getAllRequestBackups,
}) => {
  useEffect(() => {
    getAllRequestBackups();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !requestBackups) {
    return <Loading />;
  }

  return (
    <Main headerTitle='Request Backups Support'>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h4'>Request Backups Support</Typography>
      </Box>
      <Box>
        <TableData
          head={REQUEST_BACKUPS_HEAD}
          data={requestBackups}
          source='request-backups'
        />
      </Box>
    </Main>
  );
};

RequestBackupSupportPage.propTypes = {
  requestBackupsState: PropTypes.object.isRequired,
  getAllRequestBackups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  requestBackupsState: state.requestBackupsState,
});

export default connect(mapStateToProps, {
  getAllRequestBackups,
})(RequestBackupSupportPage);
