import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './Pages/authentication/signin';
import SignUp from './Pages/authentication/signup';
import ResetPassword from './Pages/authentication/resetpassword';
import NotFound from './Pages/notfound';
import AdminDashboard from 'Pages/admin/dashboard';
import UserDashboard from 'Pages/user/dashboard';
import AdminUsers from 'Pages/admin/actions/users';
import Cookies from 'js-cookie';
import AuthenticationNavigator from 'util/auth/AuthenticationNavigator';
import { LoadingProvider } from 'Components/Loading/Loading';

function App() {
  const isUserAuthenticated = Cookies.get('user_token');
  const isAdminAuthenticated = Cookies.get('admin_token');
    return (
      <LoadingProvider>
        <Router>
          <AuthenticationNavigator isUserAuthenticated={isUserAuthenticated} isAdminAuthenticated={isAdminAuthenticated}>
            <Routes>
              <Route path="/admin/dashboard" element={<AdminDashboard/>} />
              <Route path="/admin/users" element={<AdminUsers/>} />
              <Route path="/user/dashboard" element={<UserDashboard/>} />
              <Route path="/not-found" element={<NotFound title={'Oops, Page not found! :('} />} />
              <Route path="*" element={<Navigate  to="/not-found"/>}/>
              <Route path="/" element={<SignIn/>} />
              <Route path="/admin/sign-in" element={<SignIn/>} />
              <Route path="/user/sign-up" element={<SignUp/>} />
              <Route path="/user/reset-password" element={<ResetPassword/>} />
              <Route element={<NotFound title="Page not found" />} />
            </Routes>
          </AuthenticationNavigator>
        </Router>
      </LoadingProvider>
    );
}

export default App;
