import { React } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute({ loggedIn, navigateTo }) {
  const location = useLocation();
  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={navigateTo} replace state={{ redirectTo: location }} />
  );
}

export default ProtectedRoute;
