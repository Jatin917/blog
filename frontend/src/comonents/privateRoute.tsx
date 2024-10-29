import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticated } from '../store/atom/atom';

const PrivateRoute = () => {
    const isAuth = useRecoilValue(isAuthenticated);

    return isAuth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;