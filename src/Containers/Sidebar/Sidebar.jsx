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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();

  const handleLink = (link) => {
    navigate(link);
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
      </List>
    </Drawer>
  );
};

export default Sidebar;
