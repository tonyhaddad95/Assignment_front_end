import { useState } from 'react'
import Authentication from 'Components/Forms/Authentication';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import AuthLayout from 'Components/AuthLayout';
import { useNavigate } from 'react-router';
import { useLoading } from 'Components/Loading/Loading';
import { register } from 'Services/user/authentication';


const useStyles = makeStyles(() => ({
  authCard: {
   padding: 0,
  },
  authInput: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1
  },
}));

interface InputField {
  placeholder: string;
  type: string;
  name: string;
}

interface Credential {
  email: string;
  password: string;
  name: string;
  role: string;
}

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const { setOpen } = useLoading();
  const [credentials, setCredentials] = useState<Credential>({ email: '', password: '', name: '', role: ''})

  const handleChangeCredentials = (e: { target: { name: any; value: any; }; }) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const onRegister = async () => {
    setOpen(true)
    const { email, password, name } = credentials

    if (!email) {
        return
    }

    if (!password) {
        return
    }

    if(!name) {
      return
    }
  
    const body = {
        email,
        password,
        name,
        role: 'user'
    }

    try{
      const response = await register(body)
      const { data } = response
  
      if (data) {
         navigate('/')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setOpen(false)
    }
}

  const inputFields: InputField[] = [
    { placeholder: 'Name', type: 'text', name: 'name' },
    { placeholder: 'Email', type: 'email', name: 'email' },
    { placeholder: 'Password', type: 'password', name: 'password' },
    { placeholder: 'Submit', type: 'submit', name: '' },
  ];

  return (
    <AuthLayout>
      <Authentication type={'signup'} data={inputFields}
      renderItem={({ type, placeholder, name }) => <span className={classes.authCard}>
      {type !== 'submit' && <Typography>{placeholder}</Typography>}
      {type !== 'submit' ? <input name={name} className={classes.authInput} placeholder={placeholder} type={type} onChange={handleChangeCredentials}/> :
       <input name={type} className={classes.authInput} type={type} onClick={onRegister}/> }
      </span>}/>
    </AuthLayout>
  )
}

export default Signup