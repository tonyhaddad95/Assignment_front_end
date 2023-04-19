import React from 'react';
import { makeStyles } from '@mui/styles';
import ResponsiveDrawer from 'Components/Drawer/Drawer';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { useLoading } from 'Components/Loading/Loading';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import { Typography } from '@mui/material';

interface LoggedInLayoutProps {
  children: React.ReactNode;
  role: string
}

const useStyles = makeStyles(() => ({
  image: {
    width: '100px',
    margin: '0 auto',
    textAlign: 'center'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    "&:hover": {
      opacity: 0.5,
      transition: '0.2s ease-in-out'
    }
  },
  nav: {
    display: 'flex',
    gap: 15
  },
  navLogo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30
  },
  dashboardtitleWrapper: {
    display: 'flex',
    color: 'white',
    alignItems: 'center',
    gap: 10,
    fontWeight: 'bold',
    fontSize: 30
  },
  root: {
   paddingLeft: 220,
   width: '100%',
   marginTop: 40,
   backgroundColor: '#f7f7f7',
   ['@media (max-width: 850px)']: {
     marginLeft: 0,
     padding: 10,
    },
  },
}));

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ children, role }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setOpen } = useLoading();

  const menuItems = role === 'admin' ? [
    { menuLink: 'Dashboard', icon: <DashboardIcon />, onClick: () => navigate('/admin/dashboard')}, 
    { menuLink: 'Users', icon: <PersonIcon />, onClick: () => navigate('/admin/users') },
    { menuLink: 'Sign out', icon: <ExitToAppIcon />, onClick: () => {setOpen(true); Cookies.remove('admin_token'); navigate('/admin/sign-in'); setTimeout(() => setOpen(false), 500)} }
  ] : [
    { menuLink: 'Sign out', icon: <ExitToAppIcon />, onClick: () => {setOpen(true); Cookies.remove('user_token'); navigate('/'); setTimeout(() => setOpen(false), 500)} }
  ]

  return (
    <div className={classes.root}>
      <ResponsiveDrawer role={role} menuItems={menuItems} title={<Typography className={classes.dashboardtitleWrapper}><BrandingWatermarkIcon /> <Typography fontWeight={'bold'} fontSize={24}>{role.toUpperCase()} {role === 'Admin' && 'Dashboard'}</Typography></Typography>} />
      <main>{children}</main>
    </div>
  );
};
export default LoggedInLayout