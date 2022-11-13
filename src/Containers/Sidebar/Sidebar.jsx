import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  ListSubheader,
} from '@mui/material';
import {
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  House as HouseIcon,
  Support as SupportIcon,
  Report as ReportIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { USER_TYPES } from 'Constants/user_types';

const Sidebar = ({ authState: { auth } }) => {
  const drawerWidth = 240;
  const navigate = useNavigate();

  const handleLink = (link) => {
    navigate(link);
  };

  const AdminRender = () => {
    return (
      <>
        <ListItemButton
          onClick={() => handleLink('/user-registration-approval')}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='User Registration Approval' />
        </ListItemButton>
        <ListItemButton onClick={() => handleLink('/request-backup-support')}>
          <ListItemIcon>
            <SupportIcon />
          </ListItemIcon>
          <ListItemText primary='Request Backup Support' />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListSubheader component='div' inset>
          Users
        </ListSubheader>
        <ListItemButton onClick={() => handleLink('/resident')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Resident' />
        </ListItemButton>
        <ListItemButton onClick={() => handleLink('/responder')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Responder' />
        </ListItemButton>
        <ListItemButton onClick={() => handleLink('/barangay-staff')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Barangay Staff' />
        </ListItemButton>
        <ListItemButton onClick={() => handleLink('/command-center')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Command Center' />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListItemButton onClick={() => handleLink('/barangays')}>
          <ListItemIcon>
            <HouseIcon />
          </ListItemIcon>
          <ListItemText primary='Barangays' />
        </ListItemButton>
      </>
    );
  };

  const BarangayStaffRender = () => {
    return (
      <>
        <ListItemButton
          onClick={() => handleLink('/resident-ffe-emergency-taps')}
        >
          <ListItemIcon>
            <SupportIcon />
          </ListItemIcon>
          <ListItemText primary='Resident FFE Emergency Taps' />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListSubheader component='div' inset>
          Incident Reports
        </ListSubheader>
        <ListItemButton onClick={() => handleLink('/fire')}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary='Fire' />
        </ListItemButton>
        <ListItemButton onClick={() => handleLink('/flood')}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary='Flood' />
        </ListItemButton>
        <ListItemButton onClick={() => handleLink('/earthquake')}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary='Earthquake' />
        </ListItemButton>
        <ListItemButton onClick={() => handleLink('/incident-reports')}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary='Overall Reports' />
        </ListItemButton>
      </>
    );
  };

  const CommandCenterRender = () => {
    return (
      <>
        <ListItemButton
          onClick={() => handleLink('/resident-ffe-emergency-taps')}
        >
          <ListItemIcon>
            <SupportIcon />
          </ListItemIcon>
          <ListItemText primary='Resident FFE Emergency Taps' />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListSubheader component='div' inset>
          Incident Reports
        </ListSubheader>
        <ListItemButton onClick={() => handleLink('/fire')}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary='Fire' />
        </ListItemButton>
        <ListItemButton onClick={() => handleLink('/flood')}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary='Flood' />
        </ListItemButton>
        <ListItemButton onClick={() => handleLink('/earthquake')}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary='Earthquake' />
        </ListItemButton>
        <ListItemButton onClick={() => handleLink('/incident-reports')}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary='Overall Reports' />
        </ListItemButton>
      </>
    );
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton onClick={() => handleLink('/')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListSubheader component='div' inset>
          Features
        </ListSubheader>
        {auth.user_type_id === USER_TYPES.ADMIN && <AdminRender />}
        {auth.user_type_id === USER_TYPES.BARANGAY_STAFF && (
          <BarangayStaffRender />
        )}
        {auth.user_type_id === USER_TYPES.COMMAND_CENTER && (
          <CommandCenterRender />
        )}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {})(Sidebar);
