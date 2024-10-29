import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticated } from '../store/atom/atom';

const PublicRoute = () => {
    const isAuth = useRecoilValue(isAuthenticated);
    console.log("isauthenticated", isAuth);
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;