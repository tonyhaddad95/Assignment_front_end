import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_PATHS, LOGIN_PATHS, USER_PATHS } from 'util/constants';

interface AuthenticationNavigatorProps {
    isAdminAuthenticated: any;
    isUserAuthenticated: any;
    children: any;
}

const AuthenticationNavigator: React.FC<AuthenticationNavigatorProps> = ({
    isUserAuthenticated,
    isAdminAuthenticated,
    children,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (USER_PATHS.includes(location.pathname) && (!isUserAuthenticated || isUserAuthenticated == undefined)) {
            navigate(LOGIN_PATHS.user);
        } else if (ADMIN_PATHS.includes(location.pathname) && (!isAdminAuthenticated || isAdminAuthenticated == undefined)) {
            navigate(LOGIN_PATHS.admin);
        } else if (isAdminAuthenticated && LOGIN_PATHS.admin == location.pathname){
            navigate(ADMIN_PATHS[0]);
        } else if (isUserAuthenticated && LOGIN_PATHS.user == location.pathname) {
            navigate(USER_PATHS[0]);
        }
    }, [isUserAuthenticated, isAdminAuthenticated]);


    return children;
};

export default AuthenticationNavigator;
