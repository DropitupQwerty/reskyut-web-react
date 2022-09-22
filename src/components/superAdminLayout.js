import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PetsIcon from '@mui/icons-material/Pets';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Logout from '@mui/icons-material/Logout';
import { logout } from './../firebase/auth';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function SuperAdminLayout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    logout();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: '600' }}>
              {'SUPER ADMIN'}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List sx={{ flexGrow: 1 }}>
          {/* Dashboard */}
          <ListItem
            button
            sx={{
              color: '#5f7161',
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 3,
            }}
            component={Link}
            to="/admin/dashboard"
            selected={window.location.pathname.includes('/admin/dashboard')}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard  "
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItem>
          {/* Dashboard */}
          {/* NGO list*/}
          <ListItem
            button
            sx={{
              color: '#5f7161',
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 3,
            }}
            component={Link}
            to="/admin/listofngo"
            selected={window.location.pathname.includes('/admin/listofngo')}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <ViewListIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="List of NGO  "
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItem>
          {/* Ngo list */}
          {/* Add Ngo*/}
          <ListItem
            button
            sx={{
              color: '#5f7161',
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 3,
            }}
            component={Link}
            to="/admin/addngo"
            selected={window.location.pathname.includes('/admin/addngo')}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <GroupAddIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add NGO  " sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
          {/* Add Ngo */}
          {/* Post of Ngo*/}
          <ListItem
            button
            sx={{
              color: '#5f7161',
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 3,
            }}
            component={Link}
            to="/admin/postofngo"
            selected={window.location.pathname.includes('/admin/postofngo')}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <DynamicFeedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Post Of NGO  "
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItem>
          {/* Post of Ngo */}
        </List>
        <List>
          <Divider />
          {/* Profile*/}
          <ListItem
            button
            sx={{
              color: '#5f7161',
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 3,
            }}
            component={Link}
            to=""
            selected={window.location.pathname.includes('')}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <AccountCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Profile  " sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
          <ListItem
            button
            sx={{
              color: '#5f7161',
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 3,
              flexGrow: '1',
            }}
            component={Link}
            to="/"
            onClick={handleLogOut}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LogoutIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Logout  " sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
          {/* Logout */}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '100px' }}>
        {children}
      </Box>
    </Box>
  );
}
