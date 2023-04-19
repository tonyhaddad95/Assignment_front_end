import React, { useState } from 'react'
import Authentication from 'Components/Forms/Authentication';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import AuthLayout from 'Components/AuthLayout';
import { login } from 'Services/admin/authentication';
import { useLocation, useNavigate } from 'react-router';
import { LOGIN_PATHS } from 'util/constants';
import Cookies from 'js-cookie';
import { useLoading } from 'Components/Loading/Loading';

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

interface Credential {
  email: string;
  password: string;
}

const Signin = () => {
  const classes = useStyles();
  const location = useLocation()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<Credential>({ email: '', password: ''})
  const { setOpen } = useLoading();

  const handleChangeCredentials = (e: { target: { name: any; value: any; }; }) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const onLogin = async () => {
    setOpen(true)
    const { email, password } = credentials

    if (!email) {
        return
    }

    if (!password) {
        return
    }
    let role
    if(location.pathname === LOGIN_PATHS.user){
      role = 'user'
    } else {
      role = 'admin'
    }
    const body = {
        email,
        password,
        role
    }

    try{
      const response = await login(body)
      const { data } = response
  
      if (data) {
          if(location.pathname === LOGIN_PATHS.user){
            navigate('/user/dashboard')
            Cookies.set('user_token', response.data.access_token)
            Cookies.set('logged_in_user_name', response.data.user.name)
            Cookies.set('logged_in_user_id', response.data.user.idusers)
            Cookies.set('logged_in_user_role', response.data.user.role)
          } else {
            navigate('/admin/dashboard')
            Cookies.set('admin_token', response.data.access_token)
          }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setOpen(false)
    }
}

  const inputFields: InputField[] = [
    { placeholder: 'Email', type: 'email' },
    { placeholder: 'Password', type: 'password' },
    { placeholder: '', type: 'submit' },
  ];

  return (
    <AuthLayout>
      <Authentication type={'signin'} data={inputFields}
        renderItem={({placeholder, type}) => <span className={classes.authCard}>
        {type !== 'submit' && <Typography>{placeholder}</Typography>}
        {type !== 'submit' ? <input name={type} className={classes.authInput} placeholder={placeholder} type={type} onChange={handleChangeCredentials}/> :
       <input name={type} className={classes.authInput} type={type} onClick={onLogin}/> }
      </span>}/>
    </AuthLayout>
  )
}

export default Signin