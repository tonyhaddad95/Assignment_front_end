import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@mui/styles';

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
  root: {
    background: 'radial-gradient(circle, rgba(238,174,189,0.7) 0%, rgba(38,46,200,0.7) 100%)',
    height: '100%',
    position: 'absolute',
    width: '100%',
    display: 'flex',
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    top: 0,
  },
  arcDiv: {
    width: '100%',
    position: 'absolute',
    zIndex: -2,
    bottom: 0,
    height: '50%', 
    backgroundColor: '#fff',
    borderRadius: '60% 60% 0 0',
    boxShadow: '10px 5px 10px black',
    ['@media (max-width: 650px)']: {
      borderRadius: '30% 30% 0 0',
      height: '50%', 
  },
  }
}));

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.arcDiv}></div>
      <main>{children}</main>
    </div>
  );
};
export default AuthLayout