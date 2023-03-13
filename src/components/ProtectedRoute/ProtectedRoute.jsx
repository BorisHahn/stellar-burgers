import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, anonymous = false }) {
  const { isLogin } = useSelector((state) => state.accessProcedure);

  const location = useLocation();
  const from = location.state?.from || '/';
  if (anonymous && isLogin) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLogin) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
}
