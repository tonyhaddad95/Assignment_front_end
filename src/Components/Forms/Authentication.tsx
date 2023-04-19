import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { LOGIN_PATHS, USER_AUTHENTICATION_PATHS } from 'util/constants';


interface Props<T> {
  data: T[];
  type: String;
  renderItem: (item: T) => React.ReactNode;
}

const useStyles = makeStyles(() => ({
  authBox: {
    width: '45%',
    margin: '0 auto',
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 3,
    justifyContent: 'center',
    gap: 20,
    ['@media (max-width: 850px)']: {
      width: '90%',
    },
  },
  image: {
    width: '100px',
    margin: '0 auto',
    textAlign: 'center'
  }
}));

function Authentication<T>({ data, type, renderItem }: Props<T>) {
  const classes = useStyles();
  const location = useLocation()
  return (
    <Card className={classes.authBox}>
      <img className={classes.image} src='/assets/images/logo2.png' />
      {data.map((item, index) => (
        <span key={index}>{renderItem(item)}</span>
      ))}
      {(USER_AUTHENTICATION_PATHS.includes(location.pathname)) && ((type == '' || type == 'signup') ?
        <Typography>Already have an account? <Link to="/">Sign-In</Link></Typography> :
        <Grid>
          <Typography>Don't have an account? <Link to="/user/sign-up">Sign-Up</Link></Typography>
          <Typography>Forgot your password? <Link to="/user/reset-password">Reset password</Link></Typography>
        </Grid>)}
        {LOGIN_PATHS.admin == location.pathname && <Typography>
              <Typography>Sign-in as user <Link to="/"> Sign-In</Link></Typography> :
            </Typography>}
    </Card>
  );
}

export default Authentication;