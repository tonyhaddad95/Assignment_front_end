import { Grid, Typography, Switch, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import LoggedInLayout from 'Components/AuthLayout/loggedIn'
import { makeStyles } from '@mui/styles';
import { ChangeEvent, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { getAllUsers, updateUserLoginStatus } from 'Services/admin/dashboard';
import PieChartIcon from '@mui/icons-material/PieChart';

const useStyles = makeStyles(() => ({
  ChartsWrapper: {
    alignItems: 'center', display: 'flex', gap: 5, paddingLeft: 30, ['@media (max-width: 850px)']: {
      padding: 0,
    },
  },
  ChartsInnerWrapper: {
    display: 'grid', gap: 2, padding: 20, ['@media (max-width: 850px)']: {
      padding: 0,
    },
  },
  pieChartIcon: { fontSize: 30 }
}));

const AdminUsers = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<any>([])
  const [disableLogin, setDisableLogin] = useState<any>({});

  const handleDisableLoginChange = async (event: React.ChangeEvent<HTMLInputElement>, userId: number) => {
    const value = event.target.checked;
    const response = await updateUserLoginStatus(userId, value)
    setDisableLogin((prevDisableLogin: any) => ({ ...prevDisableLogin, [userId]: value }));
  };
  
  useEffect(() => {
    const fetch = async () => {
      const response = await getAllUsers()
      if (response) {
        if (response.data) {
          const initDisableLogin = response.data.reduce((acc: any, curr: { idusers: any; login_disabled: any; }) => {
            return { ...acc, [curr.idusers]: curr.login_disabled };
          }, {});
          setDisableLogin(initDisableLogin);
          setUsers(response.data);
        }
      }
    }
    fetch()
  }, [])

  return (
    <LoggedInLayout role="admin">
      <Grid className={classes.ChartsWrapper}><PieChartIcon className={classes.pieChartIcon} /> <Typography fontSize={28}>Users Dashboard</Typography></Grid>
      <Grid className={classes.ChartsInnerWrapper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Is Verified</TableCell>
                <TableCell>Login Disabled</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: {
                role: ReactNode; idusers: Key | null | undefined | any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; is_verified: any; disable_login: any;
              }, key: number) => (
                <TableRow key={user.idusers}>
                  <TableCell>{user.idusers}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.is_verified ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {user.role !== 'admin' && <Switch
                      checked={disableLogin[user.idusers]}
                      onChange={(event) => handleDisableLoginChange(event, user.idusers)}
                    />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </LoggedInLayout>
  )
}

export default AdminUsers