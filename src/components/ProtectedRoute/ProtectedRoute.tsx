import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks/ReduxTypedHook';
import { RouteProps } from 'react-router';
import { FC } from 'react';

export type ProtectedRouteProps = {
  children: JSX.Element;
  anonymous?: boolean;
  background?: Location;
} & RouteProps;

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  anonymous = false,
  background = null,
}) => {
  const { isLogin } = useAppSelector((state) => state.accessProcedure);

  const location = useLocation();
  const from = location.state?.from || '/';

  if (background && !isLogin) {
    return null;
  }
  
  if (anonymous && isLogin) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLogin) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
