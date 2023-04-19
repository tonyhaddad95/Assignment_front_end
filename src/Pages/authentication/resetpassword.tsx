import React from 'react'
import Authentication from 'Components/Forms/Authentication';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import AuthLayout from 'Components/AuthLayout';

interface InputField {
  placeholder: string;
  type: string;
}

const useStyles = makeStyles(() => ({
  authCard: {
   padding: 0,
  },
  authInput: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1
  }
}));

const ResetPassword = () => {
  const classes = useStyles();

  const inputFields: InputField[] = [
    { placeholder: 'Recovery Email', type: 'email' },
    { placeholder: '', type: 'submit' },
  ];

  return (
    <AuthLayout>
      <Authentication type={''} data={inputFields}
        renderItem={(input) => <span className={classes.authCard}>
        {input.type !== 'submit' && <Typography>{input.placeholder}</Typography>}
        <input className={classes.authInput} placeholder={input.placeholder} type={input.type} title={input.placeholder}/>
      </span>}/>
    </AuthLayout>
  )
}

export default ResetPassword