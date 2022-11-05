import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableData from 'Components/TableData';

import Main from 'Containers/Main';
import Loading from 'Containers/Loading';

import { BARANGAYS_HEAD } from 'Constants/table_head';

import { getAllBarangays } from 'Services/Actions/barangays.action';

const BarangaysPage = ({
  barangaysState: { barangays, loading },
  getAllBarangays,
}) => {
  useEffect(() => {
    getAllBarangays();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !barangays) {
    return <Loading />;
  }

  return (
    <Main headerTitle='Brangays'>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h4'>Barangays</Typography>
      </Box>
      <Box>
        <TableData head={BARANGAYS_HEAD} data={barangays} source='barangays' />
      </Box>
    </Main>
  );
};

BarangaysPage.propTypes = {
  barangaysState: PropTypes.object.isRequired,
  getAllBarangays: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  barangaysState: state.barangaysState,
});

export default connect(mapStateToProps, {
  getAllBarangays,
})(BarangaysPage);
