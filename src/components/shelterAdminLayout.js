import * as React from 'react';
import { Link } from 'react-router-dom';
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
import { logout } from '../firebase/auth';

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

export default function ShelterAdminLayout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const drawermenus = [
    {
      label: 'Dashboard',
      link: 'dashboard',
      icon: <DashboardIcon color="primary" />,
    },
    {
      label: 'Animal Listing',
      link: 'animallisting',
      icon: <ViewListIcon color="primary" />,
    },
    {
      label: 'Adoption Page',
      link: 'adoptionpage',
      icon: <PetsIcon color="primary" />,
    },
  ];

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
              {'Stray Worth Saving'}
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
          {drawermenus.map((drawermenu) => (
            <ListItem
              key={drawermenu.label}
              button
              sx={{
                color: '#5f7161',
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 3,
              }}
              component={Link}
              to={`/${drawermenu.link}`}
              selected={window.location.pathname.includes(
                `/${drawermenu.link}`
              )}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {drawermenu.icon}
              </ListItemIcon>
              <ListItemText
                primary={`${drawermenu.label}`}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItem>
          ))}
        </List>

        <List>
          <Divider />
          {/* Profile */}
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
            to="/profile "
            selected={window.location.pathname.includes('/profile')}
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
          {/* Profile */}
          {/* Logout */}
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
            onClick={handleLogout}
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
